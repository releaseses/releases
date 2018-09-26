if release.present?
  json.release do
    json.id release.id
    json.version release.version
    json.title release.title
    json.summary_raw release.summary_raw
    json.summary_html release.summary_html
    json.released_at release.released_at.strftime('%Y-%m-%d %H:%M:%S')
    json.created_at release.created_at
    json.updated_at release.updated_at

    json.tags release.tags do |tag|
      json.id tag.id
      json.name tag.name
      json.slug tag.slug
      json.color tag.color
    end
  end
end

if errors.present?
  json.errors errors
end