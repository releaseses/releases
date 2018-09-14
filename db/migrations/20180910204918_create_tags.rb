Hanami::Model.migration do
  change do
    create_table :tags do
      primary_key :id
      column :name,       String, null: false
      column :slug,       String, null: false
      column :color,      String, null: false
      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false
      index  :slug, unique: true
    end
  end
end
