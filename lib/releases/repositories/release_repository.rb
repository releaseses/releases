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

  def create_with_tags(release, tags)
    # @todo Refactor ReleaseRepository#create_with_tags
    # @body There should be a way to return Release entity with attached tags without extra SELECT
    transaction do
      r = create(release)
      tags.each do |tag|
        assoc(:release_tags, r).add(tag_id: tag.id)
      end
      find_by_id_with_tags(r.id)
    end
  end

  def update_with_tags(id, release_attributes, tags)
    # @todo Refactor ReleaseRepository#update_with_tags
    # @body There should be a way to make it
    transaction do
      r = update(id, release_attributes)
      assoc(:release_tags, r).delete
      tags.each do |tag|
        assoc(:release_tags, r).add(tag_id: tag.id)
      end
      find_by_id_with_tags(r.id)
    end
  end
end
