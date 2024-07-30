import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from './services/notes';


const App = () => {
  const [notes, setNotes] = useState([]),
    [newNote, setNewNote] = useState("a new note..."),
    [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    noteService
      .getAll()
      .then(initialNotes => setNotes(initialNotes));
  }, []);
  
  console.log("render", notes.length, "notes");


// ------------------------------------------------
// Función que cambia la importancia de las notas
// ------------------------------------------------
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id),
    changedNote = {...note, important: !note.important}
    
    noteService.update(id, changedNote).then(newImportant => {
      setNotes(notes.map(n => n.id !== id ? note : newImportant))
    })
  }


// -------------------------------------------
//  Controlador de eventos para agregar notas
// -------------------------------------------
  const addNote = (event) => {
    event.preventDefault();

    if (newNote === "") {
      alert("type something");
    } else if (notes.includes(newNote)) {
      alert(`You can't add ${newNote} because is in the list`);
    } else {
      const noteObject = {
        id: notes.length + 1,
        content: newNote,
        important: Math.random > 0.5,
      };

      noteService.create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        });
    }
  };


// --------------------------------------------------------------
//  Función que guarda los datos del input en el estado NewNote
// --------------------------------------------------------------
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };


// ---------------------------------------------------------------------------
// Constante que almacena un array con notas que pueden ser importantes o no
// dependiendo del estado showAll
// ---------------------------------------------------------------------------
  const notesToShow = showAll ? notes : notes.filter((n) => n.important);


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((n, i) => (
          <Note key={i} note={n} toggleImportance={() => toggleImportanceOf(n.id)} />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};



export default App;
