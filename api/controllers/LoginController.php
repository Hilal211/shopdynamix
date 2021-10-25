<?php
namespace app\controllers;

use Yii;
use app\models\User;
use app\models\JsonMessages;
use app\models\JsonResponse;
use yii\rest\ActiveController;

class LoginController extends ActiveController
{
    public $modelClass = 'app\models\User';
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
            $log = User::find()->where(['email' => $email, 'password' => $password])->one();
            if (!$log) {
                $response->responseCode=1;
                $response->responseMessage = "Invalid email or password";
                $response->data['status'] = 500;
                return $response;
            } else {
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


    public function actionSave()
    {
        $response = new JsonResponse();
        try {
            $id = isset($_POST['id']) ? $_POST['id'] : -1;
            $email = isset($_POST['email']) ? $_POST['email'] : false;
            $password = isset($_POST['password']) ? $_POST['password'] : false;

            if (!$email || !$password) {
                $response->responseMessage = JsonMessages::ERRORINVALID;
                return $response;
            }
            $type = null;

            if ($id != -1) {
                $type = User::find()->where(['id' => $id])->one();
            } else {
                $type = new User();
            }
       
            $type->email = $email;
            $type->password = $password;
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

    public function actionDeletee()
    {
        $response = new JsonResponse();

        try {
            $id = isset($_POST['id']) ? $_POST['id'] : -1;
            $delete = User::find()
            ->where(['id'=>$id])
            ->one()
            ->delete();
            if($delete){
                $response->responseCode = 1;
                $response->message = "user deleted !";
                return $response;    
            }
        } catch (\Exception $e) {
            $response->responseCode = 0;
            $response->responseMessage = $e->getMessage();
            return $response;
        }
    }
    public function actionGetuser()
    {
        try {
            $response = new JsonResponse();
            $log = User::find()
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
}
