import './Main.css';

function Profile() {
    return (
        <div>
            <input type="checkbox" id="modal"/>
            {/* <label for="modal"><img src="https://yt3.ggpht.com/IpUd8bbQ8AFVis-r0ypfvHvB1t8KTJWLOsbBxWbYNH24e_WIwYNwURqa009GWBy56zCrn52dqAc=s900-c-k-c0x00ffffff-no-rj" class="profilePicture"/></label> */}
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
                        <input type="text" placeholder="Enter Name" name="name"/>
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="Enter Email" name="email"/>
                        <label htmlFor="theme">Color Scheme</label>
                        <br/>
                        <select name="colorTheme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                        <div className="profileBottom">
                            <button type="submit" className="savebtn">Save</button>
                            <button type="button" className="logoutbtn">Logout</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;