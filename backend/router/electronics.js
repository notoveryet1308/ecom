import express from 'express'

import {
  getAllElectronicProduct,
  getElectronicProduct,
} from '../controller/electronics'

const router = express.Router()

router.route('/').get(getAllElectronicProduct)
router.route('/:id').get(getElectronicProduct)

export default router
