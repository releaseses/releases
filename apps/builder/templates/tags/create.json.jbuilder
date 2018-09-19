if tag.present?
  json.tag do
    json.slug tag.slug
    json.name tag.name
    json.color tag.color
  end
end

if errors.present?
  json.errors errors
end