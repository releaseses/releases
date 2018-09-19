class Tag < Hanami::Entity
  attributes do
    attribute :id,    Types::Int
    attribute :name,  Types::Strict::String
    attribute :slug,  Types::Strict::String
    attribute :color, Types::Strict::String
  end
end
