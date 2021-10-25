<?php
namespace app\controllers;

use Yii;
use app\models\Product;
use app\models\JsonMessages;
use app\models\JsonResponse;
use yii\rest\ActiveController;

class ProductController extends ActiveController
{
    public $modelClass = 'app\models\User';
    public function actionIndex()
    {
        return $this->render('index');
    }
    public function actionGetproduct()
    {
        try {
            $response = new JsonResponse();
            $log = Product::find()->where(['archived' => 0])
            ->all();
            $response->responseCode = 1;
            $response->responseMessage = "success";
            $response->data = $log;
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = "Catch (Line: " . $e->getLine() . "): " . $e->getMessage();
            return $response;
        }
    }
    public function actionGetproductdetails()
    {
        try {
            $product_id = isset($_POST['product_id']) ? $_POST['product_id'] : false;
            $response = new JsonResponse();
            $log = Product::find()->where(['id' => $product_id])->one();
            $response->responseMessage = "success";
            $response->data = $log;
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = "Catch (Line: " . $e->getLine() . "): " . $e->getMessage();
            return $response;
        }
    }
    public function actionArchive()
    {
        $response = new JsonResponse();
        try {
            $id = isset($_POST['id']) ? $_POST['id'] : -1;
            $user = Product::find()->where(['id' => $id])->one();
            if (!$user) {
                $response->responseMessage = JsonMessages::ERRORINVALID;
                return $response;
            }
            $user->archived = 1;
            $user->save();
            $response->data = true;
            $response->responseCode = 1;
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = $e->getMessage();
            return $response;
        }
    }
    public function actionSave()
    {
        $response = new JsonResponse();
        try {
            $id = isset($_POST['id']) ? $_POST['id'] : -1;
            $name = isset($_POST['name']) ? $_POST['name'] : false;
            $summary = isset($_POST['summary']) ? $_POST['summary'] : false;
            $price = isset($_POST['price']) ? $_POST['price'] : false;
            $quantity = isset($_POST['quantity']) ? $_POST['quantity'] : false;
            $picture = isset($_FILES['image']) ? $_FILES['image'] : false;

            if (!$name || !$summary || !$price || !$quantity) {
                $response->responseMessage = JsonMessages::ERRORINVALID;
                return $response;
            }
            $type = null;

            if ($id != -1) {
                $type = product::find()->where(['id' => $id])->one();
            } else {
                $type = new product();
            }
            $img_name = null;
            if ($picture && $picture != null) {
                $tmp = explode('.', $picture['name']);
                $file_ext=strtolower(end($tmp));
                $extensions= array("jpeg","jpg","png", "svg");
                if (in_array($file_ext, $extensions)=== false) {
                    $response->responseCode = 0;
                    $response->responseMessage = "Only images are allowed.";
                    return $response;
                }
                $img_name = md5(time() . "-" . $picture['name']) . "." . $file_ext;
                move_uploaded_file($picture['tmp_name'], dirname(__FILE__) . '/../images/products/'.$img_name);
            }
            if ($img_name != null) {
                $type->image = $img_name;
            }
            $type->name = $name;
            $type->summary = $summary;
            $type->price=$price;
            $type->quantity=$quantity;
            if ($type->save()) {
                $response->data = $type;
                $response->responseCode = 1;
            } else {
                $response->responseMessage = json_encode($type->getErrors());
                $response->responseCode = 0;
            }
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = $e->getMessage();
            return $response;
        }
    }


    public function actionGetpp()
    {
        $response = new JsonResponse();

        try {
            $pagination_count = isset($_POST['pagination_count']) ? $_POST['pagination_count'] : false;  // just on page loading and change in filters to get the count of tutors for pagination
            $page = isset($_POST['page']) ? $_POST['page'] : false;
            $page_size = isset($_POST['page_size']) ? $_POST['page_size'] : false;

            $product = Product::find()->where(['archived' => 0]);

            if ($pagination_count) {
                $response->data['productCount'] = Product::find()->where(['archived' => 0])->count();
            }

            $product = $product->limit($page_size)
            ->offset(intval($page) * intval($page_size))
            ->all();

            $response->responseCode = 1;
            $response->responseMessage = "success";
            $response->data['product'] = $product;
            return $response;
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = $e->getMessage();
            return $response;
        }
    }
    public function actionAploadexcel()
    {
        $response = new JsonResponse();
        $filename = isset($_FILES['filename']) ? $_FILES['filename'] : false;

        $tmp = explode('.', $filename['name']);
        $file_ext=strtolower(end($tmp));
        $extensions= array("csv");
        if (in_array($file_ext, $extensions)=== false) {
            $response->responseCode = 0;
            $response->responseMessage = "Only file excel are allowed.";
            return $response;
        }
        $excel_name = md5(time() . "-" . $filename['name']) . "." . $file_ext;
        move_uploaded_file($filename['tmp_name'], dirname(__FILE__) . '/../excelfile/'.$excel_name);

        $ff= dirname(__FILE__) . '/../excelfile/'.$excel_name;
        $name=[];
        $summary=[];
        $quantity=[];
        $price=[];
        $reference=[];
        $file = fopen($ff, 'r');
        $finaleProduct=[];
        while (($line = fgetcsv($file)) !== false) {
            array_push($name, $line[0]);
            array_push($summary, $line[1]);
            array_push($quantity, $line[2]);
            array_push($price, $line[3]);
            array_push($reference, $line[4]);
        }
        fclose($file);
        for ($i = 0; $i < count($name); $i++) {
            $checkReference=Product::find()->where(['reference' => $reference[$i]])->one();
            if ($checkReference) {
                $quotationLines=Product::find()->where(['reference' => $reference[$i]])->one();
            } else {
                $quotationLines = new Product();
            }
            $quotationLines->name = $name[$i];
            $quotationLines->summary = $summary[$i];
            $quotationLines->quantity = $quantity[$i];
            $quotationLines->price = $price[$i];
            $quotationLines->reference = $reference[$i];

            if (!$quotationLines->save()) {
                $response->responseCode = 0;
                $response->responseMessage = json_encode($quotationLines->getErrors());
                return $response;
            }
            $quotationLines->save();
            
            array_push($finaleProduct, $quotationLines);
        }
        $response->responseCode = 1;
        $response->responseMessage = "success";
        $response->data['product'] = $finaleProduct;
        return $response;
    }
}
