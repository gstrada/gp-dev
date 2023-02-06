<?php

namespace App\Http\Controllers\Backend\Card;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\ServiceProvider\ProviderTransaction;
use App\Models\StartWithFilters\StartsWithFilter;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $status = Request::capture()->get('status');
        $available_status = ['pending', 'confirmed', 'dismissed'];
        if(!in_array($status,$available_status)){
            $status = 'pending';
        }

        $query = ProviderTransaction::with('provider')->where('old_system', 0);
        if($status === 'pending'){
            $query->where('paid', '=', 0)->where('removed', '=', 0);
        }
        if($status === 'confirmed'){
            $query->where('paid', '=', 1)->where('removed', '=', 0);
        }
        if($status === 'dismissed'){
            $query->where('removed', '=', 1);
        }


        $result_query = QueryBuilder::for($query)
            ->defaultSort('-created_at')
            ->allowedSorts(['created_at', 'date_paid'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-provider.name', new StartsWithFilter(), 'provider.name'),
                AllowedFilter::custom('ends-with-provider.name', new EndsWithFilter(), 'provider.name'),
                AllowedFilter::custom('contains-provider.name', new ContainsFilter(), 'provider.name'),
                AllowedFilter::custom('matches-provider.name', new MatchesFilter(), 'provider.name'),
                AllowedFilter::custom('greater-than-provider.name', new GreaterThanFilter(), 'provider.name'),
                AllowedFilter::custom('less-than-provider.name', new LessThanFilter(), 'provider.name'),

                AllowedFilter::custom('starts-with-reference_id', new StartsWithFilter(), 'reference_id'),
                AllowedFilter::custom('ends-with-reference_id', new EndsWithFilter(), 'reference_id'),
                AllowedFilter::custom('contains-reference_id', new ContainsFilter(), 'reference_id'),
                AllowedFilter::custom('matches-reference_id', new MatchesFilter(), 'reference_id'),
                AllowedFilter::custom('greater-than-reference_id', new GreaterThanFilter(), 'reference_id'),
                AllowedFilter::custom('less-than-reference_id', new LessThanFilter(), 'reference_id'),

                AllowedFilter::custom('starts-with-paid', new StartsWithFilter(), 'paid'),
                AllowedFilter::custom('ends-with-paid', new EndsWithFilter(), 'paid'),
                AllowedFilter::custom('contains-paid', new ContainsFilter(), 'paid'),
                AllowedFilter::custom('matches-paid', new MatchesFilter(), 'paid'),
                AllowedFilter::custom('greater-than-paid', new GreaterThanFilter(), 'paid'),
                AllowedFilter::custom('less-than-paid', new LessThanFilter(), 'paid'),

                AllowedFilter::custom('starts-with-removed', new StartsWithFilter(), 'removed'),
                AllowedFilter::custom('ends-with-removed', new EndsWithFilter(), 'removed'),
                AllowedFilter::custom('contains-removed', new ContainsFilter(), 'removed'),
                AllowedFilter::custom('matches-removed', new MatchesFilter(), 'removed'),
                AllowedFilter::custom('greater-than-removed', new GreaterThanFilter(), 'removed'),
                AllowedFilter::custom('less-than-removed', new LessThanFilter(), 'removed'),

                AllowedFilter::custom('starts-with-date_paid', new StartsWithFilter(), 'date_paid'),
                AllowedFilter::custom('ends-with-date_paid', new EndsWithFilter(), 'date_paid'),
                AllowedFilter::custom('contains-date_paid', new ContainsFilter(), 'date_paid'),
                AllowedFilter::custom('matches-date_paid', new MatchesFilter(), 'date_paid'),
                AllowedFilter::custom('greater-than-date_paid', new GreaterThanFilter(), 'date_paid'),
                AllowedFilter::custom('less-than-date_paid', new LessThanFilter(), 'date_paid')
            );
        $result = $result_query->jsonPaginate();
        return response_json('OK', 200, $result);
    }

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = ProviderTransaction::with('provider', 'cards', 'cards.user', 'cards.client', 'cards.orderItem', 'cards.usedOnProduct', 'cards.usedOnAddress')->find($id);
        return response_json('OK', 200, $item);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
        $id = $request->get('id', null);
        $data = $request->only('paid', 'removed', 'remove_motive', 'attachment');
        $item = ProviderTransaction::find($id);

        if(!$item){
            return response_json('La transacción no fue encontrada, intente nuevamente', 401);
        }

        $data['paid'] = $request->get('paid') ? 1 : 0;
        $data['removed'] = $request->get('removed') ? 1 : 0;
        $data['remove_motive'] = $request->get('remove_motive');
        $data['date_paid'] = $item->date_paid;
        if(!$item->paid && $data['paid']){
            $data['date_paid'] = Carbon::now();
        }

        if(!$item->update($data)){
            return response_json('La transacción no fue actualizada intente nuevamente', 401);
        }

        $old_picture = $item->transaction_file;
        if ($request->hasFile('file')) {
            $attachment = $request->file('file');
            $uploadBasepath =  rtrim('transactions', '/\\') . '/';
            $attachment_file_name = Helper::stripString(Str::random(22)) . '.' .  $attachment->getClientOriginalExtension();
            $attachment->move($uploadBasepath, $attachment_file_name);
            $item->transaction_file = $uploadBasepath .$attachment_file_name;
            try{
                $img = Image::make(file_get_contents(public_path($item->transaction_file)));
                $img->resize(600, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $img->save(public_path($item->transaction_file), 80);
                if(File::exists(public_path($old_picture))){
                    File::delete(public_path($old_picture));
                }
                $item->save();
            }catch (\Exception $exception){
                if($item->transaction_file and File::exists(public_path($item->transaction_file))){
                    File::delete(public_path($item->transaction_file));
                }
            }
        }

        return response_json('La transacción fue actualizada correctamente', 200, $item);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
