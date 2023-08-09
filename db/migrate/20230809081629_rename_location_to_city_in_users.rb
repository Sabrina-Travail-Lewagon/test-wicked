class RenameLocationToCityInUsers < ActiveRecord::Migration[7.0]
  def change
    rename_column :users, :location, :city
  end
end
