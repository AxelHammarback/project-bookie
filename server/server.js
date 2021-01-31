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
      thumbnail: req.body.thumbnail,
      googleId: req.body.googleId
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

// 4. Remove a book (DONE)
app.delete('/books/:bookId', async (req, res) => {
  const { bookId } = req.params
  try {
    await Book.deleteOne({ _id: bookId })
    res.status(200).json({ success: "Book deleted." })
  } catch (error) {
    res.status(500).json({ message: "Could not delete book. Dunno why, sorry." })
  }
})

// Change the isRead status from "true" to "false". Checks the readStatus (from the body of the request), and updates the entry with the value.
app.patch('/books/:bookId', async (req, res) => {
  const { bookId } = req.params
  
    if (req.body.isRead === true) {
      console.log("Inside changing to false")
      try {
        await Book.findOneAndUpdate(
          { _id: bookId },
          { isRead: false },
          { new: true }
        )
        res.status(200).json({ success: "Entry updated, you have not read it" })
      } catch {
        res.status(500).json({ message: "Could not update entry" })
      }
      
    } else if (req.body.isRead === false) {
      console.log("Inside changing to true")
      try {
        await Book.findOneAndUpdate(
          { _id: bookId },
          { isRead: true },
          { new: true }
        )
        res.status(200).json({ success: "Entry updated, you have read it" })
      } catch {
        res.status(500).json({ message: "Could not update entry" })
      }
    }

})


// Change the isRead status from "false" to "true"
// 🚨 TO DO


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
