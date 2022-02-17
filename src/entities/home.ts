export interface Home {
  id: string
  streetAddress: string
  unitNumber?: string
  city: string
  province: string
  country: string
  postalCode: string
}

export interface HomeInput {
  streetAddress: string
  unitNumber?: string
  city: string
  province: string
  country: string
  postalCode: string
}

export interface HomeUpdateInput {
  streetAddress?: string
  unitNumber?: string
  city?: string
  province?: string
  country?: string
  postalCode?: string
}