import 'bootstrap/js/src/collapse.js';
import { Link, NavLink } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import React, { useContext, useEffect } from 'react';
import history from 'util/history';
import { AuthContext } from 'AuthContext';
import { removeAuthData } from 'util/storage';

import './styles.css';

const Navbar = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark  bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>MovieFlix</h4>
        </Link>
        

        <div className="collapse navbar-collapse" id="dscatalog-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                <Link to="/admin/auth/login"></Link>
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" activeClassName="active"></NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active"></NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <span className="nav-username">
                {authContextData.tokenData?.user_name}
              </span>
              <a href="#logout" onClick={handleLogoutClick}>
                LOGOUT
              </a>
            </>
          ) : (
            <Link to="/admin/auth/login">Sair</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
