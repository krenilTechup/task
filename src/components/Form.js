import React from "react";
import "../App.css";
const Form = (props) => {
  const {
    title,
    body,
    currentNote,
    newNote,
    onChangeTitle,
    onChangeBody,
    handleEditNote,
    handleAddNote,
  } = props;
  return (
    <div className="note-details">
      <h2>{currentNote ? "Edit Note" : "Create Note"}</h2>
      <form>
        {currentNote || newNote ? (
          <>
            <input
              type="text"
              name="title"
              placeholder="Title"
              // value={currentNote ? currentNote.title : newNote.title}
              value={title}
              onChange={onChangeTitle}
            />
            <textarea
              name="body"
              placeholder="Body"
              value={body}
              onChange={onChangeBody}
            />
          </>
        ) : null}
        <button
          type="button"
          onClick={currentNote ? handleEditNote : handleAddNote}
        >
          {currentNote ? "Save" : "Add Note"}
        </button>
      </form>
    </div>
  );
};
export default Form;
