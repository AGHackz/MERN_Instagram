import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from './../App';

const NavBar = () => {

  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const logoutUser = () => {
    localStorage.clear();
    dispatch({type: 'LOGOUT'});
    history.push('/signin');
  };

  const renderLinks = () => {
    if (state) {
      return [
      <li key="profile"><Link to="/profile">Profile</Link></li>,
      <li key="create_post"><Link to="/create-post">Create Post</Link></li>,
      <button className="btn #c62828 red darken-3" onClick={() => {
        logoutUser();
      }}>
        Logout
      </button>
      ]
    } else {
      return [
      <li key="signin"><Link to="/signin">SignIn</Link></li>,
      <li key="signup"><Link to="/signup">Signup</Link></li>
      ]
    }
  };
  
    return (
        <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/signin"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            {renderLinks()}
          </ul>
        </div>
      </nav>
    );
}

export default NavBar;