<?php
namespace app\controllers;
use app\models\Admin;
use yii\rest\ActiveController;
use app\models\JsonResponse;
class AdminController extends ActiveController
{
    public $modelClass = 'app\models\Admin';
    public function actionIndex()
    {
        return $this->render('index');
    }
    public function actionLogin()
    {
        try {
            $response = new JsonResponse();
            $email = isset($_POST['email']) ? $_POST['email'] : false;
            $password = isset($_POST['password']) ? $_POST['password'] : false;
            $log = Admin::find()->where(['email' => $email, 'password' => $password])->one();
            if (!$log) {
                $response->responseMessage = "Invalid email or password";
                $response->data['status'] = 500;
                return $response;
            } else {
                $response->responseCode=1;
                $response->responseMessage = "success";
                $response->data['login'] = $log;
                $response->data['status'] = 200;
                return $response;
            }
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = "Catch (Line: " . $e->getLine() . "): " . $e->getMessage();
            return $response;
        }
    }
}
