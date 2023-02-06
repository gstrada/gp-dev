<?php

namespace App\Http\Controllers\Backend\Card;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Card\Card;
use App\Models\Catalog\Category;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use App\Models\Order\Order;
use App\Models\Order\OrderItem;
use App\Models\ServiceProvider\ProviderTransaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CardController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $card_id = $request->get('card_id');
        $values = $request->get('values');
        if(array_key_exists('id', $values)){
            unset($values['id']);
        }
        if(array_key_exists('number', $values)){
            unset($values['number']);
        }
        $card = Card::find($card_id);
        if($card){
            $card->update($values);
            return response_json('El Código fue actualizado correctamente', 200);
        }else{
            return response_json('El Código no fue actualizado correctamente', 401);
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function find(Request $request)
    {
        $number = $request->get('number');
        if($number){
            $number = trim(str_replace(' ', '', $number));
            $item = Card::with('user', 'client', 'orderItem', 'orderItem.product' , 'orderItem.pack', 'usedOnProduct', 'usedOnAddress')
                ->where(function($q) use ($number){
                    $q->where('number', '=', $number)->orWhere('custom_number', '=', $number);
                })->first();
            if($item){
                return response_json('OK', 200, $item);
            }
        }

        return response_json('El Código no pudo ser encontrado', 401);

    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function findByOrderId(Request $request)
    {
        $order_id = $request->get('order_id');
        if($order_id){
            $order_id = trim(str_replace(' ', '', $order_id));
            $order_item_ids = OrderItem::where('order_id', '=', $order_id)->get()->pluck('id')->toArray();
            $items = Card::with('user', 'client', 'orderItem', 'orderItem.product' , 'orderItem.pack', 'usedOnProduct', 'usedOnAddress')->whereIn('order_item_id', $order_item_ids)->get();
            if(count($items) > 0){
                return response_json('OK', 200, $items);
            }
        }

        return response_json('La Orden no pudo ser encontrada', 401);

    }




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update_old(Request $request)
    {
//        $id = $request->get('id', null);
//        $data = $request->only('paid', 'removed', 'remove_motive', 'attachment');
//        $item = ProviderTransaction::find($id);
//
//        if(!$item){
//            return response_json('La transacción no fue encontrada, intente nuevamente', 401);
//        }
//
//        $data['paid'] = $request->get('paid') ? 1 : 0;
//        $data['removed'] = $request->get('removed') ? 1 : 0;
//        $data['remove_motive'] = $request->get('remove_motive');
//        $data['date_paid'] = $item->date_paid;
//        if(!$item->paid && $data['paid']){
//            $data['date_paid'] = Carbon::now();
//        }
//
//        if(!$item->update($data)){
//            return response_json('La transacción no fue actualizada intente nuevamente', 401);
//        }
//
//        $old_picture = $item->transaction_file;
//        if ($request->hasFile('file')) {
//            $attachment = $request->file('file');
//            $uploadBasepath =  rtrim('transactions', '/\\') . '/';
//            $attachment_file_name = Helper::stripString(Str::random(22)) . '.' .  $attachment->getClientOriginalExtension();
//            $attachment->move($uploadBasepath, $attachment_file_name);
//            $item->transaction_file = $uploadBasepath .$attachment_file_name;
//            try{
//                $img = Image::make(file_get_contents(public_path($item->transaction_file)));
//                $img->resize(600, null, function ($constraint) {
//                    $constraint->aspectRatio();
//                });
//                $img->save(public_path($item->transaction_file), 80);
//                if(File::exists(public_path($old_picture))){
//                    File::delete(public_path($old_picture));
//                }
//                $item->save();
//            }catch (\Exception $exception){
//                if($item->transaction_file and File::exists(public_path($item->transaction_file))){
//                    File::delete(public_path($item->transaction_file));
//                }
//            }
//        }
//
//        return response_json('La transacción fue actualizada correctamente', 200, $item);

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function history()
    {
        $result_query = QueryBuilder::for(Card::with('usedOnProduct', 'providerTransaction', 'orderItem', 'orderItem.pack', 'orderItem.product')->select(
            'id', 'number', 'custom_number', 'used_on_product_id', 'date_used', 'provider_transaction_id', 'order_item_id')
            )
            ->defaultSort('-date_used')
            ->allowedSorts(['number', 'custom_number', 'date_used'])
            ->allowedFilters(

                AllowedFilter::custom('starts-with-provider_transaction.id', new StartsWithFilter(), 'providerTransaction.id'),
                AllowedFilter::custom('ends-with-provider_transaction.id', new EndsWithFilter(), 'providerTransaction.id'),
                AllowedFilter::custom('contains-provider_transaction.id', new ContainsFilter(), 'providerTransaction.id'),
                AllowedFilter::custom('matches-provider_transaction.id', new MatchesFilter(), 'providerTransaction.id'),
                AllowedFilter::custom('greater-than-provider_transaction.id', new GreaterThanFilter(), 'providerTransaction.id'),
                AllowedFilter::custom('less-than-provider_transaction.id', new LessThanFilter(), 'providerTransaction.id'),

                AllowedFilter::custom('starts-with-number', new StartsWithFilter(), 'number'),
                AllowedFilter::custom('ends-with-number', new EndsWithFilter(), 'number'),
                AllowedFilter::custom('contains-number', new ContainsFilter(), 'number'),
                AllowedFilter::custom('matches-number', new MatchesFilter(), 'number'),
                AllowedFilter::custom('greater-than-number', new GreaterThanFilter(), 'number'),
                AllowedFilter::custom('less-than-number', new LessThanFilter(), 'number'),

                AllowedFilter::custom('starts-with-custom_number', new StartsWithFilter(), 'custom_number'),
                AllowedFilter::custom('ends-with-custom_number', new EndsWithFilter(), 'custom_number'),
                AllowedFilter::custom('contains-custom_number', new ContainsFilter(), 'custom_number'),
                AllowedFilter::custom('matches-custom_number', new MatchesFilter(), 'custom_number'),
                AllowedFilter::custom('greater-than-custom_number', new GreaterThanFilter(), 'custom_number'),
                AllowedFilter::custom('less-than-custom_number', new LessThanFilter(), 'custom_number'),

                AllowedFilter::custom('starts-with-date_used', new StartsWithFilter(), 'date_used'),
                AllowedFilter::custom('ends-with-date_used', new EndsWithFilter(), 'date_used'),
                AllowedFilter::custom('contains-date_used', new ContainsFilter(), 'date_used'),
                AllowedFilter::custom('matches-date_used', new MatchesFilter(), 'date_used'),
                AllowedFilter::custom('greater-than-date_used', new GreaterThanFilter(), 'date_used'),
                AllowedFilter::custom('less-than-date_used', new LessThanFilter(), 'date_used'),

                AllowedFilter::custom('starts-with-used_on_product.name', new StartsWithFilter(), 'usedOnProduct.name'),
                AllowedFilter::custom('ends-with-used_on_product.name', new EndsWithFilter(), 'usedOnProduct.name'),
                AllowedFilter::custom('contains-used_on_product.name', new ContainsFilter(), 'usedOnProduct.name'),
                AllowedFilter::custom('matches-used_on_product.name', new MatchesFilter(), 'usedOnProduct.name'),
                AllowedFilter::custom('greater-than-used_on_product.name', new GreaterThanFilter(), 'usedOnProduct.name'),
                AllowedFilter::custom('less-than-used_on_product.name', new LessThanFilter(), 'usedOnProduct.name'),

                AllowedFilter::custom('starts-with-used_on_product.internal_price', new StartsWithFilter(), 'usedOnProduct.internal_price'),
                AllowedFilter::custom('ends-with-used_on_product.internal_price', new EndsWithFilter(), 'usedOnProduct.internal_price'),
                AllowedFilter::custom('contains-used_on_product.internal_price', new ContainsFilter(), 'usedOnProduct.internal_price'),
                AllowedFilter::custom('matches-used_on_product.internal_price', new MatchesFilter(), 'usedOnProduct.internal_price'),
                AllowedFilter::custom('greater-than-used_on_product.internal_price', new GreaterThanFilter(), 'usedOnProduct.internal_price'),
                AllowedFilter::custom('less-than-used_on_product.internal_price', new LessThanFilter(), 'usedOnProduct.internal_price'),

                AllowedFilter::custom('starts-with-provider_transaction.reference_id', new StartsWithFilter(), 'providerTransaction.reference_id'),
                AllowedFilter::custom('ends-with-provider_transaction.reference_id', new EndsWithFilter(), 'providerTransaction.reference_id'),
                AllowedFilter::custom('contains-provider_transaction.reference_id', new ContainsFilter(), 'providerTransaction.reference_id'),
                AllowedFilter::custom('matches-provider_transaction.reference_id', new MatchesFilter(), 'providerTransaction.reference_id'),
                AllowedFilter::custom('greater-than-provider_transaction.reference_id', new GreaterThanFilter(), 'providerTransaction.reference_id'),
                AllowedFilter::custom('less-than-provider_transaction.reference_id', new LessThanFilter(), 'providerTransaction.reference_id'),

                AllowedFilter::custom('starts-with-provider_transaction.created_at', new StartsWithFilter(), 'providerTransaction.created_at'),
                AllowedFilter::custom('ends-with-provider_transaction.created_at', new EndsWithFilter(), 'providerTransaction.created_at'),
                AllowedFilter::custom('contains-provider_transaction.created_at', new ContainsFilter(), 'providerTransaction.created_at'),
                AllowedFilter::custom('matches-provider_transaction.created_at', new MatchesFilter(), 'providerTransaction.created_at'),
                AllowedFilter::custom('greater-than-provider_transaction.created_at', new GreaterThanFilter(), 'providerTransaction.created_at'),
                AllowedFilter::custom('less-than-provider_transaction.created_at', new LessThanFilter(), 'providerTransaction.created_at')


//                 AllowedFilter::custom('starts-with-pack.name', new StartsWithFilter(), 'orderItem.pack.name'),
//                AllowedFilter::custom('ends-with-pack.name', new EndsWithFilter(), 'orderItem.pack.name'),
//                AllowedFilter::custom('contains-pack.name', new ContainsFilter(), 'orderItem.pack.name'),
//                AllowedFilter::custom('matches-pack.name', new MatchesFilter(), 'orderItem.pack.name'),
//                AllowedFilter::custom('greater-than-pack.name', new GreaterThanFilter(), 'orderItem.pack.name'),
//                AllowedFilter::custom('less-than-pack.name', new LessThanFilter(), 'orderItem.pack.name')


            );
        $result = $result_query->jsonPaginate();
        $result->getCollection()->transform(function ($card){
            $card->price_to_pay = 0;
            if($card->usedOnProduct){
                $card->price_to_pay = $card->usedOnProduct->internal_price - ($card->usedOnProduct->internal_benefit_discount * $card->usedOnProduct->internal_price) / 100 ;
            }
            return $card;
        });
        return response_json('OK', 200, $result);
    }

}
