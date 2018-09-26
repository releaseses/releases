import { schema } from 'normalizr'

export const tagEntity = new schema.Entity('tags', {})
export const tagCollection = [tagEntity]