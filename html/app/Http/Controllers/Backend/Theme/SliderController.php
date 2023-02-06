<?php

namespace App\Http\Controllers\Backend\Theme;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use App\Models\Theme\RevolutionSlider;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class SliderController extends Controller
{

    protected static $uploadPath = '/sliders/';
    protected static $uploadPathPublic = 'content/uploads/sliders/';


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result_query = QueryBuilder::for(RevolutionSlider::select('id', 'enabled', 'name', 'valid', 'processed', 'activate_date_from', 'activate_date_until', 'created_at'))
            ->defaultSort('name')
            ->allowedSorts(['name', 'enabled'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name')
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
//        return view('backend.core.site_slider.create', compact('object'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $input = $request->except('zip_file_path', 'activate_date_from', 'activate_date_until');

        try{
            $activate_date_from_input = $request->get('activate_date_from') ?: null;
            $activate_date_from = Carbon::createFromFormat('d/m/Y',$activate_date_from_input)->format('Y-m-d');;
        }catch (\Exception $exception){
            $activate_date_from = null;
        }
        $input['activate_date_from'] = $activate_date_from;

        try{
            $activate_date_until_input = $request->get('activate_date_until') ?: null;
            $activate_date_until = Carbon::createFromFormat('d/m/Y',$activate_date_until_input)->format('Y-m-d');;
        }catch (\Exception $exception){
            $activate_date_until = null;
        }
        $input['activate_date_until'] = $activate_date_until;

        $item = RevolutionSlider::create($input);

        if ($request->hasFile('zip_file_path')) {
            $uploadBasepath =  rtrim(static::$uploadPath, '/\\') . '/' ;
            $uploadBasepathPublic =  rtrim(static::$uploadPathPublic, '/\\') . '/';
            $attachment_file_name = Str::random(4) . '_' . $request->file('zip_file_path')->getClientOriginalName();
            $request->file('zip_file_path')->move(storage_path($uploadBasepath), $attachment_file_name);

            $item->slider_file_path = $uploadBasepathPublic . basename($attachment_file_name, '.zip');
            $item->zip_file_path = $uploadBasepath .$attachment_file_name;

        }else{
            if($item->zip_file_path and !File::exists(storage_path($item->zip_file_path))){
                $item->zip_file_path = null;
                $item->slider_file_path = null;
            }
        }
        if($item->save()){
            return response_json('OK', 200);
        }
        return response_json('Error Saving Slider', 401);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(RevolutionSlider $object)
    {
        $sliders = RevolutionSlider::whereEnabled(1)->get();
        foreach ($sliders as $slider){
            $slider->enabled = 0;
            $slider->save();
        }
        if($object->enabled == 1){
            $object->enabled = 0;
        }else{
            $object->enabled = 1;
        }
        if($object->save()){
            return response_json('OK', 200);
        }
        return response_json('Error Removing Slider', 401);
    }

}
