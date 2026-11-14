<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "userattempt".
 *
 * @property int $id
 * @property int $iduser
 * @property int $idexam
 * @property int $score
 * @property string $completedat
 *
 * @property Exam $idexam0
 * @property User $iduser0
 */
class Userattempt extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'userattempt';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['iduser', 'idexam', 'score', 'completedat'], 'required'],
            [['iduser', 'idexam', 'score'], 'integer'],
            [['completedat'], 'safe'],
            [['iduser'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['iduser' => 'id']],
            [['idexam'], 'exist', 'skipOnError' => true, 'targetClass' => Exam::className(), 'targetAttribute' => ['idexam' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'iduser' => 'Iduser',
            'idexam' => 'Idexam',
            'score' => 'Score',
            'completedat' => 'Completedat',
        ];
    }

    /**
     * Gets query for [[Idexam0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdexam0()
    {
        return $this->hasOne(Exam::className(), ['id' => 'idexam']);
    }

    /**
     * Gets query for [[Iduser0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIduser0()
    {
        return $this->hasOne(User::className(), ['id' => 'iduser']);
    }
}
