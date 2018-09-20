Fabricator(:release_tag) do
  transient :release
  transient :tag
  release_id { |attrs| attrs[:release].id }
  tag_id { |attrs| attrs[:tag].id }
end
