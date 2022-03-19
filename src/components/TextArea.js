import './Main.css';

function TextArea({handleDelete, activeNote, onEdit}) {
    
    const onType = (field, value) => {
        onEdit(
            {
                ...activeNote,
                [field]:value,
                date: Date.now()
            }
        )
    }

    const onDelete = () => {
        handleDelete(activeNote);
    }
        

    if (!activeNote) {
        return (
            <div className="text-main-header">
                <span className="material-icons">arrow_back</span>
                <span className="material-icons">notification_add</span>
                <span className="material-icons">person_add_alt</span>
                <span className="material-icons" onClick={handleDelete}>delete</span>
            </div>
        )
    }
    return (
        <div className="text-main">
            <div className="text-main-header">
                <span className="material-icons">arrow_back</span>
                <span className="material-icons">notification_add</span>
                <span className="material-icons">person_add_alt</span>
                <span className="material-icons" onClick={onDelete}>delete</span>
            </div>
            <div className="main-textarea">
                <textarea value={activeNote.text} onChange={(e) => onType("text", e.target.value)}/>
            </div>
        </div>
    )
}

export default TextArea;