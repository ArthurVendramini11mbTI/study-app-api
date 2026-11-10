import type { Response } from 'express'

export const AUTH_COOKIE_NAME = 'axis_access_token'

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie(AUTH_COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: 60 * 60 * 1000,
  })
}

export function clearAuthCookie(res: Response) {
  res.clearCookie(AUTH_COOKIE_NAME, cookieOptions)
}

export function getAuthCookie(cookieHeader: string | undefined) {
  if (!cookieHeader) {
    return null
  }

  for (const cookie of cookieHeader.split(';')) {
    const separatorIndex = cookie.indexOf('=')

    if (separatorIndex < 0) {
      continue
    }

    const name = cookie.slice(0, separatorIndex).trim()

    if (name !== AUTH_COOKIE_NAME) {
      continue
    }

    const value = cookie.slice(separatorIndex + 1).trim()

    try {
      return decodeURIComponent(value)
    } catch {
      return null
    }
  }

  return null
}
