require 'rake'

namespace :assets do
  task :precompile do
    exit(true)
  end
end

require 'hanami/rake_tasks'

begin
  require 'rspec/core/rake_task'
  RSpec::Core::RakeTask.new(:spec)
  task default: :spec
rescue LoadError
end
