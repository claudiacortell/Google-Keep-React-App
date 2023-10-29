import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Note from "./Note";
import notes from "../notes";
import Footer from "./Footer";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allNotes, setAllNotes] = useState(notes);

  function handleChangeTitle(event) {
    console.log(event.target.value);
    setTitle(event.target.value);
  }

  function handleChangeContent(event) {
    console.log(event.target.value);
    setContent(event.target.value);
  }

  function deleteNote(id) {
    const updatedNotes = allNotes.filter((note) => note.key !== id);

    const updatedNotesKeys = updatedNotes.map((note) => {
      if (note.key > id) {
        return { ...note, key: note.key - 1 };
      }
      return note;
    });

    setAllNotes(updatedNotesKeys);
  }

  function CreateNotes(note) {
    return (
      <Note
        key={note.key}
        id={note.key}
        title={note.title}
        content={note.content}
        onDelete={deleteNote}
      />
    );
  }

  function handleClick(event) {
    console.log(title);
    console.log(content);

    const newNote = {
      key: allNotes.length + 1,
      title: title,
      content: content
    };

    setAllNotes([...allNotes, newNote]);
    setTitle("");
    setContent("");
    event.preventDefault();
  }

  return (
    <div className="container">
      <Header />
      <form onSubmit={handleClick}>
        <input
          onChange={handleChangeTitle}
          type="text"
          placeholder="Title"
          value={title}
        />
        <br />
        <textarea
          onChange={handleChangeContent}
          type="text"
          placeholder="Take a note..."
          value={content}
          rows="2"
        />
        <br />
        <button type="submit" onClick={handleClick}>
          +
        </button>
      </form>
      {allNotes.map(CreateNotes)}
      <Footer />
    </div>
  );
}

export default App;
