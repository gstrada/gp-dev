<?php

namespace App\Console\Commands\Import;

use App\Models\Theme\RevolutionSlider;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Sunra\PhpSimple\HtmlDomParser;
use ZanySoft\Zip\ZipFacade as Zip;

class RevolutionSliderLoader extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'revslider:load';


    protected $neededFiles = [
        'json_slider.html',
        'slider.html',
        'js/jquery.revslider.embed.js',
        'js/jquery.themepunch.revolution.min.js',
        'js/jquery.themepunch.revolution.min.js',
        'js/jquery.themepunch.tools.min.js',
    ];

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $slider = RevolutionSlider::whereProcessed(0)->first();
        //$slider = RevolutionSlider::first();
        if(!$slider){
            $this->info('Nothing To Process');
            return;
        }

        $path = storage_path($slider->zip_file_path);
        $public_path = public_path($slider->slider_file_path);

        if($zip = self::validateZip($path)){

            try{

                $zip->extract($public_path);
                self::generateSlider($slider, $public_path);

            }catch (\Exception $exception){
                self::invalidate($slider);
            }
        }else{
            self::invalidate($slider);
            $this->error('Invalid Zip File');
        }

    }

    private function validateZip($path){
        if(Zip::check($path)){
            $zip = Zip::open($path);
            $tmp_path = str_replace(basename($path), '', $path) . Str::random(4) . '/';
            $zip->extract($tmp_path);

            $all_good = true;
            foreach ($this->neededFiles as $neededFile){
                $filePath = $tmp_path . $neededFile;
                if(!File::exists($filePath)){
                    $all_good = false;
                    break;
                }
            }
            File::deleteDirectory($tmp_path);
            if(!$all_good){
                return false;
            }
            try{
                $zip->delete('NOTICE.txt');
            }catch (\Exception $exception){}
            return $zip;
        }
        return false;
    }

    private function generateSlider($slider, $path){

        $json_slider = $path . '/json_slider.html';
        $html_slider = $path . '/slider.html';
        $web_content = file_get_contents($json_slider);

        $dom = HtmlDomParser::str_get_html($web_content);

        if($dom){
            $element = $dom->find('div.revslider', 0);
            if($element){
                $attribute = 'data-alias';
                $slider_id = $element->$attribute;
                if(strlen($slider_id) > 0){
                    $slider_div = '<div class="revslider" data-alias="'.$slider_id.'"></div>';
                    $slider_js = self::jsScriptTemplate($slider->slider_file_path, $slider_id);

                    $js_file = $path . '/js/jquery.revslider.embed.js';
                    $js_content = file_get_contents($js_file);
                    $js_content = str_replace("assetsLocation: ''", "assetsLocation: '/$slider->slider_file_path/assets/'", $js_content);
                    $js_content = str_replace("cssLocation: ''", "cssLocation: '/$slider->slider_file_path/css/'", $js_content);
                    $js_content = str_replace("fontsLocation: ''", "fontsLocation: '/$slider->slider_file_path/fonts/'", $js_content);
                    $js_content = str_replace("jsLocation: ''", "jsLocation: '/$slider->slider_file_path/js/'", $js_content);
                    $js_content = str_replace("http://", "https://", $js_content);

                    $private_js_file = $path . '/js/jquery.revslider-' . $slider_id . '.js';
                    $js_private_content = file_get_contents($private_js_file);
                    $js_private_content = str_replace("http:", "https:", $js_private_content);
                    if(file_put_contents($private_js_file, $js_private_content)) {
                        if (file_put_contents($js_file, $js_content)) {
                            File::delete($json_slider);
                            File::delete($html_slider);

                            $slider->slider_id = $slider_id;
                            $slider->slider_div = $slider_div;
                            $slider->slider_js = $slider_js;
                            $slider->valid = 1;
                            $slider->processed = 1;
                            $slider->save();

                            return true;
                        }
                    }
                }
            }
        }
        return self::invalidate($slider);
    }

    private function invalidate($slider){
        $slider->processed = 1;
        $slider->valid = 0;
        $slider->enabled = 0;
        $slider->save();
        return false;
    }

    private function jsScriptTemplate($path, $slider_id){
        return '<script type="text/javascript" src="/'.$path.'/js/jquery.themepunch.tools.min.js"></script>
		                      <script type="text/javascript" src="/'.$path.'/js/jquery.themepunch.revolution.min.js"></script>
		                      <script type="text/javascript" src="/'.$path.'/js/jquery.revslider.embed.js"></script>
		                      <script type="text/javascript" src="/'.$path.'/js/jquery.revslider-'.$slider_id.'.js"></script>
		                      <script type="text/javascript">
                                jQuery(function() {
                                    jQuery().embedRevslider();
                                });
		                      </script>
		                      <script type="text/javascript">function setREVStartSize(e){                                    
			                    try{ e.c=jQuery(e.c);var i=jQuery(window).width(),t=9999,r=0,n=0,l=0,f=0,s=0,h=0;
				                if(e.responsiveLevels&&(jQuery.each(e.responsiveLevels,function(e,f){f>i&&(t=r=f,l=e),i>f&&f>r&&(r=f,n=e)}),t>r&&(l=n)),f=e.gridheight[l]||e.gridheight[0]||e.gridheight,s=e.gridwidth[l]||e.gridwidth[0]||e.gridwidth,h=i/s,h=h>1?1:h,f=Math.round(h*f),"fullscreen"==e.sliderLayout){var u=(e.c.width(),jQuery(window).height());if(void 0!=e.fullScreenOffsetContainer){var c=e.fullScreenOffsetContainer.split(",");if (c) jQuery.each(c,function(e,i){u=jQuery(i).length>0?u-jQuery(i).outerHeight(!0):u}),e.fullScreenOffset.split("%").length>1&&void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0?u-=jQuery(window).height()*parseInt(e.fullScreenOffset,0)/100:void 0!=e.fullScreenOffset&&e.fullScreenOffset.length>0&&(u-=parseInt(e.fullScreenOffset,0))}f=u}else void 0!=e.minHeight&&f<e.minHeight&&(f=e.minHeight);e.c.closest(".rev_slider_wrapper").css({height:f})                    
			                    }catch(d){console.log("Failure at Presize of Slider:"+d)}                        
		                        };</script>';
    }
}
