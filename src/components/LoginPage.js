import { useEffect, useRef, useState } from 'react';
import './Main.css';
import { useHistory } from "react-router-dom";
import {useParams} from "react-router";
import { createUserAPIMethod, getNoteByIdAPIMethod, getNotesAPIMethod, getUserByIdAPIMethod } from '../api/client';


function LoginPage({onRegister, errorMessage, setErrorMessage}) {

    /* let {noteId} = useParams(); */
    const [display, setDisplay] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    /* const [authorized, setAuthorized] = useState(true); */
    /* const [note, setNote] = useState(null); */
    let history = useHistory();
    const routeChange = () => {
        let path = '/notes';
        history.push(path);
    }

    const handleLogin = (e) => {
        setErrorMessage("not valid");
        console.log("handle submit!");
    }

    const handleRegister = (name, email, password) => {
        const profileImageUrl = "url";
        const colorScheme = "light";
        const user = {name, email, password, profileImageUrl, colorScheme};
        onRegister(user);
    }

    


    /* useEffect(() => {
        // Note: need to place this in an async function to be able to catch the error
        function fetchData() {
            getNoteByIdAPIMethod(noteId).then((theNote) => {
                setNote(theNote);
                console.dir(theNote);
            }).catch((err) => {
                console.error('Error retrieving note data: ' + err);
                setAuthorized(false);
                // Could set state to show an error message to the user
                // Alternatively could redirect to an error page, such as with:
                // history.push('/error');
            });
        };
        fetchData();
    }, [noteId]); */

    return (
        <div className='login-page'>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className='login-contents'>
                <div className='login-header'>
                    <h1>Notes</h1>
                    <h3>Organize all your thoughts in one place.</h3>
                </div>
                <div className='login-form'>
                    <div className='login-innerContainer'>
                        <form>
                            <label htmlFor='email'>Email</label>
                            <input id='email' type='text'/>
                            <label htmlFor='password'>Password</label>
                            <input id='password' type='text'/>
                            {/* <div style={{color: 'red'}}>{errorMessage}</div> */}
                            <button type='button' id='login-button' onClick={handleLogin}/* onClick={routeChange} */>Login</button>
                            <hr/>
                            <div className='login-form-footer'>
                                <button type='button' id='create-account-btn'onClick={() => setDisplay(!display)}>Create New Account</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
            {display && (
                <div className='create-new-account-background'>
                    {/* <form> */}
                        <div className='create-new-account-modal'>
                            <div className='inner-modal'>
                                <div className='create-new-account-modal-header'>
                                    <h3>Sign Up</h3>
                                    <span className="material-icons" id="signup-close" onClick={() => setDisplay(!display)}>close</span>
                                </div>
                                <label htmlFor="signup-name">Name</label>
                                <input type="text" name="name" id="signup-name" onChange={e => setName(e.target.value)}/>
                                <label htmlFor="signup-email">Email</label>
                                <input type="text" name="email" id="signup-email" onChange={e => setEmail(e.target.value)}/>
                                <label htmlFor="signup-password">Password</label>
                                <input type="text" name="password" id="signup-password" onChange={e => setPassword(e.target.value)}/>
                                <div style={{color: 'red'}}>{errorMessage}</div>
                                <div className='create-new-account-modal-footer'>
                                    <button onClick={() => handleRegister(name, email, password)} className="signup">Sign up</button>
                                </div>
                            </div>
                        </div>
                    {/* </form> */}
                </div>
            )}
        </div>
    )
}

export default LoginPage;