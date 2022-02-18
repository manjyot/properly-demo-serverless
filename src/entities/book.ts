import { Author } from './author'

/**
 * @swagger
 *  components:
 *    schemas:
 *      Book:
 *        type: object
 *        required:
 *          - fullName
 *          - releaseDate
 *          - authorId
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the book.
 *          fullName:
 *            type: string
 *            description: The name/title of the book.
 *          releaseDate:
 *            type: string
 *            description: Date the book was released.
 *          authorId:
 *            type: string
 *            description: Unique id of the author.
 *        example:
 *           fullName: Book 1
 *           releaseDate: 01/01/2020
 *           authorId: 1
 */

export interface Book {
  id: string
  fullName: string
  releaseDate: string
  authorId: string
}

export interface BookInput {
  fullName: string
  releaseDate: string
  authorId: string
}

export interface BookUpdateInput {
  fullName?: string
  releaseDate?: string
}

export interface BookWithAuthor extends Book {
  author: Author
}
