import { Router } from 'express'
import { HomesController } from '../controllers/homes'

const router = Router()
const homesController = new HomesController()

router.get('/', homesController.index)
router.get('/:id', homesController.show)
router.post('/', homesController.store)
router.patch('/:id', homesController.update)
router.delete('/:id', homesController.destroy)

export default router
