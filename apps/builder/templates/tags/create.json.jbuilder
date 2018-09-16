if tag.present?
  json.tag do
    json.slug tag.slug
    json.name tag.name
    json.color tag.color
  end
end

if errors.any?
  json.errors errors
end