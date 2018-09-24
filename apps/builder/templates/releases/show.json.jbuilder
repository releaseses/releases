json.id release.id
json.title release.title
json.version release.version
json.released_at release.released_at.strftime('%Y-%m-%d %H:%M:%S')
json.summary_raw release.summary_raw
json.summary_html release.summary_html
json.tags release.tags do |tag|
  json.id tag.id
  json.name tag.name
  json.slug tag.slug
  json.color tag.color
end
