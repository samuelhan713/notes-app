import { useEffect, useState } from 'react';
import './Main.css';
import {getUserByIdAPIMethod, getUsersAPIMethod, logoutAPIMethod, uploadImageToCloudinaryAPIMethod} from '../api/client';
import {useParams} from "react-router";
import {useHistory} from "react-router-dom";


function Profile({onSubmit, user, setUser, isLoggedIn, setIsLoggedIn}) {
    useEffect(() => {
        getUsersAPIMethod().then((user) => {
            console.log("user set in profile.js");
            setUser(user[0]);
        })
    }, []);

    const history = useHistory();

    const routeChange = () => {
        let path = "/loginPage";
        history.push(path);
      }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(user);
    }

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        const updatedUser = {...user, [name]: value};
        setUser(updatedUser);
    };

    const handleImageSelected = (event) => {
        console.log("New File Selected");
        if (event.target.files && event.target.files[0]) {

            // Could also do additional error checking on the file type, if we wanted
            // to only allow certain types of files.
            const selectedFile = event.target.files[0];
            console.dir(selectedFile);

            const formData = new FormData();
            // TODO: You need to create an "unsigned" upload preset on your Cloudinary account
            // Then enter the text for that here.
            const unsignedUploadPreset = 'xf8joxiu';
            formData.append('file', selectedFile);
            formData.append('upload_preset', unsignedUploadPreset);

            console.log("Cloudinary upload");
            uploadImageToCloudinaryAPIMethod(formData).then((response) => {
                console.log("Upload success");
                console.dir(response);

                const updatedUser = {...user, "profileImageUrl": response.url};
                setUser(updatedUser);
            });
        }
    }

    const removeImage = (event) => {
        const updatedUser = {...user, "profileImageUrl": "https://w7.pngwing.com/pngs/867/694/png-transparent-user-profile-default-computer-icons-network-video-recorder-avatar-cartoon-maker-blue-text-logo.png"};
        setUser(updatedUser);
    }

    const handleLogout = (event) => {
        setIsLoggedIn(false);
        logoutAPIMethod().then(() => {
            console.log("logged out successfully");
        });
        routeChange();
        
    }

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
                            <img src={user.profileImageUrl}/>
                            <label className="custom-file-upload">
                                <input type="file" name="image" accept="image/*" id="cloudinary" onChange={handleImageSelected}/>
                                Add Image
                            </label>
                            <span className='removeImageButton' onClick={removeImage}>Remove Image</span>
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
                            <button type="button" className="logoutbtn" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;