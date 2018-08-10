if release.present?
  json.release do
    json.id release.id
    json.version release.version
    json.title release.title
    json.summary_raw release.summary_raw
    json.summary_html release.summary_html
    json.released_at release.released_at.strftime('%Y-%m-%d %H:%M:%S')
    json.created_at release.created_at.strftime('%Y-%m-%d %H:%M:%S')
    json.updated_at release.updated_at.strftime('%Y-%m-%d %H:%M:%S')
  end
end

if errors.any?
  json.errors errors
end