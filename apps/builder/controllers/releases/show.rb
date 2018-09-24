module Builder::Controllers::Releases
  class Show
    include Import[:release_repository]
    include Builder::Action

    handle_exception Releases::Errors::NotFound => 404

    expose :release

    def call(params)
      @release = release_repository.find_by_id_with_tags(params.get(:id)) || (raise Releases::Errors::NotFound.new(params.get(:id)))
    end
  end
end
