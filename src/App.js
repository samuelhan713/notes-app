import './App.css';
import TextArea from './components/TextArea';
import SideBar from './components/Sidebar';
import Profile from './components/Profile';
import React, {useState, useEffect} from "react";
import {getNotesAPIMethod, updateNoteAPIMethod, updateUserAPIMethod} from './api/client';


function App() {
  const d = new Date();
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const [active, setActive] = useState(false);
  const [sidebarActive, setSideBarActive] = useState(false);
  const [textAreaActive, setTextAreaActive] = useState(true);
  

  const onAddNote = async () => {
    const data = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newNote,
        lastUpdatedDate: d.toISOString().slice(0,10).replace(/-/g,"/") + ", " + d.toISOString().slice(11,19).replace(/-/g,""),
        noteTags: [],
      })
    }).then(res => res.json());
    setNotes([data, ...notes]);
    setNewNote("");
    setActive(data._id);
  }

  const handleDelete = async noteToDelete => {
    if (notes.length === 0) {
      return;
    }
    const data = await fetch(`/api/notes/${noteToDelete._id}`, {
      method: "DELETE"
    }).then(res => res.json());
    setNotes(notes => notes.filter(notes => notes._id !== data._id));
    var tempNotes = [...notes.filter(notes => notes._id !== data._id)];
    if (notes.length !== 1) {
      setActive(tempNotes[tempNotes.length-1]._id);
    }
  }

  const getActive = () => {
    return notes.find((note) => note._id === active);
  }

  const onEdit = (updatedNote) => {
    updateNoteAPIMethod(updatedNote).then((response) => {
      console.log("Updated note on the server");
    }) 
    var newArray = notes.map(note => {
      if (note._id === updatedNote._id) {
        return updatedNote;
      }
      return note;
    })
    var sortedNotes = [updatedNote, ...newArray.filter(item => item._id !== updatedNote._id)]
    setNotes(sortedNotes);
  };

  const handleSwitch = () => {
    setSideBarActive(!sidebarActive);
    setTextAreaActive(!textAreaActive);
  }

  const handleSubmit = (user) => {
    updateUserAPIMethod(user, (response) => {
        console.log("Created the user on the server");
        console.dir(response);
    });
  }

  function sort() {
    if (notes.length === 0) {
      return;
    }
    notes.sort(function(a,b){
      return new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate);
    });
  }
  
  useEffect(() => {
    getNotesAPIMethod().then((notes) => {
      setNotes(notes.reverse());
    })
  }, []);
  sort();

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
        <Profile onSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
