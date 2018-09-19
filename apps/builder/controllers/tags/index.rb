module Builder::Controllers::Tags
  class Index
    include Builder::Action
    include Import[:tag_repository]

    expose :tags

    def call(params)
      @tags = tag_repository.ordered_by_slug
    end
  end
end
