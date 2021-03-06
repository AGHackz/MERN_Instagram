import React, {useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar';
import "./App.css";
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './components/screens/Home';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import { userInitialState, userReducer } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {

  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    var user = null;
    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user'));
    }
    if (user) {
      dispatch({type: 'USER', payload: user});
      history.push('/');
    } else {
      history.push('/signin');
    }
  }, []);

  return (
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>
      <Route path='/signin'>
        <SignIn/>
      </Route>
      <Route path='/signup'>
        <SignUp/>
      </Route>
      <Route path='/profile'>
        <Profile/>
      </Route>
      <Route path='/create-post'>
        <CreatePost/>
      </Route>
    </Switch>
  );
}

function App() {

  const [state, dispatch] = useReducer(userReducer, userInitialState);

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
