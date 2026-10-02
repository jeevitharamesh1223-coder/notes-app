import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const inputRef = useRef(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    setIsLoaded(true);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  // Add note
  function handleAddNote() {
    if (note.trim() === "") {
      return;
    }

    setNotes([...notes, note]);
    setNote("");

    inputRef.current.focus();
  }

  // Edit note
  function handleEdit(index) {
    setNote(notes[index]);
    setEditIndex(index);

    inputRef.current.focus();
  }

  // Save edited note
  function handleSaveEdit() {
    if (note.trim() === "") {
      return;
    }

    const updatedNotes = [...notes];

    updatedNotes[editIndex] = note;

    setNotes(updatedNotes);
    setNote("");
    setEditIndex(null);

    inputRef.current.focus();
  }

  // Delete note
  function handleDelete(index) {
    const updatedNotes = notes.filter((_, i) => i !== index);

    setNotes(updatedNotes);

    inputRef.current.focus();
  }

  return (
    <div className="notes-app">
      <h1>📝 Notes App</h1>

      <div className="input-section">
        <input
          ref={inputRef}
          type="text"
          placeholder="Write your note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {editIndex === null ? (
          <button className="add-button" onClick={handleAddNote}>
            Add Note
          </button>
        ) : (
          <button className="save-button" onClick={handleSaveEdit}>
            Save
          </button>
        )}
      </div>

      <p className="total-notes">
        Total notes: {notes.length}
      </p>

      <h2>Your Notes</h2>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes">No notes yet. Add your first note! ✨</p>
        ) : (
          notes.map((currentNote, index) => (
            <div className="note-card" key={index}>
              <span>{currentNote}</span>

              <div className="note-buttons">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;