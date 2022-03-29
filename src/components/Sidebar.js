import './Main.css';
import useWindowDimensions from '../windowResize';
function Sidebar({notes, onAddNote, active, setActive, sidebarActive, handleSwitch}) {
    const { width, height } = useWindowDimensions();

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
                    <div key={note.id} className={`sidebar-note ${note.id === active && "active"}`} onClick={() => {setActive(note.id); (width <= 500 && handleSwitch());}}>
                        <div className="note-title">
                            <h5>{note.text.length !== 0 ? note.text : "New Note"}</h5>
                        </div>
                        <div className="note-date">{note.date}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar;