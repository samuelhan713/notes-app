import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import './Main.css';


const Tags = () => {
    const [tags, setTags] = React.useState([]);
    
    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    }

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setTags(newTags);
    }

    const handleTagClick = (index) => {
        console.log("The tag at index " + index + "was clicked!");
    }

    const KeyCodes = {
        enter: 13
    };

    const delimiters = [KeyCodes.enter];
    return (
        <div className="tags">
            <div>
                <ReactTags
                    tags={tags}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="bottom"
                    autocomplete
                    autofocus={false}
                />
            </div>
        </div>
    )
}

export default Tags;