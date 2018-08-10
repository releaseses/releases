module Builder::Controllers::Releases
  class Index
    include Import[:release_repository]
    include Builder::Action

    expose :releases

    def call(params)
      @releases = release_repository.ordered_by_creation_date
    end
  end
end
