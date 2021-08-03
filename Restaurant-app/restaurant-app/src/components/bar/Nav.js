import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';

import { Role } from '../../_helpers';
import { accountService } from '../../_services';

function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    <Link to="/order" className="nav-item nav-link">Order</Link>
                    <Link to="/profile" className="nav-item nav-link">Profile</Link>
                    {user.role === Role.Admin &&
                        <Link to="/admin" className="nav-item nav-link">Admin</Link>
                    }
                    <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                </div>
            </nav>
            <Route path="/admin" component={AdminNav} />
        </div>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <Link to={`${path}/users`} className="nav-item nav-link">Users</Link>
            </div>
        </nav>
    );
}

export { Nav }; 