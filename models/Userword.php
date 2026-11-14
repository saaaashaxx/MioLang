<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "userword".
 *
 * @property int $id
 * @property int $iduser
 * @property int $iddictionary
 * @property int $islearned
 *
 * @property Dictionary $iddictionary0
 * @property User $iduser0
 */
class Userword extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'userword';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['iduser', 'iddictionary', 'islearned'], 'required'],
            [['iduser', 'iddictionary', 'islearned'], 'integer'],
            [['iddictionary'], 'exist', 'skipOnError' => true, 'targetClass' => Dictionary::className(), 'targetAttribute' => ['iddictionary' => 'id']],
            [['iduser'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['iduser' => 'id']],
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
            'iddictionary' => 'Iddictionary',
            'islearned' => 'Islearned',
        ];
    }

    /**
     * Gets query for [[Iddictionary0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIddictionary0()
    {
        return $this->hasOne(Dictionary::className(), ['id' => 'iddictionary']);
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
