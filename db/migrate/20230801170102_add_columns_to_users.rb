class AddColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :a_propos, :text
    add_column :users, :location, :string
    add_column :users, :country, :string
    add_column :users, :photos, :string
  end
end
