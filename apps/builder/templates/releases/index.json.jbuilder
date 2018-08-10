json.releases releases do |release|
  json.id release.id
  json.version release.version
  json.title release.title
  json.released_at release.released_at.strftime('%Y-%m-%d %H:%M:%S')
  json.created_at release.created_at.strftime('%Y-%m-%d %H:%M:%S')
end
