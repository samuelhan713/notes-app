import './App.css';
import TextArea from './components/TextArea';
import SideBar from './components/Sidebar';
import Profile from './components/Profile';
import {useState, useEffect} from "react";
import {v4 as uuid} from "uuid";


function App() {
  const d = new Date();
  const initialNotes = [
    {
      id: uuid(),
      title: "New Note",
      text: "This is a note with a long line of text. This is a test text!",
      date: d.toISOString().slice(0,10).replace(/-/g,"/") + ", " + d.toISOString().slice(11,19).replace(/-/g,""),
      noteTags: [],
    },
    {
      id: uuid(),
      title: "New Note",
      text: "Here is another example note. Testing, testing, testing!",
      date: d.toISOString().slice(0,10).replace(/-/g,"/") + ", " + d.toISOString().slice(11,19).replace(/-/g,""),
      noteTags: [],
    }
  ];

  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : initialNotes
  );
  const [active, setActive] = useState(false);
  const [sidebarActive, setSideBarActive] = useState(false);
  const [textAreaActive, setTextAreaActive] = useState(true);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "New Note",
      text: "",
      date: d.toISOString().slice(0,10).replace(/-/g,"/") + ", " + d.toISOString().slice(11,19).replace(/-/g,""),
      noteTags: [],
    }

    setNotes([newNote, ...notes]); 
    setActive(newNote.id);
  }

  const handleDelete = (noteToDelete) => {
    if (notes.length === 0) {
      return;
    }
    var newArray = notes.filter(note => note.id !== noteToDelete.id);
    setNotes(newArray);
    if (newArray.length !== 0) {
      setActive(newArray[newArray.length-1].id);
    }
  }

  const getActive = () => {
    return notes.find((note) => note.id === active);
  }

  const onEdit = (updatedNote) => {
    var newArray = notes.map(note => {
      if (note.id === updatedNote.id) {
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
        <SideBar notes={notes} onAddNote={onAddNote} active={active} setActive={setActive} sidebarActive={sidebarActive} handleSwitch={handleSwitch}/>
        <TextArea handleNoteDelete={handleDelete} activeNote={getActive()} onEdit={onEdit} textAreaActive={textAreaActive} handleSwitch={handleSwitch} notes={notes}/>
        <Profile/>
    </div>
  );
}

export default App;
