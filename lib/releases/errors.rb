module Releases::Errors
  class NotFound < StandardError
    def initialize(id)
      super "Release with id #{id} not found"
    end
  end
  class WithVersionNotFound < StandardError
    def initialize(version)
      super "Release with version #{version} not found"
    end
  end
end