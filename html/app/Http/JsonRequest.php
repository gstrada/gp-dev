<?php

namespace App\Http;

use Illuminate\Http\Request;

class JsonRequest extends Request
{
    public function expectsJson(){
        $pathInfo = $this->getPathInfo();
        if (strpos($pathInfo, 'api/') !== false) {
            return true;
        }
        if (strpos($pathInfo, 'oauth/') !== false) {
            return true;
        }
        return false;
    }

    public function wantsJson(){
        $pathInfo = $this->getPathInfo();
        if (strpos($pathInfo, 'api/') !== false) {
            return true;
        }
        if (strpos($pathInfo, 'oauth/') !== false) {
            return true;
        }
        return false;
    }
}
