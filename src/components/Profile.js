import { useEffect, useState } from 'react';
import './Main.css';
import {createNoteAPIMethod, createUserAPIMethod, getUserByIdAPIMethod, getUsersAPIMethod, updateUserAPIMethod} from '../api/client';


function Profile(props) {
    const [user, setUser] = useState(props.user || {});

    useEffect(() => {
        console.log("useEffect function in profile.js");
        getUserByIdAPIMethod("625d428933a13d44c2779b21").then((user) => {
            setUser(user);
        })

        console.log("user: " + user);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted user form");
        console.dir(user);
        props.onSubmit(user);
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const updatedUser = {...user, [name]: value};
        setUser(updatedUser);
        console.log("user:");
        console.dir(user);
    };

    return (
        <div>
            <input type="checkbox" id="modal"/>
            <label htmlFor="modal" className="modal-background"></label>
            <div className="modal">
                <form onSubmit={handleSubmit}>
                    <div className="innerContainer" id="inner">
                        <h3>Edit Profile</h3>
                        <label htmlFor="modal">
                            <span className="material-icons" id="closeIcon">close</span>
                        </label>
                        <div className="profileHeader">
                            <img src="https://yt3.ggpht.com/IpUd8bbQ8AFVis-r0ypfvHvB1t8KTJWLOsbBxWbYNH24e_WIwYNwURqa009GWBy56zCrn52dqAc=s900-c-k-c0x00ffffff-no-rj"/>
                            <span>Add New Image</span>
                            <span>Remove Image</span>
                        </div>
                        <label htmlFor="name">Name</label>
                        <input value={user.name} type="text" placeholder="Enter Name" name="name" id="name" onChange={handleChange}/>
                        <label htmlFor="email">Email</label>
                        <input value={user.email} type="text" placeholder="Enter Email" name="email" id="email" onChange={handleChange}/>
                        <label htmlFor="theme">Color Scheme</label>
                        <br/>
                        <select name="colorScheme" id="colorScheme" value={user.colorScheme} onChange={handleChange}>
                            <option value="light">light</option>
                            <option value="dark">dark</option>
                        </select>
                        <div className="profileBottom">
                            <input type="submit" className="savebtn"/>
                            <button type="button" className="logoutbtn">Logout</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;