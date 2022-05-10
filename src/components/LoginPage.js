import { useEffect, useState } from 'react';
import './Main.css';
import { useHistory } from "react-router-dom";
import { getUsersAPIMethod } from '../api/client';


function LoginPage({onRegister, onLogin, registerErrorMessage, loginErrorMessage, isLoggedIn}) {

    const [display, setDisplay] = useState(false);
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [users, setUsers] = useState([]);
    let history = useHistory();
    const routeChange = () => {
        let path = '/notes';
        history.push(path);
    }

    const handleLogin = (email, password) => {
        const user = {"email": email, "password": password};
        onLogin(user);
    }

    const handleRegister = (name, email, password) => {
        const profileImageUrl = "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png";
        const colorScheme = "light";
        const user = {name, email, password, profileImageUrl, colorScheme};
        onRegister(user);
    }


    useEffect(() => {
        if (isLoggedIn) {
            routeChange();
        } else {
            console.log("user is NOT logged in in profile!");
        }
        getUsersAPIMethod().then((users) => {
            setUsers(users);
        })
    }, [isLoggedIn]);

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
                            <input id='email' type='text' onChange={e => setLoginEmail(e.target.value)}/>
                            <label htmlFor='password'>Password</label>
                            <input id='password' type='text' onChange={e => setLoginPassword(e.target.value)}/>
                            <div style={{color: 'red'}}>{loginErrorMessage}</div>
                            <button type='button' id='login-button' onClick={() => handleLogin(loginEmail, loginPassword)}>Login</button>
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
                    <div className='create-new-account-modal'>
                        <div className='inner-modal'>
                            <div className='create-new-account-modal-header'>
                                <h3>Sign Up</h3>
                                <span className="material-icons" id="signup-close" onClick={() => setDisplay(!display)}>close</span>
                            </div>
                            <label htmlFor="signup-name">Name</label>
                            <input type="text" name="name" id="signup-name" onChange={e => setRegisterName(e.target.value)}/>
                            <label htmlFor="signup-email">Email</label>
                            <input type="text" name="email" id="signup-email" onChange={e => setRegisterEmail(e.target.value)}/>
                            <label htmlFor="signup-password">Password</label>
                            <input type="text" name="password" id="signup-password" onChange={e => setRegisterPassword(e.target.value)}/>
                            <div style={{color: 'red'}}>{registerErrorMessage}</div>
                            <div className='create-new-account-modal-footer'>
                                <button onClick={() => handleRegister(registerName, registerEmail, registerPassword)} className="signup">Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginPage;