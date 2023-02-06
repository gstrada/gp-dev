<?php

namespace App\Http\Controllers\Backend\ServiceProvider;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Catalog\Category;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use App\Models\ServiceProvider\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result_query = QueryBuilder::for(Provider::select('id', 'enabled', 'name', 'logo', 'internal_contact_phone', 'internal_contact_email', 'internal_contact_name')->where('removed', '=', 0))
            ->defaultSort('name')
            ->allowedSorts(['name', 'internal_contact_name', 'internal_contact_phone', 'internal_contact_email', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name'),

                AllowedFilter::custom('starts-with-internal_contact_name', new StartsWithFilter(), 'internal_contact_name'),
                AllowedFilter::custom('ends-with-internal_contact_name', new EndsWithFilter(), 'internal_contact_name'),
                AllowedFilter::custom('contains-internal_contact_name', new ContainsFilter(), 'internal_contact_name'),
                AllowedFilter::custom('matches-internal_contact_name', new MatchesFilter(), 'internal_contact_name'),
                AllowedFilter::custom('greater-than-internal_contact_name', new GreaterThanFilter(), 'internal_contact_name'),
                AllowedFilter::custom('less-than-internal_contact_name', new LessThanFilter(), 'internal_contact_name'),

                AllowedFilter::custom('starts-with-internal_contact_email', new StartsWithFilter(), 'internal_contact_email'),
                AllowedFilter::custom('ends-with-internal_contact_email', new EndsWithFilter(), 'internal_contact_email'),
                AllowedFilter::custom('contains-internal_contact_email', new ContainsFilter(), 'internal_contact_email'),
                AllowedFilter::custom('matches-internal_contact_email', new MatchesFilter(), 'internal_contact_email'),
                AllowedFilter::custom('greater-than-internal_contact_email', new GreaterThanFilter(), 'internal_contact_email'),
                AllowedFilter::custom('less-than-internal_contact_email', new LessThanFilter(), 'internal_contact_email'),

                AllowedFilter::custom('starts-with-internal_contact_phone', new StartsWithFilter(), 'internal_contact_phone'),
                AllowedFilter::custom('ends-with-internal_contact_phone', new EndsWithFilter(), 'internal_contact_phone'),
                AllowedFilter::custom('contains-internal_contact_phone', new ContainsFilter(), 'internal_contact_phone'),
                AllowedFilter::custom('matches-internal_contact_phone', new MatchesFilter(), 'internal_contact_phone'),
                AllowedFilter::custom('greater-than-internal_contact_phone', new GreaterThanFilter(), 'internal_contact_phone'),
                AllowedFilter::custom('less-than-internal_contact_phone', new LessThanFilter(), 'internal_contact_phone')
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
        $data = $request->except('created_at', 'updated_at', 'removed', 'logo');
        $item = Provider::where('name', '=', $name)->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('El Prestador fue no fue creado, intente nuevamente', 401);
                }
            }else{
                return response_json('El Prestador ya existe, intente nuevamente', 401);
            }
        }else{
            if(!$item = Provider::create($data)){
                return response_json('El Prestador no fue creado, intente nuevamente', 401);
            }
        }
        return response_json('El Prestador fue creado correctamente', 200, $item);

    }

    public function updateLogo(Request $request){
        //$name = $request->get('name', null);
        $id = $request->get('id', null);
        //$provider = Provider::where('name', '=', $name)->orWhere('id', '=', $id)->first();
        $provider = Provider::where('id', '=', $id)->first();
        if(!$provider){
            return response_json('El Prestador no existe, intente nuevamente', 401);
        }
        $old_logo = $provider->logo;
        if ($request->hasFile('attachment')) {
            $attachment = $request->file('attachment');
            $uploadBasepath =  rtrim('providers', '/\\') . '/';
            $attachment_file_name = Helper::stripString(Str::random(22)) . '.' .  $attachment->getClientOriginalExtension();
            $attachment->move($uploadBasepath, $attachment_file_name);
            $provider->logo = $uploadBasepath .$attachment_file_name;
            try{
                $img = Image::make(file_get_contents(public_path($provider->logo)));
                $img->resize(600, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $img->save(public_path($provider->logo), 80);
                //ImageOptimizer::optimize(public_path($user->logo));
                if(File::exists(public_path($old_logo))){
                    File::delete(public_path($old_logo));
                }
                $provider->save();
            }catch (\Exception $exception){
                if($provider->logo and File::exists(public_path($provider->logo))){
                    File::delete(public_path($provider->logo));
                }
                return response_json('El Logo del Prestador no fue actualizado, intente nuevamente', 401);
            }
        }
        return response_json('El Logo del Prestador fue actualizado correctamente', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Provider::find($id);
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
        $item = Provider::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('El Prestador fue eliminado correctamente', 200);
            }
            return response_json('El Prestador fue no fue eliminado, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar el Prestador, intente nuevamente', 401);
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
        $item = Provider::find($id);

        $name = $request->get('name', null);
        $tmp = Provider::where('name', '=', $name)->first();
        if($tmp && $tmp->id != $item->id){
            return response_json('El Prestador ya existe, intente nuevamente', 401);
        }
        if(!$item){
            return response_json('El Prestador no fue encontrado, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('El Prestador no fue actualizado, intente nuevamente', 401);
        }
        return response_json('El Prestador fue actualizado correctamente', 200, $item);

    }

    public function getJsonProviders(){
        $providers = Provider::select('id', 'name')
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->get();
        return response_json('OK', 200, $providers);
    }
}
