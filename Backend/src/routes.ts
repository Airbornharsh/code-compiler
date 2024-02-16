import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Code Compiler API is running!')
})

export default router
