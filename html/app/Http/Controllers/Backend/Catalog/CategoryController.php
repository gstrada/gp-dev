<?php

namespace App\Http\Controllers\Backend\Catalog;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Catalog\Category;
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

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result_query = QueryBuilder::for(Category::select('id', 'enabled', 'name', 'picture', 'visible_on_menu', 'friendly_url')
            ->where('removed', '=', 0))
            ->defaultSort('name')
            ->allowedSorts(['name', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name'),

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

        $data = $request->except('created_at', 'updated_at', 'removed', 'picture');
        $item = Category::where('name', '=', $name)->orWhere('friendly_url', '=', $friendly_url)->first();
        if($item){
            if($item->removed){
                $item->removed = 0;
                $item->update($data);
                if(!$item->save()){
                    return response_json('La Categoría fue no fue creada, intente nuevamente', 401);
                }
            }else{
                return response_json('La Categoría ya existe, intente nuevamente', 401);
            }
        }else{
            if(!$item = Category::create($data)){
                return response_json('La Categoría no fue creada, intente nuevamente', 401);
            }
        }
        return response_json('La Categoría fue creada correctamente', 200, $item);

    }

    public function updatePicture(Request $request){
        $id = $request->get('id', null);
        $category = Category::where('id', '=', $id)->first();
        if(!$category){
            return response_json('La Categoría no existe, intente nuevamente', 401);
        }
        $old_picture = $category->picture;
        if ($request->hasFile('attachment')) {
            $attachment = $request->file('attachment');
            $uploadBasepath =  rtrim('categories', '/\\') . '/';
            $attachment_file_name = Helper::stripString(Str::random(22)) . '.' .  $attachment->getClientOriginalExtension();
            $attachment->move($uploadBasepath, $attachment_file_name);
            $category->picture = $uploadBasepath .$attachment_file_name;
            try{
                $img = Image::make(file_get_contents(public_path($category->picture)));
                $img->resize(600, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $img->save(public_path($category->picture), 80);
                //ImageOptimizer::optimize(public_path($user->picture));
                if(File::exists(public_path($old_picture))){
                    File::delete(public_path($old_picture));
                }
                $category->save();
            }catch (\Exception $exception){
                if($category->picture and File::exists(public_path($category->picture))){
                    File::delete(public_path($category->picture));
                }
                return response_json('La Imagen de la Categoría no fue actualizada, intente nuevamente', 401);
            }
        }
        return response_json('La Imagen de la Categoría fue actualizada correctamente', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $item = Category::find($id);
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
        $item = Category::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('La Categoría fue eliminada correctamente', 200);
            }
            return response_json('La Categoría fue no fue eliminada, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar el Categoría, intente nuevamente', 401);
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
        $item = Category::find($id);

        $name = $request->get('name', null);
        $friendly_url = $request->get('friendly_url', null);

        $tmp = Category::where('name', '=', $name)->orWhere('friendly_url', '=', $friendly_url)->first();
        if($tmp && $tmp->id != $item->id){
            return response_json('La Categoría ya existe, intente nuevamente', 401);
        }
        if(!$item){
            return response_json('La Categoría no fue encontrada, intente nuevamente', 401);
        }
        if(!$item->update($data)){
            return response_json('La Categoría no fue actualizada, intente nuevamente', 401);
        }
        return response_json('La Categoría fue actualizada correctamente', 200, $item);

    }

    public function getJsonCategories(){
        $categories = Category::select('id', 'name')
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->get();
        return response_json('OK', 200, $categories);
    }
}
