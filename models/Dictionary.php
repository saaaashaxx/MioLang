<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "dictionary".
 *
 * @property int $id
 * @property int $idlevel
 * @property string $word
 * @property string $translation
 * @property string $transcription
 *
 * @property Level $idlevel0
 * @property Userword[] $userwords
 */
class Dictionary extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'dictionary';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['idlevel', 'word', 'translation', 'transcription'], 'required'],
            [['idlevel'], 'integer'],
            [['word', 'translation', 'transcription'], 'string', 'max' => 255],
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
            'idlevel' => 'Idlevel',
            'word' => 'Word',
            'translation' => 'Translation',
            'transcription' => 'Transcription',
        ];
    }

    /**
     * Gets query for [[Idlevel0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIdlevel0()
    {
        return $this->hasOne(Level::className(), ['id' => 'idlevel']);
    }

    /**
     * Gets query for [[Userwords]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserwords()
    {
        return $this->hasMany(Userword::className(), ['iddictionary' => 'id']);
    }
}
