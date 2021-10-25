<?php
namespace app\models;
use Yii;
/**
 * This is the model class for table "product".
 *
 * @property int $id
 * @property string $name
 * @property string $summary
 */
class Product extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'product';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'summary'], 'required'],
            [['name'], 'string', 'max' => 100],
            [['summary'], 'string', 'max' => 1000],
            [['image'], 'string', 'max' => 100],
        ];
    }
    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'name',
            'summary' => 'summary',
            'image' => 'image',

        ];
    }
}
