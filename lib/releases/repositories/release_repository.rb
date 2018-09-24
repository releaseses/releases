class ReleaseRepository < Hanami::Repository
  associations do
    has_many :release_tags
    has_many :tags, through: :release_tags
  end

  def find_released_with_version(moment, version)
    releases
        .where { released_at <= moment }
        .where(version: version)
        .map_to(Release)
        .limit(1)
        .one
  end

  def ordered_by_release
    releases
        .order { released_at.desc }
        .map_to(Release)
        .to_a
  end

  def ordered_by_creation_date
    releases
        .order { created_at.desc }
        .map_to(Release)
        .to_a
  end

  def released_before(moment)
    releases
        .where { released_at <= moment }
        .order { released_at.desc }
        .map_to(Release)
        .to_a
  end

  def find_by_id_with_tags(id)
    aggregate(:tags)
        .where(id: id)
        .map_to(Release)
        .one
  end
end
