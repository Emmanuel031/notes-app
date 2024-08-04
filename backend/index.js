const express = require('express'),
app = express(),
cors = require('cors');


app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


const notes = [
    {
        "id": 1,
        "content": "HTML is easy",
        "important": true
    },
    {
        "id": 2,
        "content": "Browser can execute only JavaScript",
        "important": true
    },
    {
        "id": 3,
        "content": "GET and POST are the most important methods of HTTP protocol",
        "important": true
    },
    {
        "id": 4,
        "content": "a new note...",
        "important": false
    },
    {
        "id": 5,
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
    response.send('<h1>Hello world, this is my server!</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes);
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(n => n.id === id);
    response.json(note);
})

app.post('/api/notes', (request, response) => {
    const note = request.body;
    console.log(note)

    notes.push(note);
    console.log(notes);
    response.json(note);
})

app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id),
    newObject = request.body;

    notes[id - 1] = newObject;

    response.send(notes[0])
})




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})