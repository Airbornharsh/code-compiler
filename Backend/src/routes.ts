import { Router } from 'express'
import {
  compileFileHandler,
  compileHandler,
  prettierHandler,
} from './controllers/cont1'
import multer from 'multer'
import { upload } from './utils/upload'

const router = Router()

router.get('/', (req, res) => {
  res.send('Code Compiler API is running!')
})
router.post('/compile', compileHandler)
router.post('/compile-file', upload.single('file'), compileFileHandler)
router.post('/prettier', prettierHandler)

export default router
