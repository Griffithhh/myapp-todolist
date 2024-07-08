 const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json');

const app = express();

app.use(cors());

const MAX_CLIENTS = 0;  // Максимальное количество клиентов установлено на 0
let currentClients = 0;

function getRandomBook() {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    return randomBook;
}

// Middleware to track the number of active clients
app.use((req, res, next) => {
    if (currentClients >= MAX_CLIENTS) {
        return res.status(503).json({ error: 'Server is too busy. Try again later.' });
    }
    currentClients++;
    res.on('finish', () => {
        currentClients--;
    });
    next();
});

app.get('/random-book', (req, res) => {
    res.json(getRandomBook());
});

app.get('/random-book-delayed', (req, res) => {
    setTimeout(() => {
        res.json(getRandomBook());
    }, 2000);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
