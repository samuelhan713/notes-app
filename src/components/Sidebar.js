import './Main.css';
import useWindowDimensions from '../windowResize';
import {useState, useEffect} from "react";
import {getNotesAPIMethod, getUserNotesAPIMethod} from '../api/client';
import {useParams} from "react-router";
import {loadModel, determineRelatednessOfSentences} from '../universalSentenceEncoder';

loadModel();

function Sidebar({notes, setNotes, onAddNote, active, setActive, sidebarActive, handleSwitch, user}) {
    const { width, height } = useWindowDimensions();
    const [filteredData, setFilteredData] = useState([]);

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

    const handleRelatedNotes = (note) => {
        const x = document.getElementsByClassName('sidebar-note');

        for (var i = 0; i < x.length; i++) { //reset after other actions
            if (x[i].style.background === 'rgb(208, 237, 237)') {
                if (x[i].className !== 'sidebar-note active') {
                    x[i].removeAttribute('style');
                    document.getElementsByClassName('similarNotes')[i].innerHTML = '';
                }
            }
        }

        const comparedNote = notes.find((x) => x._id === note._id);
        var array = [];
        var allNotesText = [];
        notes.forEach((x) => x.text !== "" && allNotesText.push(x.text)); //doesn't include empty notes
        console.log("allnotes: " + allNotesText);
        
        const n = allNotesText.indexOf(comparedNote.text);

        determineRelatednessOfSentences(allNotesText, n).then((arr) => {
            array = [...arr];
            console.log(array);
            array.map((x) => {
                x.score >= 0.5 && console.log(x.score); //this prints all of the notes that have a similarity score > 0.5
            });

            for (var i = 0; i < allNotesText.length; i++) {
                if (comparedNote.text !== allNotesText[i] && array[i].score >= 0.5) {
                    console.log(document.getElementsByClassName('sidebar-note')[i]);
                    document.getElementsByClassName('sidebar-note')[i].style.background = 'rgb(208, 237, 237)';
                    document.getElementsByClassName('similarNotes')[i].innerHTML = 'similar';
                }
            }

            
        }).catch(err => {
            console.log("empty note");
        });
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
                    <div key={note._id} className={`sidebar-note ${note._id === active && "active"}`} onClick={() => {setActive(note._id); (width <= 500 && handleSwitch()); handleRelatedNotes(note);}}>
                        <div className="note-title">
                            <h5>{note.text.length !== 0 ? note.text : "New Note"}</h5>
                        </div>
                        <div className='noteFooter'>
                            <div className="note-date">{note.lastUpdatedDate}</div>
                            <div className='similarNotes'></div>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Sidebar;