import { Request, Response } from 'express'
import dynamoDbClient from '../db/dynamo'
import { HomesService } from '../services/homes'

const homesService = new HomesService(dynamoDbClient)

/**
 * @swagger
 *  tags:
 *    name: Homes
 *    description: API to manage homes.
 */

export class HomesController {
  /**
   * @swagger
   * /homes:
   *   get:
   *     summary: Retrieve a list of all homes.
   *     tags: [Homes]
   *     responses:
   *       200:
   *         description: List of homes.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                  $ref: '#/components/schemas/Home'
   */
  async index(_req: Request, res: Response) {
    const homes = await homesService.findAll()

    res.json(homes)
  }

  /**
   * @swagger
   * /homes/{id}:
   *   get:
   *     summary: Retrieve a single home by ID.
   *     tags: [Homes]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the home to retrieve.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: A single home.
   *         content:
   *           application/json:
   *             schema:
   *                $ref: '#/components/schemas/Home'
   */
  async show(req: Request, res: Response) {
    const home = await homesService.findOne(req.params.id)

    res.json(home)
  }

  /**
   * @swagger
   * /homes:
   *    post:
   *      summary: Create a new home
   *      tags: [Homes]
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Home'
   *      responses:
   *        "200":
   *          description: The created home.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Home'
   */
  async store(req: Request, res: Response) {
    const { streetAddress, unitNumber = null, city, province, country, postalCode } = req.body

    const home = await homesService.create({
      streetAddress,
      unitNumber,
      city,
      province,
      country,
      postalCode
    })

    res.json(home)
  }

   /**
   * @swagger
   * /homes/{id}:
   *    patch:
   *      summary: Update a home by ID
   *      tags: [Homes]
   *      parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the home to be updated.
   *         schema:
   *           type: string
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Home'
   *      responses:
   *        "200":
   *          description: The updated home.
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Home'
   */
  async update(req: Request, res: Response) {
    const id = req.params.id
    const { streetAddress, unitNumber, city, province, country, postalCode } = req.body

    const home = await homesService.update(id, {
      streetAddress: streetAddress || null,
      unitNumber: unitNumber || null,
      city: city || null,
      province: province || null,
      country: country || null,
      postalCode: postalCode || null
    })

    res.json(home)
  }

  /**
   * @swagger
   * /homes/{id}:
   *    delete:
   *      summary: Delete a home by ID
   *      tags: [Homes]
   *      parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the home to be deleted.
   *         schema:
   *           type: string
   *      responses:
   *        "200":
   *          description: Deleted successfully
   */
  async destroy(req: Request, res: Response) {
    await homesService.delete(req.params.id)

    res.json({
      message: 'Home deleted successfully.',
    })
  }
}
