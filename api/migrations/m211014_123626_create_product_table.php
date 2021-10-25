<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%product}}`.
 */
class m211014_123626_create_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%product}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(100)->notNull(),
            'summary' => $this->string(1000)->notNull(),
            'quantity' => $this->integer()->notNull(),
            'price' => $this->integer()->notNull(),
            'image' => $this->string(100),
            'archived'=>$this->integer(1)->defaultValue(0),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%product}}');
    }
}
