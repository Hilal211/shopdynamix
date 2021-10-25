<?php
namespace app\controllers;
use yii\rest\ActiveController;
use app\models\JsonResponse;
use app\models\QuotationLines;
use app\models\Product;
use app\models\JsonMessages;
class Quotation_linesController extends ActiveController
{
    public $modelClass = 'app\models\QuotationLines';
    public function actionIndex()
    {
        return $this->render('index');
    }
    public function actionGetquotationlines()
    {
        try {
            $response = new JsonResponse();
            $log = QuotationLines::find()->all();
            $response->responseMessage = "success";
            $response->data = $log;
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = "Catch (Line: " . $e->getLine() . "): " . $e->getMessage();
            return $response;
        }
    }
    public function actionAddquotationlines()
    {
        $response = new JsonResponse();
        try {
            $product_id = isset($_POST['product_id']) ? $_POST['product_id'] : false;
            $quantity = isset($_POST['quantity']) ? $_POST['quantity'] : false;
            $quotation_id = isset($_POST['quotation_id']) ? $_POST['quotation_id'] : false;

            if (!$product_id || !$quantity || !$quotation_id) {
                $response->responseCode = 0;
                $response->responseMessage = JsonMessages::ERRORINVALID;
                return $response;
            }
            $ids = explode(",", $product_id);
            $qty = explode(",", $quantity);
            for ($i = 0; $i < count($ids); $i++) {
                $quotationLines = new QuotationLines();
                $quotationLines->product_id = $ids[$i];
                $quotationLines->quantity = $qty[$i];
                $quotationLines->quotation_id = $quotation_id;
                if (!$quotationLines->save()) {
                    $response->responseCode = 0;
                    $response->responseMessage = json_encode($quotationLines->getErrors());
                    return $response;
                }
                $type = product::find()->where(['id' => $ids[$i]])->one();
                $type->quantity=$type->quantity-$qty[$i];
                $type->save();
            }
            $response->responseCode = 1;
            $response->responseMessage = "success";
            $response->data = $quotationLines;
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = "Catch (Line: " . $e->getLine() . "): " . $e->getMessage();
            return $response;
        }
    }
    public function actionQuotationlineswithproduct()
    {
        try {
            $quotation_id = isset($_POST['quotation_id']) ? $_POST['quotation_id'] : false;
            $response = new JsonResponse();
            $log = QuotationLines::find()
            ->select(["quotation_lines.*","p.name","p.summary","p.image"])
            ->innerJoin('product p', "p.id = product_id")
            ->where(['quotation_lines.quotation_id' => $quotation_id])
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
    }
}
