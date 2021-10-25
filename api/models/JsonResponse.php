<?php

namespace app\models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Response
 *
 * @author User
 *
 *
 */
class JsonResponse
{

    public $responseCode;
    public $responseMessage;
    public $data;

    function __construct($responseCode = 0, $responseMessage = "", $data = [])
    {
        $this->responseCode = $responseCode;
        $this->responseMessage = $responseMessage;
        $this->data = $data;
    }
}
