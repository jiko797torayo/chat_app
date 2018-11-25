class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.text        :contents
      t.integer     :from
      t.integer     :timestamp, limit: 8
      t.timestamps              null: false
    end
  end
end
