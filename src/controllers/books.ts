import { Request, Response } from 'express'
import dynamoDbClient from '../db/dynamo'
import { BooksService } from '../services/books'

const booksService = new BooksService(dynamoDbClient)

/**
 * @swagger
 *  tags:
 *    name: Books
 *    description: API to manage books.
 */

export class BooksController {
  /**
   * @swagger
   * /books:
   *   get:
   *     summary: Retrieve a list of all books.
   *     tags: [Books]
   *     responses:
   *       200:
   *         description: List of books.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                  $ref: '#/components/schemas/Book'
   */
  async index(req: Request, res: Response) {
    const books = await booksService.findAll()

    res.json(books)
  }

  /**
   * @swagger
   * /books/{id}:
   *   get:
   *     summary: Retrieve a single book by ID.
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the book to retrieve.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: A single book.
   *         content:
   *           application/json:
   *             schema:
   *                $ref: '#/components/schemas/Book'
   */
  async show(req: Request, res: Response) {
    const book = await booksService.findOne(req.params.id)

    res.json(book)
  }

  /**
   * @swagger
   * /books/author/{id}:
   *   get:
   *     summary: Retrieve a list of all books from an author.
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the author whose books are to be retrieved.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: List of books by an author.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                  $ref: '#/components/schemas/Book'
   */
  async showAuthorBooks(req: Request, res: Response) {
    const books = await booksService.findAllByAuthorId(req.params.id)

    res.json(books)
  }

  /**
   * @swagger
   * /books:
   *    post:
   *      summary: Create a new book
   *      tags: [Books]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Book'
   *      responses:
   *        "200":
   *          description: The created book.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Book'
   */
  async store(req: Request, res: Response) {
    const { fullName, authorId, releaseDate } = req.body

    const book = await booksService.create({
      fullName,
      authorId,
      releaseDate,
    })

    res.json(book)
  }

  /**
   * @swagger
   * /books/{id}:
   *    patch:
   *      summary: Update a books by ID
   *      tags: [Books]
   *      parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the book to be updated.
   *         schema:
   *           type: string
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Book'
   *      responses:
   *        "200":
   *          description: The updated book.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Book'
   */
  async update(req: Request, res: Response) {
    const id = req.params.id
    const { fullName, releaseDate } = req.body

    const book = await booksService.update(id, { fullName, releaseDate })

    res.json(book)
  }

  /**
   * @swagger
   * /books/{id}:
   *    delete:
   *      summary: Delete a book by ID
   *      tags: [Books]
   *      parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the book to be deleted.
   *         schema:
   *           type: string
   *      responses:
   *        "200":
   *          description: Deleted successfully
   */
  async destroy(req: Request, res: Response) {
    await booksService.delete(req.params.id)

    res.json({ message: 'Book deleted successfully.' })
  }
}
