const express = require('express'),
    cors = require('cors'),
    app = express();

app.use(cors())

const notes = [
    {
        "id": "1",
        "content": "HTML is easy",
        "important": true
    },
    {
        "id": "2",
        "content": "Browser can execute only JavaScript",
        "important": true
    },
    {
        "id": "3",
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
    },
    {
        "id": "4",
        "content": "a new note...",
        "important": false
    },
    {
        "id": "5",
        "content": "Learn C#",
        "important": true
    },
    {
        "id": 6,
        "content": "Learn PHP",
        "important": false
    },
    {
        "id": 7,
        "content": "Learn Swift",
        "important": false
    }
]


app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
});

app.get('/api/notes', (request, response) => {
    response.json(notes);
})


let PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});

