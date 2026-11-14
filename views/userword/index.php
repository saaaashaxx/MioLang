<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\UserwordSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Userwords';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="userword-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Userword', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'iduser',
            'iddictionary',
            'islearned',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>


</div>
