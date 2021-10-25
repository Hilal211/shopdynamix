<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%quotation_lines}}`.
 * Has foreign keys to the tables:
 *
 * - `{{%user}}`
 * - `{{%quotation}}`
 */
class m211016_100058_create_quotation_lines_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%quotation_lines}}', [
            'id' => $this->primaryKey(),
            'product_id' => $this->integer()->notNull(),
            'quantity' => $this->integer()->notNull(),
            'quotation_id' => $this->integer()->notNull(),
        ]);

        // creates index for column `product_id`
        $this->createIndex(
            '{{%idx-quotation_lines-product_id}}',
            '{{%quotation_lines}}',
            'product_id'
        );

        // add foreign key for table `{{%user}}`
        $this->addForeignKey(
            '{{%fk-quotation_lines-product_id}}',
            '{{%quotation_lines}}',
            'product_id',
            '{{%user}}',
            'id',
            'CASCADE'
        );

        // creates index for column `quotation_id`
        $this->createIndex(
            '{{%idx-quotation_lines-quotation_id}}',
            '{{%quotation_lines}}',
            'quotation_id'
        );

        // add foreign key for table `{{%quotation}}`
        $this->addForeignKey(
            '{{%fk-quotation_lines-quotation_id}}',
            '{{%quotation_lines}}',
            'quotation_id',
            '{{%quotation}}',
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
            '{{%fk-quotation_lines-product_id}}',
            '{{%quotation_lines}}'
        );

        // drops index for column `product_id`
        $this->dropIndex(
            '{{%idx-quotation_lines-product_id}}',
            '{{%quotation_lines}}'
        );

        // drops foreign key for table `{{%quotation}}`
        $this->dropForeignKey(
            '{{%fk-quotation_lines-quotation_id}}',
            '{{%quotation_lines}}'
        );

        // drops index for column `quotation_id`
        $this->dropIndex(
            '{{%idx-quotation_lines-quotation_id}}',
            '{{%quotation_lines}}'
        );

        $this->dropTable('{{%quotation_lines}}');
    }
}
