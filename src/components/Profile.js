import { useEffect, useState } from 'react';
import './Main.css';
import {getUserByIdAPIMethod} from '../api/client';
import {useParams} from "react-router";


function Profile({onSubmit, user, setUser}) {
    /* const [user, setUser] = useState(user || {}); */
    /* let {userId} = useParams();
    console.log("user:");
    console.dir(user); */

    useEffect(() => {
        /* getUserByIdAPIMethod("625db9a7c12ffa9604bd0e3f").then((user) => {
            setUser(user);
        }) */
        console.log("props.user:");
        console.dir(user);
        getUserByIdAPIMethod(user._id).then((user) => {
            setUser(user);
        }).catch(err => {
            console.dir(user);
            console.log("no user");
        })
    }, []);

    const handleSubmit = (event) => {
        onSubmit(user);
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const updatedUser = {...user, [name]: value};
        setUser(updatedUser);
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