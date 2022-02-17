import { Request, Response } from 'express'
import dynamoDbClient from '../db/dynamo'
import { HomesService } from '../services/homes'

const homesService = new HomesService(dynamoDbClient)

export class HomesController {
  async index(_req: Request, res: Response) {
    const homes = await homesService.findAll()

    res.json(homes)
  }

  async show(req: Request, res: Response) {
    const home = await homesService.findOne(req.params.id)

    res.json(home)
  }

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

  async destroy(req: Request, res: Response) {
    await homesService.delete(req.params.id)

    res.json({
      message: 'Home deleted successfully.',
    })
  }
}
