class ReleaseTagRepository < Hanami::Repository
  associations do
    belongs_to :release
    belongs_to :tag
  end
end
