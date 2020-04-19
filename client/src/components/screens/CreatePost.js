import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image, setImage] = useState("");
    const history = useHistory();

    const postData = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', body);
        formData.append('photo', image);
        fetch('/posts', {
            method: "post",
            headers: {
                'authorization': localStorage.getItem('auth_token') 
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.ed) {
                M.toast({html: data.ed, classes: "#d32f2f red darken-2"});
            } else {
                if (data.msg) {
                    M.toast({html: data.msg, classes: "#66bb6a green lighten-1"});
                }
                history.push('/');
            }
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    };

    return (
        <div className="create-post-card card input-field">
            <input type="text" placeholder="Enter Title" value={title} onChange={(e) => {
                setTitle(e.target.value);
            }}/>
            <div>
                <label htmlFor="textarea1">Body</label>
        <textarea id="textarea1" className="materialize-textarea" value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </div>
            <div className="file-field input-field">
                <div className="btn #64b5f6 blue lighten-2">
                    <span>Upload Image</span>
                    <input type="file" accept="image/*" onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" defaultValue={image}/>
                </div>
            </div>

            <div className="center">
                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => { postData(); }}>
                    Create Post
                </button>
            </div>
        </div>
    );
}

export default CreatePost;