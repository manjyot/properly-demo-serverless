/**
 * @swagger
 *  components:
 *    schemas:
 *      Home:
 *        type: object
 *        required:
 *          - streetAddress
 *          - city
 *          - province
 *          - country
 *          - postalCode
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the home.
 *          streetAddress:
 *            type: string
 *            description: The street address of the home.
 *          unitNumber:
 *            type: string
 *            description: The unit number(if any?) of the home.
 *          city:
 *            type: string
 *            description: The city where the home is located.
 *          province:
 *            type: string
 *            description: The province where the home is located.
 *          country:
 *            type: string
 *            description: The country where the home is located.
 *          postalCode:
 *            type: string
 *            description: The postal code of the home.
 *        example:
 *           streetAddress: 100 County Court Blvd
 *           unitNumber: 1107
 *           city: Brampton
 *           province: ON
 *           country: Canada
 *           postalCode: L6W 3X1
 */

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