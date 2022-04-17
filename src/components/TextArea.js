import './Main.css';
import { WithContext as ReactTags } from "react-tag-input";
import { useState } from 'react';
import {updateNoteAPIMethod} from '../api/client';



function TextArea({handleNoteDelete, activeNote, onEdit, textAreaActive, handleSwitch, notes}) {
    const[tags, setTags] = useState([]);
    const d = new Date();
    
    const onType = (field, value) => {
        onEdit(
            {
                ...activeNote,
                [field]:value,
                date: d.toISOString().slice(0,10).replace(/-/g,"/") + ", " + d.toISOString().slice(11,19).replace(/-/g,""),
            }
        )
    }

    const onNoteDelete = () => {
        handleNoteDelete(activeNote);
        /* localStorage.setItem("notes", JSON.stringify(notes)); */
    }

    const handleDelete = (i) => {
        activeNote.noteTags.splice(i, 1);
    }

    const handleAddition = (tag) => {
        activeNote.noteTags.push(tag);
        /* localStorage.setItem("notes", JSON.stringify(notes)); */
    }

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = activeNote.noteTags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        activeNote.noteTags = [...newTags];
        setTags(newTags);
        /* localStorage.setItem("notes", JSON.stringify(notes)); */
    }


    

    const KeyCodes = {
        enter: 13
    };

    const delimiters = [KeyCodes.enter];

    if (!activeNote) {
        return (
            <div className={`text-main ${textAreaActive ? "activeComponent" : "false"}`}>
                <div className="text-main-header">
                    <span className="material-icons" onClick={handleSwitch}>arrow_back</span>
                    <span className="material-icons">notification_add</span>
                    <span className="material-icons">person_add_alt</span>
                    <span className="material-icons" onClick={onNoteDelete}>delete</span>
                </div> 
            </div>
        )
    }
    return (
        <div className={`text-main ${textAreaActive ? "activeComponent" : "false"}`}>
            <div className="text-main-header">
                <span className="material-icons" id="arrow-back" onClick={handleSwitch}>arrow_back</span>
                <span className="material-icons">notification_add</span>
                <span className="material-icons">person_add_alt</span>
                <span className="material-icons" onClick={onNoteDelete}>delete</span>
                <button>Save</button>
            </div>
            <div className="main-textarea">
                <textarea value={activeNote.text} onChange={(e) => onType("text", e.target.value)}/>
            </div>
            <div className="text-main-footer">
                <div className="tags">
                    <ReactTags
                        tags={activeNote.noteTags}
                        delimiters={delimiters}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        handleDrag={handleDrag}
                        inputFieldPosition="inline"
                        placeholder="Enter a tag"
                        autocomplete
                        autofocus={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default TextArea;

