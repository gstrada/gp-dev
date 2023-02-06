<?php

namespace App\Http\Controllers\Backend\User;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Filters\ContainsFilter;
use App\Models\Filters\EndsWithFilter;
use App\Models\Filters\GreaterThanFilter;
use App\Models\Filters\LessThanFilter;
use App\Models\Filters\MatchesFilter;
use App\Models\Filters\StartsWithFilter;
use App\Models\User\User;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $query = User::with('provider');
        $result_query = QueryBuilder::for($query)
            ->defaultSort('-created_at')
            ->allowedSorts(['created_at'])
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
                AllowedFilter::custom('less-than-email', new LessThanFilter(), 'email'),

                AllowedFilter::custom('starts-with-provider.name', new StartsWithFilter(), 'provider.name'),
                AllowedFilter::custom('ends-with-provider.name', new EndsWithFilter(), 'provider.name'),
                AllowedFilter::custom('contains-provider.name', new ContainsFilter(), 'provider.name'),
                AllowedFilter::custom('matches-provider.name', new MatchesFilter(), 'provider.name'),
                AllowedFilter::custom('greater-than-provider.name', new GreaterThanFilter(), 'provider.name'),
                AllowedFilter::custom('less-than-provider.name', new LessThanFilter(), 'provider.name'),

                AllowedFilter::custom('starts-with-city.name', new StartsWithFilter(), 'city.name'),
                AllowedFilter::custom('ends-with-city.name', new EndsWithFilter(), 'city.name'),
                AllowedFilter::custom('contains-city.name', new ContainsFilter(), 'city.name'),
                AllowedFilter::custom('matches-city.name', new MatchesFilter(), 'city.name'),
                AllowedFilter::custom('greater-than-city.name', new GreaterThanFilter(), 'city.name'),
                AllowedFilter::custom('less-than-city.name', new LessThanFilter(), 'city.name'),


                AllowedFilter::custom('starts-with-shipping_address', new StartsWithFilter(), 'shipping_address'),
                AllowedFilter::custom('ends-with-shipping_address', new EndsWithFilter(), 'shipping_address'),
                AllowedFilter::custom('contains-shipping_address', new ContainsFilter(), 'shipping_address'),
                AllowedFilter::custom('matches-shipping_address', new MatchesFilter(), 'shipping_address'),
                AllowedFilter::custom('greater-than-shipping_address', new GreaterThanFilter(), 'shipping_address'),
                AllowedFilter::custom('less-than-shipping_address', new LessThanFilter(), 'shipping_address'),


                AllowedFilter::custom('starts-with-billing_address', new StartsWithFilter(), 'billing_address'),
                AllowedFilter::custom('ends-with-billing_address', new EndsWithFilter(), 'billing_address'),
                AllowedFilter::custom('contains-billing_address', new ContainsFilter(), 'billing_address'),
                AllowedFilter::custom('matches-billing_address', new MatchesFilter(), 'billing_address'),
                AllowedFilter::custom('greater-than-billing_address', new GreaterThanFilter(), 'billing_address'),
                AllowedFilter::custom('less-than-billing_address', new LessThanFilter(), 'billing_address')

            );
        $result = $result_query->jsonPaginate();
        return response_json('OK', 200, $result);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function download()
    {
        $writer = WriterEntityFactory::createXLSXWriter();
        $fileName = 'Clients';
        $fileName = strtoupper(Helper::slug($fileName)) . '.xlsx';

//        if(!File::isDirectory(storage_path('file_downloader'))){
//            File::makeDirectory(storage_path('file_downloader'), 0755, true, true);
//        }
//        $writer->openToFile(storage_path('file_downloader/' . $fileName));

        $writer->openToBrowser($fileName);

        $header = [
            'Nombre',
            'Apellido',
            'Email',
            'Ciudad',
            'Genero',
            'Fech Nacimiento',
            'Envio - Dirección',
            'Envio - Nota',
            'Envio - Código Postal',
            'Facturación - Razón Social',
            'Facturación - CUIT',
            'Facturación - Direccion',
            'Prestador Asociado',
            'Activo',
            'Fecha de Ingreso',
        ];


        $rowFromValues = WriterEntityFactory::createRowFromArray($header);
        $writer->addRow($rowFromValues);

        $users = User::with('provider')->get();

        foreach ($users as $user) {
            $row = [
                $user->name,
                $user->lastname,
                $user->email,
                $user->city ? $user->city->name : '',
                $user->gender,
                $user->birthday,
                $user->shipping_address,
                $user->shipping_note,
                $user->shipping_zip_code,
                $user->billing_social_name,
                $user->billing_social_number,
                $user->billing_address,
                $user->provider ? $user->provider->name : '',
                $user->enabled ? 'SI' : 'NO',
                $user->created_at ? Carbon::parse($user->created_at)->format('d/m/Y') : ''
            ];
            $rowFromValues = WriterEntityFactory::createRowFromArray($row);
            $writer->addRow($rowFromValues);
        }
        $writer->close();

//        $file = File::get(storage_path('file_downloader/' . $fileName));
//        $response = Response::make($file, 200);
//        $response->header('Content-Type', 'application/xlsx');
//        return $response;
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
        //
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
