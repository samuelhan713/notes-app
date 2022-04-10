import { useState } from 'react';
import './Main.css';

function Profile() {

    const [name, setName] = useState(localStorage.name || "");
    const [email, setEmail] = useState(localStorage.email || "");
    const [colorScheme, setColorScheme] = useState(localStorage.colorScheme);

    const onSubmit = () => {
        const name = document.getElementById("name");
        const email = document.getElementById("email");

        localStorage.setItem("name", name.value);
        localStorage.setItem("email", email.value);
    }

    const handleChange = (s) => {
        setColorScheme(s.target.value);
        localStorage.setItem("colorScheme", s.target.value);
      };

    return (
        <div>
            <input type="checkbox" id="modal"/>
            <label htmlFor="modal" className="modal-background"></label>
            <div className="modal">
                <form>
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
                        <input value={name} type="text" placeholder="Enter Name" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                        <input value={email} type="text" placeholder="Enter Email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                        <label htmlFor="theme">Color Scheme</label>
                        <br/>
                        <select name="colorScheme" id="colorScheme" value={colorScheme} onChange={handleChange}>
                            <option value="light">light</option>
                            <option value="dark">dark</option>
                        </select>
                        <div className="profileBottom">
                            <button type="submit" className="savebtn" onClick={onSubmit}>Save</button>
                            <button type="button" className="logoutbtn">Logout</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;