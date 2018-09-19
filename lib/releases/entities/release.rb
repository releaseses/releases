class Release < Hanami::Entity
  attributes do
    attribute :id,            Types::Int
    attribute :version,       Types::String
    attribute :title,         Types::String
    attribute :summary_raw,   Types::String
    attribute :summary_html,  Types::String
    attribute :released_at,   Types::Time
    attribute :created_at,    Types::Time
    attribute :updated_at,    Types::Time
  end
end
