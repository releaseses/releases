import { schema } from 'normalizr'

export const tagEntity = new schema.Entity('tags', {}, { idAttribute: 'slug' })
export const tagCollection = [tagEntity]