<?php

namespace App\Http\Controllers\Backend\Catalog;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Catalog\Pack;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result_query = QueryBuilder::for(Pack::with('category:id,name')->select(
            'id', 'enabled', 'name', 'sku', 'picture', 'featured',
            'short_description', 'friendly_url', 'physical_price',
            'digital_price', 'card_price', 'online_only', 'category_id')
            ->where('removed', '=', 0))
            ->defaultSort('name')
            ->allowedSorts(['name', 'sku', 'enabled', 'physical_price', 'digital_price', 'card_price'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name'),

                AllowedFilter::custom('starts-with-category.name', new StartsWithFilter(), 'category.name'),
                AllowedFilter::custom('ends-with-category.name', new EndsWithFilter(), 'category.name'),
                AllowedFilter::custom('contains-category.name', new ContainsFilter(), 'category.name'),
                AllowedFilter::custom('matches-category.name', new MatchesFilter(), 'category.name'),
                AllowedFilter::custom('greater-than-category.name', new GreaterThanFilter(), 'category.name'),
                AllowedFilter::custom('less-than-category.name', new LessThanFilter(), 'category.name'),

                AllowedFilter::custom('starts-with-sku', new StartsWithFilter(), 'sku'),
                AllowedFilter::custom('ends-with-sku', new EndsWithFilter(), 'sku'),
                AllowedFilter::custom('contains-sku', new ContainsFilter(), 'sku'),
                AllowedFilter::custom('matches-sku', new MatchesFilter(), 'sku'),
                AllowedFilter::custom('greater-than-sku', new GreaterThanFilter(), 'sku'),
                AllowedFilter::custom('less-than-sku', new LessThanFilter(), 'sku'),

                AllowedFilter::custom('starts-with-short_description', new StartsWithFilter(), 'short_description'),
                AllowedFilter::custom('ends-with-short_description', new EndsWithFilter(), 'short_description'),
                AllowedFilter::custom('contains-short_description', new ContainsFilter(), 'short_description'),
                AllowedFilter::custom('matches-short_description', new MatchesFilter(), 'short_description'),
                AllowedFilter::custom('greater-than-short_description', new GreaterThanFilter(), 'short_description'),
                AllowedFilter::custom('less-than-short_description', new LessThanFilter(), 'short_description'),

                AllowedFilter::custom('starts-with-friendly_url', new StartsWithFilter(), 'friendly_url'),
                AllowedFilter::custom('ends-with-friendly_url', new EndsWithFilter(), 'friendly_url'),
                AllowedFilter::custom('contains-friendly_url', new ContainsFilter(), 'friendly_url'),
                AllowedFilter::custom('matches-friendly_url', new MatchesFilter(), 'friendly_url'),
                AllowedFilter::custom('greater-than-friendly_url', new GreaterThanFilter(), 'friendly_url'),
                AllowedFilter::custom('less-than-friendly_url', new LessThanFilter(), 'friendly_url')

            );
        $result = $result_query->jsonPaginate();
        return response_json('OK', 200, $result);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $name = $request->get('name', null);
        $friendly_url = $request->get('friendly_url', null);
        $sku = $request->get('sku', null);

        $data = $request->except('created_at', 'updated_at', 'removed', 'picture');
        $item = Pack::where('name', '=', $name)->orWhere('friendly_url', '=', $friendly_url)->orWhere('sku', '=', $sku)->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('El Pack fue no fue creado, intente nuevamente', 401);
                }
            }else{
                return response_json('El Pack ya existe, intente nuevamente', 401);
            }
        }else{
            if(!$item = Pack::create($data)){
                return response_json('El Pack no fue creado, intente nuevamente', 401);
            }
        }
        return response_json('El Pack fue creado correctamente', 200, $item);

    }

    public function updatePicture(Request $request){
        $id = $request->get('id', null);
        $pack = Pack::where('id', '=', $id)->first();
        if(!$pack){
            return response_json('El Pack no existe, intente nuevamente', 401);
        }
        $old_picture = $pack->picture;
        if ($request->hasFile('attachment')) {
            $attachment = $request->file('attachment');
            $uploadBasepath =  rtrim('packs', '/\\') . '/';
            $attachment_file_name = Helper::stripString(Str::random(22)) . '.' .  $attachment->getClientOriginalExtension();
            $attachment->move($uploadBasepath, $attachment_file_name);
            $pack->picture = $uploadBasepath .$attachment_file_name;
            try{
                $img = Image::make(file_get_contents(public_path($pack->picture)));
                $img->resize(600, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $img->save(public_path($pack->picture), 80);
                //ImageOptimizer::optimize(public_path($user->picture));
                if(File::exists(public_path($old_picture))){
                    File::delete(public_path($old_picture));
                }
                $pack->save();
            }catch (\Exception $exception){
                if($pack->picture and File::exists(public_path($pack->picture))){
                    File::delete(public_path($pack->picture));
                }
                return response_json('La Imagen del Pack no fue actualizado, intente nuevamente', 401);
            }
        }
        return response_json('La Imagen del Pack fue actualizado correctamente', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Pack::find($id);
        return response_json('OK', 200, $item);
    }

    /**
     * Remove a created resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function remove(Request $request)
    {
        $id = $request->get('id', null);
        $item = Pack::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('El Pack fue eliminado correctamente', 200);
            }
            return response_json('El Pack fue no fue eliminado, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar el Pack, intente nuevamente', 401);
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
        $data = $request->except('created_at', 'updated_at');
        $item = Pack::find($id);

        $name = $request->get('name', null);
        $friendly_url = $request->get('friendly_url', null);
        $sku = $request->get('sku', null);

        $tmp = Pack::where('name', '=', $name)->orWhere('friendly_url', '=', $friendly_url)->orWhere('sku', '=', $sku)->first();
        if($tmp && $tmp->id != $item->id){
            return response_json('El Pack ya existe, intente nuevamente', 401);
        }
        if(!$item){
            return response_json('El Pack no fue encontrado, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('El Pack no fue actualizado, intente nuevamente', 401);
        }
        return response_json('El Pack fue actualizado correctamente', 200, $item);

    }
}
