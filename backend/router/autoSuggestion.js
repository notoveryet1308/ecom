import express from 'express'
import {
  createAutoSuggestion,
  getAutoSuggetionList,
} from '../controller/autosuggestion'

const router = express.Router()

router.route('/').post(createAutoSuggestion).get(getAutoSuggetionList)

export default router
