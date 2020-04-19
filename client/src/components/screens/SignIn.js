import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const postData = () => {
        fetch('/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.ed) {
                M.toast({html: data.ed, classes: "#d32f2f red darken-2"});
            } else {
                if (data.msg) {
                    M.toast({html: data.msg, classes: "#66bb6a green lighten-1"});
                }
                localStorage.setItem('auth_token', data.data.token);
                history.push('/');
                console.log("Login Response: ", data);
            }
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    };

    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => {
                    postData();
                }}>
                    Sign In
                </button>
                <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignIn;