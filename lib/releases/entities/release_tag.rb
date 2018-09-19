class ReleaseTag < Hanami::Entity
  attributes do
    attribute :id,          Types::Strict::Int
    attribute :release_id,  Types::Strict::Int
    attribute :tag_id,      Types::Strict::Int
  end
end
