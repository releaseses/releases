json.releases releases do |release|
  json.id release.id
  json.version release.version
  json.title release.title
  json.released_at release.released_at
end
