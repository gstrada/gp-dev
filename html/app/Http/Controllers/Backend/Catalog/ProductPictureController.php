<?php

namespace App\Http\Controllers\Backend\Catalog;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Catalog\ProductPicture;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class ProductPictureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($product_id)
    {
        $result = ProductPicture::where('product_id', '=', $product_id)
            ->where('enabled', '=', 1)
            ->where('removed', '=', 0)
            ->orderBy('created_at', 'DESC')
            ->get();
        return response_json('OK', 200, $result);
    }

    public function store(Request $request){
        $product_id = $request->get('product_id', null);
        $product_picture = new ProductPicture();
        $product_picture->product_id = $product_id;
        if ($request->hasFile('attachment')) {
            $attachment = $request->file('attachment');
            $uploadBasepath =  rtrim('product_pictures', '/\\') . '/';
            $attachment_file_name = Helper::stripString(Str::random(22)) . '.' .  $attachment->getClientOriginalExtension();
            $attachment->move($uploadBasepath, $attachment_file_name);
            $product_picture->path = $uploadBasepath .$attachment_file_name;
            try{
                $img = Image::make(file_get_contents(public_path($product_picture->path)));
                $img->resize(600, null, function ($constraint) {
                    $constraint->aspectRatio();
                });
                $img->save(public_path($product_picture->path), 80);
                //ImageOptimizer::optimize(public_path($user->picture));
                $product_picture->save();
            }catch (\Exception $exception){
                return response_json('La Imagen del Producto no fue creada, intente nuevamente', 401);
            }
        }
        return response_json('La Imagen del Producto fue creada correctamente', 200);
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
        $item = ProductPicture::find($id);
        if($item){
            $item->removed = 1;
            if($item->save()){
                return response_json('La Imagen del Producto fue eliminada correctamente', 200);
            }
            return response_json('La Imagen del Producto fue no fue eliminada, intente nuevamente', 401);
        }
        return response_json('Ocurrió un problema al eliminar La Imagen del Producto, intente nuevamente', 401);
    }

}
