class FixFromAndToColumn < ActiveRecord::Migration
  def change
    remove_column :messages, :from, :integer
    remove_column :messages, :to, :integer
    remove_column :messages, :timestamp, :integer
    add_reference :messages, :user, foreign_key: true
    add_reference :messages, :relationship, foreign_key: true
  end
end
