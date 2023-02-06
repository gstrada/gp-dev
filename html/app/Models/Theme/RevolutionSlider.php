<?php

namespace App\Models\Theme;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class RevolutionSlider extends Model
{
    protected $fillable = ['name', 'activate_date_from', 'activate_date_until',
        'zip_file_path', 'slider_file_path',
        'slider_id', 'slider_div', 'slider_js',
        'valid', 'processed', 'enabled'];

    protected $appends = ['humanEnabled', 'latinActivateDateFrom', 'latinActivateDateUntil'];

    public function getLatinActivateDateFromAttribute()
    {
        try{
            if($this->activate_date_from){
                return Carbon::parse($this->activate_date_from)->format('d/m/Y');
            }
        }catch (\Exception $exception){
            return null;
        }
    }

    public function getLatinActivateDateUntilAttribute()
    {
        try{
            if($this->activate_date_until){
                return Carbon::parse($this->activate_date_until)->format('d/m/Y');
            }
        }catch (\Exception $exception){
            return null;
        }
    }

    public function getHumanEnabledAttribute()
    {
        return $this->enabled ? 'Habilitado' : 'Inhabilitado';
    }

}
