import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const SignUp = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    const postData = () => {
        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
            M.toast({ html: 'Please enter valid email.', classes: "#d32f2f red darken-2"})
            return
        }
        fetch('/signup', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            if (data.ed) {
                M.toast({html: data.ed, classes: "#d32f2f red darken-2"})
            } else {
                M.toast({html: data.msg, classes: "#66bb6a green lighten-1"})
                history.push('/signin');
            }
            console.log("Response Data:", data);
        })
        .catch((err) => {
            console.log("Error: ", err);
        });
    }

    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => {
                    postData();
                }}>
                    Sign Up
                </button>
                <h5>
                    <Link to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    );
}

export default SignUp;