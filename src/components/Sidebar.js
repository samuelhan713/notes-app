import './Main.css';
import useWindowDimensions from '../windowResize';
import {useState, useEffect} from "react";
import {getNotesAPIMethod, getUserNotesAPIMethod} from '../api/client';
import {useParams} from "react-router";

function Sidebar({notes, setNotes, onAddNote, active, setActive, sidebarActive, handleSwitch, user}) {
    const { width, height } = useWindowDimensions();
    const [filteredData, setFilteredData] = useState([]);
    const userId = useParams();
    console.dir(userId.userId);

    /* useEffect(() => {
        getNotesAPIMethod().then((notes) => {
          setNotes(notes);
          console.dir(notes);
        })
      }, []); */
      useEffect(() => {
          getNotesAPIMethod().then((notes) => {
              setNotes(notes);
              console.dir(notes);
          })
      }, []);

    const handleFilter = (e) => {
        if (notes.length === 0) {
            return;
        }
        const searchWord = e.target.value;
        const newFilter = notes.filter((value) => {
            return value.text.includes(searchWord);
        });
        setFilteredData(newFilter);
        var tempFilteredData = [...notes.filter((value) => value.text.includes(searchWord))];
        setActive(tempFilteredData[0] !== undefined ? tempFilteredData[0]._id : null);
    }

    return (
        <div className={`sidebar ${sidebarActive ? "activeComponent" : "false"}`}>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className="sidebar-header">
                <label htmlFor="modal"><img src={user.profileImageUrl}/></label>
                <div>My Notes</div>
                <span className="material-icons" id="note_add" onClick={() => {onAddNote(); document.getElementById("searchText").value = ""; setFilteredData([])}}>note_add</span>
            </div>
            <div className="search">
                <span className="material-icons">search</span>
                <input type="text" id="searchText" placeholder="Search all notes" onChange={handleFilter}></input>
            </div>
            {filteredData.length !== 0 && (
                <div className="sidebar-notes">
                {filteredData.map((note) => ( 
                    <div key={note._id} className={`sidebar-note ${note._id === active && "active"}`} onClick={() => {setActive(note._id); (width <= 500 && handleSwitch());}}>
                        <div className="note-title">
                            <h5>{note.text.length !== 0 ? note.text : "New Note"}</h5>
                        </div>
                        <div className="note-date">{note.lastUpdatedDate}</div>
                    </div>
                    ))}
                </div>
            )}
            {filteredData.length === 0 && (
                <div className="sidebar-notes">
                {notes.map((note) => ( 
                    <div key={note._id} className={`sidebar-note ${note._id === active && "active"}`} onClick={() => {setActive(note._id); (width <= 500 && handleSwitch());}}>
                        <div className="note-title">
                            <h5>{note.text.length !== 0 ? note.text : "New Note"}</h5>
                        </div>
                        <div className="note-date">{note.lastUpdatedDate}</div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Sidebar;