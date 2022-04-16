import './App.css';
import TextArea from './components/TextArea';
import SideBar from './components/Sidebar';
import Profile from './components/Profile';
import {useState, useEffect} from "react";
import {v4 as uuid} from "uuid";
import {createNoteAPIMethod, deleteNoteByIdAPIMethod, getNotesAPIMethod} from './api/client';


function App() {
  const d = new Date();
  
  const [notes, setNotes] = useState([]);

  const [active, setActive] = useState(false);
  const [sidebarActive, setSideBarActive] = useState(false);
  const [textAreaActive, setTextAreaActive] = useState(true);

  const onAddNote = () => {

    const newNote = {
      text: "",
      lastUpdatedDate: d.toISOString().slice(0,10).replace(/-/g,"/") + ", " + d.toISOString().slice(11,19).replace(/-/g,""),
    }
    createNoteAPIMethod(newNote, (response) => {
      console.log("Created the author on the server");
      console.dir(response);
    });

    getNotesAPIMethod().then((notes) => {
      setNotes(notes);
    });
    setActive(notes[0]._id);
  }

  const handleDelete = (noteToDelete) => {
    deleteNoteByIdAPIMethod(noteToDelete._id).then((response) => {
      console.log("Deleted the author on the server");
    });

    getNotesAPIMethod().then((notes) => {
      setNotes(notes);
    })

    if (notes.length === 0) {
      return;
    }
    var newArray = notes.filter(note => note._id !== noteToDelete._id);
    if (newArray.length !== 0) {
      setActive(newArray[newArray.length-1]._id);
    }
  }

  const getActive = () => {
    return notes.find((note) => note._id === active);
  }

  const onEdit = (updatedNote) => {
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
          notes={notes}/>
        <Profile/>
    </div>
  );
}

export default App;
