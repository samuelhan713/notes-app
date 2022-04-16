import './Main.css';
import useWindowDimensions from '../windowResize';
import {useState, useEffect} from "react";
import {getNotesAPIMethod} from '../api/client';
function Sidebar({notes, setNotes, onAddNote, active, setActive, sidebarActive, handleSwitch}) {
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        console.log("use effect function in sidebar.js");
        getNotesAPIMethod().then((notes) => {
          setNotes(notes);
          console.dir(notes);
        })
      }, []);

    return (
        <div className={`sidebar ${sidebarActive ? "activeComponent" : "false"}`}>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className="sidebar-header">
                <label htmlFor="modal"><img src="https://yt3.ggpht.com/IpUd8bbQ8AFVis-r0ypfvHvB1t8KTJWLOsbBxWbYNH24e_WIwYNwURqa009GWBy56zCrn52dqAc=s900-c-k-c0x00ffffff-no-rj"/></label>
                <div>My Notes</div>
                <span className="material-icons" id="note_add" onClick={onAddNote}>note_add</span>
            </div>
            <div className="search">
                <span className="material-icons">search</span>
                <span id="searchText">Search all notes</span>
            </div>
            <div className="sidebar-notes">
                {notes.map((note) => ( 
                    <div key={note._id} className={`sidebar-note ${note._id === active && "active"}`} onClick={() => {setActive(note._id); (width <= 500 && handleSwitch());}}>
                        <div className="note-title">
                            {/* {console.log("note.text: " + note.text)} */}
                            <h5>{note.text.length !== 0 ? note.text : "New Note"}</h5>
                        </div>
                        <div className="note-date">{note.lastUpdatedDate}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;