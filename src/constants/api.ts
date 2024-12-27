export const apiMap = {
  OK: 'OK',
}

export const domainMap = {
  AUTH: '/auth-service',
  PRODUCT: '/product-service',
}

export type Domain = keyof typeof domainMap
