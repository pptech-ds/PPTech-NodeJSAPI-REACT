import React from 'react';
import { Link } from 'react-router-dom';

function Nav(){
    return(
        <ul style={{display: 'flex'}}>
            <Link to='/'>
                <li style={{marginLeft: 10, listStyle: 'none'}}>Home</li>
             </Link>
             <Link to='/register'>
                <li style={{marginLeft: 10, listStyle: 'none'}}>Register</li>
             </Link>
             <Link to='/Login'>
                <li style={{marginLeft: 10, listStyle: 'none'}}>Login</li>
             </Link>
        </ul>
    )
}


export default Nav;