export const apiMap = {
  OK: 'OK',
}

export const domainMap = {
  AUTH: '/auth-service',
  PRODUCT: '/product-service',
}

export type Domain = keyof typeof domainMap

export const objectStorageUrl = process.env.NEXT_PUBLIC_OBJECT_STORAGE_URL
