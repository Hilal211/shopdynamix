<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%quotation}}`.
 * Has foreign keys to the tables:
 *
 * - `{{%user}}`
 */
class m211016_093803_create_quotation_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%quotation}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'created_date' => $this->timestamp()->notNull(),
            'notes' => $this->string(1000),
        ]);

        // creates index for column `user_id`
        $this->createIndex(
            '{{%idx-quotation-user_id}}',
            '{{%quotation}}',
            'user_id'
        );

        // add foreign key for table `{{%user}}`
        $this->addForeignKey(
            '{{%fk-quotation-user_id}}',
            '{{%quotation}}',
            'user_id',
            '{{%user}}',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // drops foreign key for table `{{%user}}`
        $this->dropForeignKey(
            '{{%fk-quotation-user_id}}',
            '{{%quotation}}'
        );

        // drops index for column `user_id`
        $this->dropIndex(
            '{{%idx-quotation-user_id}}',
            '{{%quotation}}'
        );

        $this->dropTable('{{%quotation}}');
    }
}
