module Builder::Controllers::Releases
  class Destroy
    include Import[:release_repository]
    include Builder::Action

    def call(params)
      self.status = 204
      self.body = release_repository.delete(params.get(:id))
    end
  end
end
