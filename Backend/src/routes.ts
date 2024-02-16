import { Router } from 'express'
import { compileHandler } from './controllers/cont1'

const router = Router()

router.get('/', (req, res) => {
  res.send('Code Compiler API is running!')
})
router.post('/compile', compileHandler)

export default router
