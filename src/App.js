import './App.css';
import TextArea from './components/TextArea';
import SideBar from './components/Sidebar';
import Profile from './components/Profile';
import Tags from './components/Tags';
import {useState} from "react";
/* import uuid from "react-uuid"; */
import {v4 as uuid} from "uuid";
import { WithContext as ReactTags } from "react-tag-input";


function App() {
  const [notes, setNotes] = useState([]); //notes will store all of the notes that are added
  const [active, setActive] = useState(false);
 
  
  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "New Note",
      text: "",
      date: Date.now(),
      noteTags: [],
    }

    setNotes([newNote, ...notes]); //...notes will create a new copy of the array and then newnote is added to the new array
    setActive(newNote.id);
  }

  const handleDelete = (noteToDelete) => {
    if (notes.length === 0) {
      return;
    }
    console.log("note deleted!");
    var newArray = notes.filter(note => note.id !== noteToDelete.id);
    setNotes(newArray);
    /* setActive(notes[0].id); */
  }

  const getActive = () => { //return the object that has the "active" tag
    return notes.find((note) => note.id === active);
  }

  const onEdit = (updatedNote) => {//iterates over the entire notes array and makes changes only to the updated note
    var newArray = notes.map(note => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    })

    setNotes(newArray);
  }




  return (
    <div className='App'>
      <SideBar notes={notes} onAddNote={onAddNote} active={active} setActive={setActive}/>
      <TextArea handleNoteDelete={handleDelete} activeNote={getActive()} onEdit={onEdit}/>
      <Profile/>
    </div>
  );
}

export default App;
