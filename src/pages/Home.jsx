/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Home.css";
const Home = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("notes")));
    console.log(notes);
  }, []);

  const addNote = () => {
    const note = {
      id: Math.round(Math.random() * 100000),
      content: "",
    };
    setNotes((prev) => [...prev, note]);
    console.log(notes);
  };
  const getNote = (element) => {
    const suggId = element.target.parentElement.id;
    function checkId(noteElement) {
      return noteElement.id == suggId;
    }
    var test = notes.find(checkId);
    return test;
  };
  const editNote = (e) => {
    const note = getNote(e);
    console.log(e.target.value);
    var array = [...notes];
    var index = array.indexOf(note);
    if (index != -1) {
      note.content = e.target.value;

      setNotes(array);
    }
    console.log(notes);
  };
  const deleteNote = async (element) => {
    const note = getNote(element);
    var array = [...notes];
    var index = array.indexOf(note);
    if (index != -1) {
      array.splice(index, 1);
      console.log(array);
      await setNotes(array);
    }
    console.log(index);
  };
  useEffect(() => {
    if (notes?.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);
  return (
    <div className="body">
      <div className="container">
        <h1>Sticky Notes App</h1>
        <div className="sticky-notes">
          {notes &&
            notes.map((note, index) => {
              return (
                <div className="sticky-note" key={note.id} id={note.id}>
                  <textarea
                    className="note-content"
                    value={note.content}
                    placeholder="Enter your note here"
                    onChange={(e) => editNote(e)}
                  ></textarea>
                  <button
                    className="delete-note"
                    onClick={(e) => deleteNote(e)}
                  >
                    X
                  </button>
                </div>
              );
            })}

          <div className="add-note" onClick={addNote}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
