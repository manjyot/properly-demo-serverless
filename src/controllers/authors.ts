import { Request, Response } from 'express'
import dynamoDbClient from '../db/dynamo'
import { AuthorsService } from '../services/authors'

const authorsService = new AuthorsService(dynamoDbClient)

/**
 * @swagger
 *  tags:
 *    name: Authors
 *    description: API to manage authors.
 */

export class AuthorsController {
   /**
   * @swagger
   * /authors:
   *   get:
   *     summary: Retrieve a list of all authors.
   *     tags: [Authors]
   *     responses:
   *       200:
   *         description: List of authors.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                  $ref: '#/components/schemas/Author'
   */
  async index(_req: Request, res: Response) {
    const authors = await authorsService.findAll()

    res.json(authors)
  }

  /**
   * @swagger
   * /authors/{id}:
   *   get:
   *     summary: Retrieve a single author by ID.
   *     tags: [Authors]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the author to retrieve.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: A single author.
   *         content:
   *           application/json:
   *             schema:
   *                $ref: '#/components/schemas/Author'
   */
  async show(req: Request, res: Response) {
    const author = await authorsService.findOne(req.params.id)

    res.json(author)
  }

  /**
   * @swagger
   * /authors:
   *    post:
   *      summary: Create a new author
   *      tags: [Authors]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Author'
   *      responses:
   *        "200":
   *          description: The created author.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Author'
   */
  async store(req: Request, res: Response) {
    const { fullName, country, birthDate } = req.body

    const author = await authorsService.create({
      fullName,
      birthDate,
      country,
    })

    res.json(author)
  }

  /**
   * @swagger
   * /authors/{id}:
   *    patch:
   *      summary: Update an author by ID
   *      tags: [Authors]
   *      parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the author to be updated.
   *         schema:
   *           type: string
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Author'
   *      responses:
   *        "200":
   *          description: The updated author.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Author'
   */
  async update(req: Request, res: Response) {
    const id = req.params.id
    const { fullName, country, birthDate } = req.body

    const author = await authorsService.update(id, {
      fullName: fullName || null,
      birthDate: birthDate || null,
      country: country || null,
    })

    res.json(author)
  }

  /**
   * @swagger
   * /authors/{id}:
   *    delete:
   *      summary: Delete an author by ID
   *      tags: [Authors]
   *      parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the author to be deleted.
   *         schema:
   *           type: string
   *      responses:
   *        "200":
   *          description: Deleted successfully
   */
  async destroy(req: Request, res: Response) {
    await authorsService.delete(req.params.id)

    res.json({
      message: 'Author deleted successfully.',
    })
  }
}
