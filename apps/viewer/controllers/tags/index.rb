module Viewer::Controllers::Tags
  class Index
    include Viewer::Action
    include Import[:moment, :tag_repository]

    expose :tags

    def call(params)
      @tags = tag_repository.released_before(moment)
    end
  end
end
