class TagRepository < Hanami::Repository
  associations do
    has_many :release_tags, foreign_key: :tag_id
    has_many :releases, through: :release_tags, foreign_key: :release_id
  end

  def ordered_by_slug
    tags
        .order { slug.asc }
        .map_to(Tag)
        .to_a
  end

  def released_before(moment)
    tags
        .join(:release_tags)
        .join(:releases, id: :release_id)
        .where(releases[:released_at].qualified <= moment)
        .order(releases[:released_at].desc)
        .map_to(Tag)
        .to_a
  end

  def find_by_slug(slug)
    tags
        .where(slug: slug)
        .map_to(Tag)
        .one
  end
end
