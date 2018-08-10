Hanami::Model.migration do
  change do
    create_table :releases do
      primary_key :id
      column :version,      String
      column :title,        String
      column :released_at,  DateTime
      column :summary_raw,  String, text: true
      column :summary_html, String, text: true
      column :created_at, DateTime, null: false
      column :updated_at, DateTime, null: false

      index [:version, :released_at]
    end
  end
end
