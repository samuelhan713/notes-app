import './App.css';
import TextArea from './components/TextArea';
import SideBar from './components/Sidebar';
import Profile from './components/Profile';
import LoginPage from './components/LoginPage';
import React, {useState, useEffect, Fragment} from "react";
import {createUserAPIMethod, getNotesAPIMethod, getUsersAPIMethod, updateNoteAPIMethod, updateUserAPIMethod} from './api/client';
import {Route, Redirect, Switch, BrowserRouter, useHistory} from 'react-router-dom';


function App() {
  const d = new Date();
  
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [active, setActive] = useState(false);
  const [sidebarActive, setSideBarActive] = useState(false);
  const [textAreaActive, setTextAreaActive] = useState(true);
  const [registerErrorMessage, setRegisterErrorMessage] = useState(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState(null);
  const history = useHistory();

  const routeChange = () => {
    let path = "/notes";
    history.push(path);
  }

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
        console.log("Updated the user on the server");
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

  const onRegister = (user) => {
    setRegisterErrorMessage(null);
    createUserAPIMethod(user).catch(err => {
      console.log("invalid register");
      setRegisterErrorMessage("Invalid email and/or password");
    });
  }


  const onLogin = (user) => {
    setLoginErrorMessage(null);
    console.dir(user);
    getUsersAPIMethod(user, (response) => {console.dir(response);}).catch(err => {
      setLoginErrorMessage("Error: Invalid email and/or password");
      return;
    });
    //redirect to notes page (not working?)
    /* routeChange(); */

  }

  
  useEffect(() => {
    getNotesAPIMethod().then((notes) => {
      setNotes(notes.reverse());
    })
  }, []);
  sort();

  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Route path='/loginPage' render={() => <LoginPage 
                                                    onRegister={onRegister}
                                                    onLogin={onLogin}
                                                    registerErrorMessage={registerErrorMessage}
                                                    setRegisterErrorMessage={setRegisterErrorMessage}
                                                    loginErrorMessage={loginErrorMessage}
                                                    setLoginErrorMessage={setLoginErrorMessage}/>}/>
          <Route path='/notes' render={ () => <Fragment>
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
                                        </Fragment>}/>
          <Route exact path='/' render={() => {
            <Redirect to='/loginPage'/>
          }}/>
        </Switch>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
