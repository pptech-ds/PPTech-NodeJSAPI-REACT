import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accueil from './components/Accueil';
import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
    return (
        <Router>
            <Nav />

            <Route path='/' exact component={Accueil}/>
            <Route path='/register' exact component={Register}/>
            <Route path='/login' exact component={Login}/>

        </Router>
    );
}

export default App;
