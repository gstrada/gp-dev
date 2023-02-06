<?php

namespace App\Http\Controllers\Backend\ServiceProvider;

use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use App\Models\User\User;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class ProviderUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($provider_id)
    {
        $result_query = QueryBuilder::for(User::with('provider:id,name')
            ->select('id', 'name', 'lastname', 'email', 'provider_id', 'provider_role')
            ->where('provider_id', '=', $provider_id))
            ->defaultSort('name')
            ->allowedSorts(['name', 'lastname', 'email'])
            ->allowedFilters(
                AllowedFilter::custom('starts-with-name', new StartsWithFilter(), 'name'),
                AllowedFilter::custom('ends-with-name', new EndsWithFilter(), 'name'),
                AllowedFilter::custom('contains-name', new ContainsFilter(), 'name'),
                AllowedFilter::custom('matches-name', new MatchesFilter(), 'name'),
                AllowedFilter::custom('greater-than-name', new GreaterThanFilter(), 'name'),
                AllowedFilter::custom('less-than-name', new LessThanFilter(), 'name'),

                AllowedFilter::custom('starts-with-lastname', new StartsWithFilter(), 'lastname'),
                AllowedFilter::custom('ends-with-lastname', new EndsWithFilter(), 'lastname'),
                AllowedFilter::custom('contains-lastname', new ContainsFilter(), 'lastname'),
                AllowedFilter::custom('matches-lastname', new MatchesFilter(), 'lastname'),
                AllowedFilter::custom('greater-than-lastname', new GreaterThanFilter(), 'lastname'),
                AllowedFilter::custom('less-than-lastname', new LessThanFilter(), 'lastname'),

                AllowedFilter::custom('starts-with-email', new StartsWithFilter(), 'email'),
                AllowedFilter::custom('ends-with-email', new EndsWithFilter(), 'email'),
                AllowedFilter::custom('contains-email', new ContainsFilter(), 'email'),
                AllowedFilter::custom('matches-email', new MatchesFilter(), 'email'),
                AllowedFilter::custom('greater-than-email', new GreaterThanFilter(), 'email'),
                AllowedFilter::custom('less-than-email', new LessThanFilter(), 'email')
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
        $email = $request->get('email', null);
        $provider_id = $request->get('provider_id', null);
        $provider_role = $request->get('provider_role', null);

        $roles = ['admin','editor','verifier','accountant'];

        if(!in_array($provider_role, $roles)){
            return response_json('El Rol no existe en la base de datos, intente nuevamente', 401);
        }

        $item = User::where('email', '=', $email)
            ->where('provider_id', '=', $provider_id)
            ->where('is_provider', '=', 1)
            ->whereNotNull('provider_role')
            ->first();
        if($item){
            return response_json('El Usuario ya tiene asignado un prestador, intente nuevamente', 401);
        }else{
            $item = User::where('email', '=', $email)->first();
            if(!$item){
                return response_json('El Usuario no fue encontrado, intente nuevamente', 401);
            }else{
                $item->provider_id = $provider_id;
                $item->is_provider = 1;
                $item->provider_role = $provider_role;
                if(!$item->save()){
                    return response_json('El Usuario no fue asignado, intente nuevamente', 401);
                }
            }
        }
        return response_json('El Usuario fue asignado correctamente', 200, $item);

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
        $item = User::where('id', '=', $id)->first();
        if($item){
            $item->provider_id = null;
            $item->is_provider = 0;
            $item->provider_role = null;
            if($item->save()){
                return response_json('El Usuario fue eliminado correctamente', 200);
            }
            return response_json('El Usuario fue no fue eliminado, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar el Usuario, intente nuevamente', 401);
    }

}
