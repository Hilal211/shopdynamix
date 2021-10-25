<?php
namespace app\controllers;
use yii\rest\ActiveController;
use app\models\JsonResponse;
use app\models\JsonMessages;
use app\models\Quotation;
use app\models\User;
use yii\data\ActiveDataProvider;
class QuotationController extends ActiveController
{
    public $modelClass = 'app\models\Quotation';

    public function actionIndex()
    {
        return $this->render('index');
    }
    public function actionGetquotation()
    {
        try {
            $response = new JsonResponse();
            $log = Quotation::find()
            ->select(["quotation.*","u.email"])
            ->innerJoin('user u', "u.id = user_id")
            ->asArray()
            ->all();
            $response->responseCode=1;
            $response->responseMessage = "success";
            $response->data = $log;
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = "Catch (Line: " . $e->getLine() . "): " . $e->getMessage();
            return $response;
        }
        // $revenues = Quotation::find()
        // ->select(["quotation.*"])
        // ->with('user')
        // ->asArray()
        // ->all();
        // return $revenues;
    }
    public function actionAddquotation()
    {
        $response = new JsonResponse();
        try {
            $user_id = isset($_POST['user_id']) ? $_POST['user_id'] : false;
            $notes = isset($_POST['notes']) ? $_POST['notes'] : false;
            if (!$user_id || !$notes) {
                $response->responseCode = 0;
                $response->responseMessage = JsonMessages::ERRORINVALID;
                return $response;
            }
            $quotation = new Quotation();
            $quotation->user_id = $user_id;
            $quotation->notes = $notes;
            if (!$quotation->save()) {
                $response->responseCode = 0;
                $response->responseMessage = "Error in quotation save";
                return $response;
            }
            $response->responseCode = 1;
            $response->responseMessage = "success";
            $response->data = $quotation;
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = "Catch (Line: " . $e->getLine() . "): " . $e->getMessage();
            return $response;
        }
    }
}
