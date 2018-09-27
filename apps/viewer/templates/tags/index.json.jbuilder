json.tags tags do |tag|
  json.id    tag.id
  json.name  tag.name
  json.slug  tag.slug
  json.color tag.color
end
