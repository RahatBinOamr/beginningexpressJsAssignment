const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Static HTML file route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Books collection
let books = [];

// Get all books
app.get("/books", (req, res) => {
  res.json(books);
});
// Generate a unique ID for the book
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
// Add a book to the collection
app.post("/books", (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
    res.status(400).json({ error: "Title and author are required" });
    return;
  }

  const id = generateId();
  const book = {
    id,
    title,
    author,
    publishedDate,
  };

  books.push(book);
  res.status(201).json(book);
});

// Delete a book from the collection
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json({ message: "Book deleted successfully" });
});

// Start the server
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
