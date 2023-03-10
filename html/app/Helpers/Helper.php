<?php

namespace App\Helpers;

use Carbon\Carbon;

class Helper {

    public static function rand_color() {
        return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
    }

    public static function validArgentinianPhoneNumber($phone) {
        $phone = preg_replace( '/\D+/', '', $phone);
        return preg_match(
            '/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/D',
            $phone
        );
    }

    public static function getEncodedUrl($url = null){
        if(!$url){
            $url = url()->current();
        }
        return self::base64_url_encode($url);
    }
    public static function getDecodedUrl($encoded_url){
        if(!$encoded_url) return null;
        return self::base64_url_decode($encoded_url);
    }

    public static function stripString($string){
        $string = str_replace(' ', '', $string);
        $string = str_replace('-', '', $string);
        $string = str_replace('_', '', $string);
        return preg_replace('/[^A-Za-z0-9\-]/', '', $string);
    }

    public static function base64_url_encode($input) {
        $base_64_encode = base64_encode($input);
        $base_64_encode = str_replace('/', '-', $base_64_encode);
        $base_64_encode = str_replace('+', '~', $base_64_encode);
        $base_64_encode = str_replace('=', '_', $base_64_encode);
        return $base_64_encode;
    }

    public static function base64_url_decode($input) {
        $input = str_replace('=', '_', $input);
        $input = str_replace('+', '~', $input);
        $input = str_replace('/', '-', $input);
        return base64_decode($input);;
    }

    public static function slug($string){
        $string = strip_tags($string);
        $string = str_replace(array('[\', \']'), '', $string);
        $string = preg_replace('/\[.*\]/U', '', $string);
        $string = preg_replace('/&(amp;)?#?[a-z0-9]+;/i', '-', $string);
        $string = htmlentities($string, ENT_COMPAT, 'utf-8');
        $string = preg_replace('/&([a-z])(acute|uml|circ|grave|ring|cedil|slash|tilde|caron|lig|quot|rsquo);/i', '\\1', $string );
        $string = preg_replace(array('/[^a-z0-9]/i', '/[-]+/') , '-', $string);
        return strtolower(trim($string, '-'));
    }

    public static function trimText($text, $len, $tailText = '...'){
        if(empty($text)) return '';
        if(strlen($text) > $len){
            if(strlen($tailText) > 0){
                return substr($text, 0, $len) . ' ' . $tailText;
            }else{
                return substr($text, 0, $len);
            }
        }
        return $text;
    }

    public static function formatBytes($size, $precision = 2)
    {
        if ($size > 0) {
            $size = (int) $size;
            $base = log($size) / log(1024);
            $suffixes = array(' bytes', ' KB', ' MB', ' GB', ' TB');
            return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
        } else {
            return $size;
        }
    }

    public static function cleanHtml($value, $tags_allowed = "", $removeAll = FALSE){
        if($removeAll){
            $value = strip_tags($value);
        }else{
            if($tags_allowed == ""){
                $tags_allowed = "a|b|i|s|u|br|p|div|ul|li|table|tr|td";
            }
            $search = array('@<script[^>]*?>.*?</script>@si',  // Strip out javascript
                '#</?(?!('.$tags_allowed.'))\b([^><]*>)#sim',
                '@<style[^>]*?>.*?</style>@siU',    // Strip style tags properly
                '@<![\s\S]*?--[ \t\n\r]*>@'         // Strip multi-line comments including CDATA
            );
            $value = preg_replace($search, '', $value);
        }
        return $value;
    }

    public static function generate_uuid() {
        return sprintf( '%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            random_int( 0, 0xffff ), random_int( 0, 0xffff ),
            random_int( 0, 0xffff ),
            random_int( 0, 0x0fff ) | 0x4000,
            random_int( 0, 0x3fff ) | 0x8000,
            random_int( 0, 0xffff ), random_int( 0, 0xffff ), random_int( 0, 0xffff )
        );
    }

    public static function getCurrentDayOfWeek(){
        $translation = ['Monday' => 'Lunes', 'Tuesday' => 'Martes', 'Wednesday' => 'Mi??rcoles',  'Thursday' => 'Jueves', 'Friday' => 'Viernes', 'Saturday' => 'S??bado', 'Sunday' => 'Domingo'];
        $date = Carbon::now();
        $dayName = $date->format('l');
        return $translation[$dayName];
    }

    public static function generateRandomNumber($digits = 10){
        $ch = "0123456789";
        $l = strlen ($ch) - 1;
        $str = "";
        for ($i=0; $i < $digits; $i++){
            $x = rand (0, $l);
            $str .= $ch[$x];
        }
        return $str;
    }


    public static function safeURLParameter($string){
        $string = rawurlencode($string);
        return $string;
    }

    public static function emptyString($input){
        if(strlen(trim($input)) > 0){
            return false;
        }
        return true;
    }

    public static function nullIfEmpty($var, $nullString = 'null'){
        if (isset($var)) {
            if (!self::emptyString($var)) {
                if(strtolower($var) !== strtolower($nullString)){
                    return $var;
                }
            }
        }
        return null;
    }

    public static function splitSentence($term, $excludedWords = ['(', ')', '|', 'de']){
        $termParts = explode(' | ', $term);
        $termList = [];
        foreach ($termParts as $part){
            $termPartsInternal = explode(' ', $part);
            foreach ($termPartsInternal as $internalPart){
                $internalPart = trim(str_replace($excludedWords, "", $internalPart));
                if(self::nullIfEmpty($internalPart)){
                    $termList[] = $internalPart;
                }
            }
        }
        return $termList;
    }

    public static function splitSentenceV2($term, $excludedWords = ['(', ')', '|'], $joiners = ['de'])
    {
        $term = strtolower($term);
        $termParts = explode(' ', $term);

        $terms = [];

        for($i = 0, $iMax = count($termParts); $i< $iMax; $i++){
            $word = trim($termParts[$i]);

            $next = $i + 1;
            $next_to = $i + 2;
            $next_word = $next < $iMax ?  trim($termParts[$next]) : null;
            $next_to_word = $next_to < $iMax ?  trim($termParts[$next_to]) : null;

            if($next_word and in_array($next_word, $joiners) and $next_to_word){
                $word = $word . ' ' . $next_word . ' ' . $next_to_word;
                $i = $next_to;
                $terms[] = $word;
                continue;
            }
            $terms[] = $word;

        }

        return $terms;

        //dd($terms);

//        $termList = [];
//        foreach ($termParts as $part){
//            $termPartsInternal = explode(' ', $part);
//            dd($part);
//            foreach ($termPartsInternal as $internalPart){
//                $internalPart = trim(str_replace($excludedWords, "", $internalPart));
//                if(self::nullIfEmpty($internalPart)){
//                    $termList[] = $internalPart;
//                }
//            }
//        }
//
//        dd($termList);
//        return $termList;
    }


    public static function splitSentenceV3($term, $word_cutters = [' '], $excluded_words = ['(', ')', '|'], $joiners = ['de', 'y', '-', ',', '.'])
    {
        $term = strtolower($term);
        $term = str_replace($excluded_words, '', $term);

        $cutters = implode('|', $word_cutters);

        $termParts = Helper::multiexplode($cutters, $term);

        $terms_builder = [];
        for($i = 0, $iMax = count($termParts); $i< $iMax; $i++){
            $word = trim($termParts[$i]);

            $next = $i + 1;
            $next_to = $i + 2;
            $next_word = $next < $iMax ?  trim($termParts[$next]) : null;
            $next_to_word = $next_to < $iMax ?  trim($termParts[$next_to]) : null;

            if($next_word and in_array($next_word, $joiners) and $next_to_word){
                $word = $word . ' ' . $next_word . ' ' . $next_to_word;
                $i = $next_to;
                $terms_builder[] = $word;
                continue;
            }
            $terms_builder[] = $word;
        }

//        $terms = [];
//        //$terms_builder = array_reverse($terms_builder);
//        foreach ($terms_builder as $item){
//            $tmp_term = trim(strstr($term, $item, true));
//            if(strlen($tmp_term) > 0){
//                $terms[] = $tmp_term;
//            }
//        }
//        $terms[] = $term;
//        $terms = array_reverse($terms);
//        $terms = array_merge($terms, $terms_builder);
//        $terms = array_unique($terms);

        $terms = $terms_builder;

        return $terms;

    }


    public static function multiexplode ($delimiters,$string) {

        $ready = str_replace($delimiters, $delimiters[0], $string);
        $launch = explode($delimiters[0], $ready);
        return  $launch;
    }


    public static function permutations($array) {
        $result = [];

        $recurse = function($array, $start_i = 0) use (&$result, &$recurse) {
            if ($start_i === count($array)-1) {
                array_push($result, $array);
            }

            for ($i = $start_i; $i < count($array); $i++) {
                //Swap array value at $i and $start_i
                $t = $array[$i]; $array[$i] = $array[$start_i]; $array[$start_i] = $t;

                //Recurse
                $recurse($array, $start_i + 1);

                //Restore old order
                $t = $array[$i]; $array[$i] = $array[$start_i]; $array[$start_i] = $t;
            }
        };

        $recurse($array);

        return $result;
    }

    public static function normalizeString($s) {
        $replace = array(
            '??'=>'-', '??'=>'-', '??'=>'-', '??'=>'-',
            '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'A', '??'=>'Ae',
            '??'=>'B',
            '??'=>'C', '??'=>'C', '??'=>'C',
            '??'=>'E', '??'=>'E', '??'=>'E', '??'=>'E', '??'=>'E',
            '??'=>'G',
            '??'=>'I', '??'=>'I', '??'=>'I', '??'=>'I', '??'=>'I',
            '??'=>'L',
            '??'=>'N', '??'=>'N',
            '??'=>'O', '??'=>'O', '??'=>'O', '??'=>'O', '??'=>'O', '??'=>'Oe',
            '??'=>'S', '??'=>'S', '??'=>'S', '??'=>'S',
            '??'=>'T',
            '??'=>'U', '??'=>'U', '??'=>'U', '??'=>'Ue',
            '??'=>'Y',
            '??'=>'Z', '??'=>'Z', '??'=>'Z',
            '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'a', '??'=>'ae', '??'=>'ae', '??'=>'ae', '??'=>'ae',
            '??'=>'b', '??'=>'b', '??'=>'b', '??'=>'b',
            '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'c', '??'=>'ch', '??'=>'ch',
            '??'=>'d', '??'=>'d', '??'=>'d', '??'=>'d', '??'=>'d', '??'=>'d', '??'=>'D', '??'=>'d',
            '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e', '??'=>'e',
            '??'=>'f', '??'=>'f', '??'=>'f',
            '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g', '??'=>'g',
            '??'=>'h', '??'=>'h', '??'=>'h', '??'=>'h', '??'=>'h', '??'=>'h', '??'=>'h', '??'=>'h',
            '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'i', '??'=>'ij', '??'=>'ij',
            '??'=>'j', '??'=>'j', '??'=>'j', '??'=>'j', '??'=>'ja', '??'=>'ja', '??'=>'je', '??'=>'je', '??'=>'jo', '??'=>'jo', '??'=>'ju', '??'=>'ju',
            '??'=>'k', '??'=>'k', '??'=>'k', '??'=>'k', '??'=>'k', '??'=>'k', '??'=>'k',
            '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l', '??'=>'l',
            '??'=>'m', '??'=>'m', '??'=>'m', '??'=>'m',
            '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n', '??'=>'n',
            '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'o', '??'=>'oe', '??'=>'oe', '??'=>'oe',
            '??'=>'p', '??'=>'p', '??'=>'p', '??'=>'p',
            '??'=>'q',
            '??'=>'r', '??'=>'r', '??'=>'r', '??'=>'r', '??'=>'r', '??'=>'r', '??'=>'r', '??'=>'r', '??'=>'r',
            '??'=>'s', '??'=>'s', '??'=>'s', '??'=>'s', '??'=>'s', '??'=>'s', '??'=>'s', '??'=>'s', '??'=>'s', '??'=>'sch', '??'=>'sch', '??'=>'sh', '??'=>'sh', '??'=>'ss',
            '??'=>'t', '??'=>'t', '??'=>'t', '??'=>'t', '??'=>'t', '??'=>'t', '??'=>'t', '??'=>'t', '??'=>'t', '??'=>'t', '??'=>'t', '???'=>'tm',
            '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'u', '??'=>'ue',
            '??'=>'v', '??'=>'v', '??'=>'v',
            '??'=>'w', '??'=>'w', '??'=>'w',
            '??'=>'y', '??'=>'y', '??'=>'y', '??'=>'y', '??'=>'y', '??'=>'y',
            '??'=>'y', '??'=>'z', '??'=>'z', '??'=>'z', '??'=>'z', '??'=>'z', '??'=>'z', '??'=>'z', '??'=>'zh', '??'=>'zh'
        );
        return strtr($s, $replace);
    }

}
