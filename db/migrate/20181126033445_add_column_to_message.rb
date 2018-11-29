class AddColumnToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :to,      :integer
    add_column :messages, :picture, :string
  end
end
