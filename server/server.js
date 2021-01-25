import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import booksData from './data/books.json'

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/project-bookie'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(bodyParser.json())

const Member = new mongoose.model('Member', {
  name: String,
  surname: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  lettersInName: Number,
  isPapa: Boolean,
})

const Role = new mongoose.model('Role', {
  description: String,
})

const Book = new mongoose.model('Book', {
  title: String,
  author: String,
  thumbnail: String,
  googleId: String,
  isRead: {
    type: Boolean,
    default: false,
  },
  dateRead: {
    type: Date,
    default: () => new Date()
  },
  rating: {
    type: Number,
    default: null
  },
})


if (process.env.RESET_DATABASE) {
  const populateDatabase = async () => {
    // Clear database
    await Book.deleteMany()

    booksData.forEach(async bookItem => {
      const newBook = new Book(bookItem)
      await newBook.save()
    })
  }
  populateDatabase()
}

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Yo this is the book project')
})

// ========== MY ENDPOINTS ========== //


// 1. Get all books
app.get('/books', async (req, res) => {
  const allBooks = await Book.find()
  res.json(allBooks)
})

// 2. Post a new book
app.post('/books', async (req, res) => {
  try {
    // Success code – what happens if all goes well. We need to take a few things out of the body, and save them into the database.
    const book = await new Book({
      title: req.body.title,
      author: req.body.author,
    }).save()
    res.status(200).json(book)
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" })
  }
})

// 3. Get all books with isRead: true
app.get('/books/wantToRead', async (req, res) => {
  const allBooks = await Book.find({ isRead: false })
  res.json(allBooks)
})

// 3. Get all books with "isRead" = true
app.get('/books/isRead', async (req, res) => {
  const readBooks = await Book.find({ isRead: true })
  res.json(readBooks)
})

// ========== END OF MY ENDPOINTS ========== //

app.get('/members', async (req, res) => {
  const allMembers = await Member.find(req.query)
  res.json(allMembers)
})

app.get('/members/:name', (req, res) => {
  Member.findOne({ name: req.params.name })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.status(400).json({ error: 'Invalid name' })
    })
})

app.get('/members/role/:role', (req, res) => {
  Member.find(req.params, (err, data) => {
    res.json(data)
  })
})

app.get('/members/:id/role', async (req, res) => {
  // Find for single member with ID from req.params
  const singleMember = await Member.findById(req.params.id)

  // Find role details for single member queried above
  const singleMemberRole = await Role.findById(singleMember.role)

  if (singleMemberRole) {
    res.json(singleMemberRole)
  } else {
    res.json(404).json({ error: 'Not found' })
  }
})

/////////////////////////
/// Week 19 endpoints ///
/////////////////////////

app.delete('/members/:id', async (req, res) => {
  try {
    // Try to delete the user
    await Member.deleteOne({ _id: req.params.id })
    // Send a successful response
    res.status(200).json({ success: true })

  } catch (error) {
    console.log(error)
    // Inform the client about the deletion failure
    res.status(400).json({ success: false })
  }
})

app.post('/members', async (req, res) => {
  try {
    // Don't blindly send in the req.body in the DB.
    const newMember = await new Member(req.body).save()
    res.status(200).json(newMember)
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, error })
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
