import React, {Component, useEffect, useState} from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {getToken, removeUserSession, setUserSession} from "./utils/common";
import axios from "axios";
import {BrowserRouter, Link, NavLink, Route, Switch} from "react-router-dom";
import Logo from "./plant.png";
import LandingPageComponent from "./components/landing-page.component";
import PublicRoute from "./utils/public-route";
import Login from "./components/login/login.component";
import PrivateRoute from "./utils/private-route";
import Dashboard from "./components/dashboard.component";
import PlantsList from "./components/plants-list.component";
import AddPlantComponent from "./components/add-plant.component";
import PlantComponent from "./components/plant.component";

function App() {
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            return;
        }

        axios.get(`http://localhost:8080/verifyToken?token=${token}`).then(response => {
            setUserSession(response.data.token, response.data.user);
            setAuthLoading(false);
        }).catch(error => {
            removeUserSession();
            setAuthLoading(false);
        });
    }, []);

    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>
    }

        return(
            <div>
                <BrowserRouter>
                    <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark">
                        <NavLink exact activeClassName="active" to={"/"} className="navbar-brand">
                            <img alt='tree' className="icon" src={Logo} />
                            Gardio
                        </NavLink>
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/plants"} className="nav-link">
                                    Plants
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/add"} className="nav-link">
                                    Add
                                </Link>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="active" to={"/login"} className="nav-link"><small>(Access without token only)</small>
                                    Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassName="active" to={"/dashboard"} className="nav-link"><small>(Access with token only)</small>
                                    Register
                                </NavLink>
                            </li>
                        </div>
                    </nav>

                    <div className ="container mt-3">
                        <Switch>
                            <Route exact path="/" component={LandingPageComponent} />
                            <PublicRoute path="/login" component={Login} />
                            <PrivateRoute path="/dashboard" component={Dashboard} />
                            <Route exact path="/plants" component={PlantsList} />
                            <Route exact path="/add" component={AddPlantComponent} />
                            <Route path="/plants/:plantID" component={PlantComponent} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
}

export default App;