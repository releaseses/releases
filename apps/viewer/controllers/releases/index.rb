module Viewer::Controllers::Releases
  class Index
    include Import[:moment, :release_repository]
    include Viewer::Action

    expose :releases

    def call(params)
      @releases = release_repository.released_before(moment)
    end
  end
end
