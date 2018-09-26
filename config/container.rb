class Container
  extend Dry::Container::Mixin

  register :moment, -> { Time.now }
  register :release_repository, -> { ReleaseRepository.new }, memoize: true
  register :tag_repository, -> { TagRepository.new }, memoize: true

  # Operations
  register :create_tag_operation, -> { CreateTag.new }, memoize: true
  register :create_release_operation, -> { CreateRelease.new }, memoize: true
  register :update_release_operation, -> { UpdateRelease.new }, memoize: true
end

Import = Dry::AutoInject(Container)