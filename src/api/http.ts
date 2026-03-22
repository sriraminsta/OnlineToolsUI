import { getApiBaseUrl } from './config'

export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(message: string, status: number, body: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

function joinUrl(base: string, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base.replace(/\/$/, '')}${normalized}`
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = joinUrl(getApiBaseUrl(), path)
  const headers = new Headers(init?.headers)
  if (init?.body != null && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(url, { ...init, headers })
  const text = await res.text()
  let parsed: unknown
  if (text) {
    try {
      parsed = JSON.parse(text) as unknown
    } catch {
      throw new ApiError('Invalid JSON in response', res.status, text)
    }
  }

  if (!res.ok) {
    throw new ApiError(res.statusText || 'Request failed', res.status, parsed ?? text)
  }

  return parsed as T
}

export function getJson<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'GET' })
}

export function postJson<TResponse, TBody extends object>(path: string, body: TBody): Promise<TResponse> {
  return request<TResponse>(path, { method: 'POST', body: JSON.stringify(body) })
}
