<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "exam".
 *
 * @property int $id
 * @property string $title
 * @property int $idlevel
 * @property int $duration
 * @property int $totalquestions
 *
 * @property Level $idlevel0
 * @property Userattempt[] $userattempts
 */
class Exam extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'exam';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['title', 'idlevel', 'duration', 'totalquestions'], 'required'],
            [['idlevel', 'duration', 'totalquestions'], 'integer'],
            [['title'], 'string', 'max' => 255],
            [['idlevel'], 'exist', 'skipOnError' => true, 'targetClass' => Level::className(), 'targetAttribute' => ['idlevel' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'title' => 'Title',
            'idlevel' => 'Idlevel',
            'duration' => 'Duration',
            'totalquestions' => 'Totalquestions',
        ];
    }

    /**
     * Gets query for [[Idlevel0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLevel()
    {
        return $this->hasOne(Level::className(), ['id' => 'idlevel']);
    }

    /**
     * Gets query for [[Userattempts]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserattempts()
    {
        return $this->hasMany(Userattempt::className(), ['idexam' => 'id']);
    }
}
