import './App.css';
import TextArea from './components/TextArea';
import SideBar from './components/Sidebar';
import Profile from './components/Profile';
import React, {useState, useEffect} from "react";
import {v4 as uuid} from "uuid";
import {createNoteAPIMethod, deleteNoteByIdAPIMethod, getNoteByIdAPIMethod, getNotesAPIMethod, updateNoteAPIMethod} from './api/client';
import {useParams} from "react-router";


function App() {
  useEffect(() => {
    console.log("use effect function in App.js");
    getNotesAPIMethod().then((notes) => {
      setNotes(notes);
      console.dir(notes);
    })
  }, []);
  const d = new Date();
  
  const [notes, setNotes] = useState([]);
  let { noteId } = useParams();

  const [active, setActive] = useState(false);
  const [sidebarActive, setSideBarActive] = useState(false);
  const [textAreaActive, setTextAreaActive] = useState(true);

  const onAddNote = () => {
    const newNote = {
      text: "",
      lastUpdatedDate: d.toISOString().slice(0,10).replace(/-/g,"/") + ", " + d.toISOString().slice(11,19).replace(/-/g,""),
      noteTags: [],
    }
    createNoteAPIMethod(newNote, (response) => {
      console.log("Created the author on the server");
      console.dir(response);
    });

    getNotesAPIMethod().then((notes) => {
      setNotes(notes);
      console.log("notes set!");
      console.log("notes: " + notes);
    });
    setActive(notes[0]._id);
  }

  const handleDelete = (noteToDelete) => {
    if (notes.length === 0) {
      return;
    }
    deleteNoteByIdAPIMethod(noteToDelete._id).then((response) => {
      console.log("Deleted the author on the server");
    });

    getNotesAPIMethod().then((notes) => {
      setNotes(notes);
    })

    var newArray = notes.filter(note => note._id !== noteToDelete._id);
    if (newArray.length !== 0) {
      setActive(newArray[newArray.length-1]._id);
    }
  }

  const getActive = () => {
    return notes.find((note) => note._id === active);
  }

  const onEdit = (updatedNote) => {
    console.log("noteId: " + noteId);

    updateNoteAPIMethod(updatedNote).then((response) => {
      console.log("Updated note on the server");
    }) 
    var newArray = notes.map(note => {
      if (note._id === updatedNote._id) {
        return updatedNote;
      }
      return note;
    })
    setNotes(newArray);
  }

  const handleSwitch = () => {
    setSideBarActive(!sidebarActive);
    setTextAreaActive(!textAreaActive);
  }

  

  return (
    <div className='App'>
        <SideBar 
          notes={notes} 
          setNotes={setNotes} 
          onAddNote={onAddNote}
          active={active} 
          setActive={setActive} 
          sidebarActive={sidebarActive} 
          handleSwitch={handleSwitch}/>
        <TextArea 
          handleNoteDelete={handleDelete} 
          activeNote={getActive()} 
          onEdit={onEdit} 
          textAreaActive={textAreaActive} 
          handleSwitch={handleSwitch} 
          notes={notes}
          setNotes={setNotes}/>
        <Profile/>
    </div>
  );
}

export default App;
