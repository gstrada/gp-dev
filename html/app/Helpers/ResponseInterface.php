<?php

if (! function_exists('response_json')) {
    function response_json($message = null, $code = 204, $result = ''){
        return new \Illuminate\Http\JsonResponse(
            [
                'code' => $code,
                'message' => $message,
                'result' => $result
            ]
        ,200, [], JSON_PRESERVE_ZERO_FRACTION);
    }
}

if (! function_exists('old_response_json')) {
    function old_response_json($response = null, $code = 200, $action = '')
    {
        return new \Illuminate\Http\JsonResponse(
            [
                'code' => $code,
                'action' => $action,
                'response' => $response
            ]
        );

//        return \GuzzleHttp\json_encode(
//            [
//                'code' => $code,
//                'action' => $action,
//                'response' => $response
//            ]
//        );

    }
}
