import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [newNote, setNewNote] = useState({ title: '', body: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
    };

    const handleAddNote = () => {
        const newNoteWithId = { ...newNote, id: Date.now() };
        setNotes((prevNotes) => [...prevNotes, newNoteWithId]);
        setNewNote({ title: '', body: '' });
    };

    const handleDeleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

        if (currentNote && currentNote.id === id) {
            setCurrentNote(null);
        }
    };

    const handleEditNote = () => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === currentNote.id ? currentNote : note
            )
        );
        setCurrentNote(null);
    };

    const handleNoteClick = (note) => {
        setCurrentNote(note);
    };

    return (
        <div className="app">
            <div className="notes-list">
                <h2>Notes List</h2>
                <ul>
                    {notes.map((note) => (
                        <li
                            key={note.id}
                            className={`note-item ${currentNote && currentNote.id === note.id ? 'active' : ''}`}

                        >
                            <div className="note-content" onClick={() => handleNoteClick(note)}>
                                <h3>{note.title}</h3>
                                <p>{note.body.substring(0, 50)}</p>
                            </div>
                            <div className="note-actions">
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteNote(note.id)} />
                                {/* <button>Delete</button> */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="note-details">
                <h2>{currentNote ? 'Edit Note' : 'Create Note'}</h2>
                <form>
                    {currentNote || newNote ? (
                        <>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={currentNote ? currentNote.title : newNote.title}
                                onChange={(e) => {
                                    if (currentNote) {
                                        setCurrentNote({
                                            ...currentNote,
                                            title: e.target.value,
                                        });
                                    } else {
                                        setNewNote({
                                            ...newNote,
                                            title: e.target.value,
                                        });
                                    }
                                }}
                            />
                            <textarea
                                name="body"
                                placeholder="Body"
                                value={currentNote ? currentNote.body : newNote.body}
                                onChange={(e) => {
                                    if (currentNote) {
                                        setCurrentNote({
                                            ...currentNote,
                                            body: e.target.value,
                                        });
                                    } else {
                                        setNewNote({
                                            ...newNote,
                                            body: e.target.value,
                                        });
                                    }
                                }}
                            />
                        </>
                    ) : null}
                    <button type="button" onClick={currentNote ? handleEditNote : handleAddNote}>
                        {currentNote ? 'Save' : 'Add Note'}
                    </button>
                </form>
            </div>
        </div>
    );
};


export default App;
