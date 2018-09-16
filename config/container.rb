class Container
  extend Dry::Container::Mixin

  register :moment, -> { Time.now }
  register :release_repository, -> { ReleaseRepository.new }, memoize: true
  register :tag_repository, -> { TagRepository.new }, memoize: true
end

Import = Dry::AutoInject(Container)