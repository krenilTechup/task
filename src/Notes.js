import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const initialNote = [
        { id: 0, title: 'Title-1', body: 'Body-1' },
        { id: 1, title: 'Title-2', body: 'Body-2' }
    ]
    const [notes, setNotes] = useState(initialNote);
    const [currentNote, setCurrentNote] = useState(null);
    const [ViewCurrentNote, setViewCurrentNote] = useState(null);
    const [isView, setIsView] = useState(false)
    const [newNote, setNewNote] = useState({ title: '', body: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
    };
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleAddNote = () => {

        if (newNote?.title && newNote?.body) {
            const newNoteWithId = { ...newNote, id: Date.now() };
            setNotes((prevNotes) => [...prevNotes, newNoteWithId]);
            setNewNote({ title: '', body: '' });

        }
        else {
            if (!newNote.title && !newNote.body) {
                alert("Please Fill the Inputs")
            }
            else {
                !newNote.title ? alert("Title should not be empty") : alert("Body should not be empty")

            }
        }
    };

    const handleDeleteNote = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

        if (currentNote && currentNote.id === id) {
            setCurrentNote(null);
        }
    };

    const handleEditNote = () => {
        if (currentNote.title && currentNote.body) {
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === currentNote.id ? currentNote : note
                )
            );
            setCurrentNote(null);
        }
        else {
            if (!currentNote.title && !currentNote.body) {
                alert("Please Fill the Inputs")
            }
            else {
                !currentNote.title ? alert("Title should not be empty") : alert("Body should not be empty")

            }
        }
    };

    const handleNoteClick = (note) => {
        setCurrentNote(note);
        setIsView(false)
    };
    const handleViewNoteClick = (note) => {
        setViewCurrentNote(note)
        setIsView(true)
    };
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.body.toLowerCase().includes(searchQuery.toLowerCase())
    )
    console.log(filteredNotes)
    return (
        <div className="app">
            <div className="notes-list">
                <div className='note-list-top'>
                    <h2>Notes List</h2>
                    <button onClick={() => { setCurrentNote(null); setIsView(false) }}>Add New</button>
                </div>
                <ul>
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    {filteredNotes.map((note) => (
                        <li
                            key={note.id}
                            className={`note-item ${currentNote && currentNote.id === note.id ? 'active' : ''}`}

                        >
                            <div className="note-content" onClick={() => handleViewNoteClick(note)}>
                                <h3>{note.title}</h3>
                                <p>{note.body.substring(0, 50)}</p>
                            </div>
                            <div className="note-actions">
                                <FontAwesomeIcon icon={faEdit} onClick={() => handleNoteClick(note)} />
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteNote(note.id)} />
                                {/* <button>Delete</button> */}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="note-details">
                {console.log(currentNote)}
                {isView ? ViewCurrentNote && <>
                    <h1>Title</h1><p>{ViewCurrentNote.title}</p>
                    <h1>Body</h1><p>{ViewCurrentNote.body}</p>
                </> : <>
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

                </>
                }
            </div>
        </div>
    );
};


export default App;
