import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "../App.css";
const List = (props) => {
  const { notes, handleNoteClick, handleDeleteNote, cu } = props;
  return (
    <div className="notes-list">
      <h2>Notes List</h2>

      <ul>
        {/* {notes.map((note) => (
          <li
            key={note.id}
            className={`note-item ${
              currentNote && currentNote.id === note.id ? "active" : ""
            }`}
          >
            <div className="note-content" onClick={() => handleNoteClick(note)}>
              <h3>{note.title}</h3>
              <p>{note.body.substring(0, 50)}</p>
            </div>
            <div className="note-actions">
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDeleteNote(note.id)}
              />
            </div>
          </li>
        ))} */}
      </ul>
    </div>
  );
};
export default List;
