import fs from 'fs'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filePath = 'temp/'
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp')
    }
    cb(null, filePath)
  },
  filename: function (req, file, cb) {
    // const filename = uuidv4() + '.' + `${file.originalname.split('.').pop()}`
    if (!fs.existsSync('temp')) {
      fs.mkdirSync('temp')
    }
    cb(null, file.originalname)
  },
})

export const upload = multer({ storage: storage })
