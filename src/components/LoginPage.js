import { useEffect, useState } from 'react';
import './Main.css';
import { useHistory } from "react-router-dom";
import {useParams} from "react-router";
import { getNoteByIdAPIMethod, getNotesAPIMethod } from '../api/client';


function LoginPage() {

    /* let {noteId} = useParams(); */
    const [display, setDisplay] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    /* const [authorized, setAuthorized] = useState(true); */
    /* const [note, setNote] = useState(null); */
    let history = useHistory();
    const routeChange = () => {
        let path = '/notes';
        history.push(path);
    }

    const handleSubmit = (e) => {

        setErrorMessage("Enter something valid");
        console.log("handle submit!");
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
                            <div style={{color: 'red'}}>{errorMessage}</div>
                            <button type='button' id='login-button' onClick={handleSubmit}/* onClick={routeChange} */>Login</button>
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
                    <form>
                        <div className='create-new-account-modal'>
                            <div className='inner-modal'>
                                <div className='create-new-account-modal-header'>
                                    <h3>Sign Up</h3>
                                    <span className="material-icons" id="signup-close" onClick={() => setDisplay(!display)}>close</span>
                                </div>
                                <label htmlFor="signup-name">Name</label>
                                <input type="text" name="name" id="signup-name"/>
                                <label htmlFor="signup-email">Email</label>
                                <input type="text" name="email" id="signup-email"/>
                                <label htmlFor="signup-password">Password</label>
                                <input type="text" name="password" id="signup-password"/>
                                <div className='create-new-account-modal-footer'>
                                    <input type="submit" value="Sign up" className="signup"/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default LoginPage;