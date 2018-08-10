module Viewer::Controllers::Releases
  class Show
    include Import[:moment, :release_repository]
    include Viewer::Action

    handle_exception Releases::Errors::WithVersionNotFound => 404

    expose :release

    def call(params)
      @release = release_repository.find_released_with_version(moment, params.get(:version)) || (raise Releases::Errors::WithVersionNotFound.new(params.get(:version)))
    end
  end
end
