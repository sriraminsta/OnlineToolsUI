import { getJson, postJson } from '../http'
import type { SamplePost } from './types'

const BASE = '/posts'

export function listSamplePosts(): Promise<SamplePost[]> {
  return getJson<SamplePost[]>(BASE)
}

export function getSamplePost(id: number): Promise<SamplePost> {
  return getJson<SamplePost>(`${BASE}/${id}`)
}

export function createSamplePost(input: Pick<SamplePost, 'title' | 'body' | 'userId'>): Promise<SamplePost> {
  return postJson<SamplePost, typeof input>(BASE, input)
}
