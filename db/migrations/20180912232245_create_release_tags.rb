Hanami::Model.migration do
  change do
    create_table :release_tags do
      primary_key :id
      foreign_key :release_id, :releases, null: false, on_delete: :cascade
      foreign_key :tag_id,     :tags,     null: false, on_delete: :cascade
      column      :created_at, DateTime,  null: false
      column      :updated_at, DateTime,  null: false
    end
  end
end
