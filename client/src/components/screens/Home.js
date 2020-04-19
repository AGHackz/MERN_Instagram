import React, {useState, useEffect} from 'react';
import M from 'materialize-css';

const Home = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('/posts', {
                method: 'get',
                headers: {
                    'authorization': localStorage.getItem('auth_token')
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data.ed) {
                    M.toast({html: data.ed, classes: "#d32f2f red darken-2"});
                } else {
                    if (data.msg) {
                        M.toast({html: data.msg, classes: "#66bb6a green lighten-1"});
                    }
                    setData(data.data);
                }
            })
            .catch(err => {
                console.log("Error: ", err);
            });
    };

    return (
        <div>
            {data.map((item, index) => {
                return (
                    <div className="home" key={index.toString()}>
                        <div className="card home-card">
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img
                                    src="https://images.unsplash.com/photo-1586964484161-648499ad1a19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"/>
                            </div>
                            <div className="card-content">
                            <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <i className="material-icons">favorite_border</i>
                                <input type="text" placeholder="Add a comment"/>
                            </div>
                        </div>
                    </div>
                );
            })
        }
        </div>
    );
}

export default Home;