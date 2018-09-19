require 'dry/monads/result'
require 'dry/monads/do/all'

module Releases
  class Operation
    Dry::Validation.load_extensions(:monads)
    include Dry::Monads::Result::Mixin
    include Dry::Monads::Do.for(:call)

    def call(*)
      raise NotImplementedError
    end
  end
end