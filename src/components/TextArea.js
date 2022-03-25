import './Main.css';
import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

function TextArea({handleNoteDelete, activeNote, onEdit}) {
    const [tags, setTags] = React.useState([]);
    
    const onType = (field, value) => {
        onEdit(
            {
                ...activeNote,
                [field]:value,
                date: Date.now()
            }
        )
    }

    const onNoteDelete = () => {
        handleNoteDelete(activeNote);
    }



    const handleDelete = (i) => {
        console.log("A tag was deleted!");
        activeNote.noteTags.splice(i, 1);
    }

    const handleAddition = (tag) => {
        activeNote.noteTags.push(tag);
    }

    const handleDrag = (tag, currPos, newPos) => {//????
        /* const newTags = activeNote.noteTags.slice(); */
        activeNote.noteTags.splice(currPos, 1);
        activeNote.noteTags.splice(newPos, 0, tag);

        activeNote.noteTags = [...activeNote.noteTags];
        /* setTags(newTags); */
    }

    const handleTagClick = (index) => {
        console.log("The tag at index " + index + "was clicked!");
    }

    const KeyCodes = {
        enter: 13
    };

    const delimiters = [KeyCodes.enter];

    if (!activeNote) {
        return (
            <div className="text-main-header">
                <span className="material-icons">arrow_back</span>
                <span className="material-icons">notification_add</span>
                <span className="material-icons">person_add_alt</span>
                <span className="material-icons" onClick={onNoteDelete}>delete</span>
            </div>
        )
    }
    return (
        <div className="text-main">
            <div className="text-main-header">
                <span className="material-icons">arrow_back</span>
                <span className="material-icons">notification_add</span>
                <span className="material-icons">person_add_alt</span>
                <span className="material-icons" onClick={onNoteDelete}>delete</span>
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
                        handleTagClick={handleTagClick}
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