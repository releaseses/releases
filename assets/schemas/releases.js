import { schema } from 'normalizr'
import { tagCollection } from './tags'

export const releaseEntity = new schema.Entity('releases', { tags: tagCollection }, { idAttribute: 'id' })
export const releaseCollection = [releaseEntity]