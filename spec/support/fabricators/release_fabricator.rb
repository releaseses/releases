Fabricator(:release) do
  version       { '0.0.1' }
  title         { 'First release' }
  summary_raw   { '# Release description' }
  summary_html  { '<h1>Release description</h1>' }
  released_at   { Time.now }
  created_at    { Time.now }
  updated_at    { Time.now }
end