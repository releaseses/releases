class ReleaseRepository < Hanami::Repository
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
end
