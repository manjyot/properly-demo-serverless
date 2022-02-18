import { Book } from './book'

/**
 * @swagger
 *  components:
 *    schemas:
 *      Author:
 *        type: object
 *        required:
 *          - fullName
 *          - country
 *          - birthDate
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the author.
 *          fullName:
 *            type: string
 *            description: The full name of the author.
 *          country:
 *            type: string
 *            description: Country which the author belongs to.
 *          birthDate:
 *            type: string
 *            description: Author's date of birth.
 *        example:
 *           fullName: John Doe
 *           country: United States
 *           birthDate: 01/01/1990 
 */

export interface Author {
  id: string
  fullName: string
  country: string
  birthDate: string
}

export interface AuthorInput {
  fullName: string
  country: string
  birthDate: string
}

export interface AuthorUpdateInput {
  fullName?: string
  country?: string
  birthDate?: string
}

export interface AuthorWithBooks extends Author {
  books: Book[]
}
