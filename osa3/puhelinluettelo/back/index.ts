import express, {Express, NextFunction, Request, Response} from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import * as PhonebookDao from './PhonebookDao'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

morgan.token('body', (req: Request) => JSON.stringify(req['body']))
app.use(morgan(':method :url :status - :response-time ms - :body'))

app.get('/persons', (_req: Request, res: Response) => {
  PhonebookDao.getAll().then((r) => {
    res.json(r)
  }).catch((e) => {
    console.log(e)
  })
})

app.get('/persons/:id', (req: Request, res: Response) => {
  PhonebookDao.find(req.params.id).then((r) => {
    if (r == undefined) {
      res.status(404)
      res.end()
      return
    }
    res.json(r)
  }).catch((e) => {
    console.log(e)
  })
})

app.delete('/persons/:id', (req: Request, res: Response) => {
  PhonebookDao.drop(req.params.id).then((dr) => {
    if (dr.deletedCount == 0) {
      res.status(404)
      res.end()
      return
    }
    res.send(`Deleted person with id ${req.params.id}`)
  }).catch((e) => {
    console.log(e)
  })
})

app.post('/persons', (req: Request, res: Response, next: NextFunction) => {
  if (req.body.name == undefined || req.body.number == undefined) {
    res.status(400)
    res.end('name and number are required fields')
    return
  }
  const person = {
    id: String(Math.floor(100000000 + Math.random() * 900000000)),
    name: String(req.body.name),
    number: String(req.body.number)
  }
  PhonebookDao.nameExists(req.body.name).then((r) => {
    if (r) {
      res.status(409)
      res.end(`A record with name ${req.body.name} already exists`)
      return
    }
    PhonebookDao.insertOne(person.name, person.number).then(() => {
      res.json(person)
    }).catch((e: Error) => {
      next(e)
    })
  }).catch((e) => {
    console.log(e)
  })
})

app.put('/persons/:id', (req: Request, res: Response, next: NextFunction) => {
  if (req.body.name == undefined || req.body.number == undefined) {
    res.status(400)
    res.end('name and number are required fields')
    return
  }

  const person = {id: req.params.id, name: req.body.name, number: req.body.number}

  PhonebookDao.find(req.params.id).then((r) => {
    if (!r) {
      res.status(404)
      res.end()
      return
    }
  }).catch((e) => {
    console.log(e)
  })

  PhonebookDao.update(person.id, person.name, person.number).then(() => {
    res.json(person)
  }).catch((e: Error) => {
    next(e)
  })
})

app.get('/info', (_req: Request, res: Response) => {
  PhonebookDao.count().then((r) => {
    const countString = `Phonebook has info for ${r} people`
    const timestamp = new Date().toISOString()
    res.send(countString + '<br/>' + timestamp)
  }).catch((e) => {
    console.log(e)
  })
})

function errorHandler(error: Error, _req: Request, res: Response, next: NextFunction) {
  if (error.name === 'CastError') {
    return res.status(400).send({error: 'malformed id'})
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({error: error.message})
  }
  return next(error)
}

app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})