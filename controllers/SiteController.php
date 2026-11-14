<?php

namespace app\controllers;

use app\models\Dictionary;
use app\models\Exam;
use Yii;
use yii\web\Controller;
use app\models\LoginForm;

class SiteController extends Controller
{
    public function actionIndex()
    {
        if(Yii::$app->user->isGuest) {
           return $this->redirect(['/site/register']);
        }
        return $this->render('home');
    }
    
    public function actionPractice()
    {
        return $this->render('practice');
    }

    public function actionDictionary()
    {
        $words = Dictionary::find()->all();
        return $this->render('dictionary', ['words' => $words]);
    }

    // public function actionFlashcards()
    // {
    //     return $this->renderPage('flashcards', 'Флеш-карточки — MioLang');
    // }

    // public function actionQuiz()
    // {
    //     return $this->renderPage('quiz', 'Тест по словам — MioLang');
    // }

    // public function actionQuizResults()
    // {
    //     return $this->renderPage('quizResults', 'Результаты теста — MioLang');
    // }

    // public function actionExamSetup()
    // {
    //     return $this->renderPage('examSetup', 'Экзамен TOPIK — MioLang');
    // }

    public function actionExam()
    {
        $exams = Exam::find()->all();
        return $this->render('exam', ['exams' => $exams]); // передаем правильную переменную $exams вместо $e
    }

    // public function actionExamResults()
    // {
    //     return $this->renderPage('examResults', 'Результаты экзамена — MioLang');
    // }

    public function actionProfile()
    {
        return $this->render('profile');
    }

    // private function renderPage($route, $title = 'MioLang — изучай корейский')
    // {
    //     $this->view->params['initialRoute'] = $route;
    //     return $this->render('index', ['pageTitle' => $title]);
    // }

    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }

        $model->password = '';
        
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }
    public function actionRegister()
    {
        $model = new \app\models\SignupForm();

    if ($model->load(Yii::$app->request->post()) && $user = $model->signup()) {
    Yii::$app->user->login($user);
    return $this->goHome();
    }

    return $this->render('register', [
    'model' => $model,
    ]);

    }

    
}
