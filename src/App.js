import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Logo from "./plant.png"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PlantsList from "./components/plants-list.component";
import AddPlantComponent from "./components/add-plant.component";
import PlantComponent from "./components/plant.component";

class App extends Component {

    render() {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/plants"} className="navbar-brand">
                    <img class="icon" src={Logo}/> Plants
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>

            <div className="container mt-3">
                <Switch>
                    <Route exact path={["/", "/plants"]} component={PlantsList} />
                    <Route exact path="/add" component={AddPlantComponent} />
                    <Route path="/plants/:plantID" component={PlantComponent} />
                </Switch>
            </div>
        </div>
    );
}
}

export default App;
