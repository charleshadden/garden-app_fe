import React, { Component } from "react";
import PlantsDataService from "../services/plants.service";
import { Link } from "react-router-dom";
import SearchBarComponent from "./search-bar.component";

export default class PlantsList extends Component {
    constructor(props) {
        super(props);
        this.retrievePlants = this.retrievePlants.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePlant = this.setActivePlant.bind(this);

        this.state = {
            plants: [],
            currentPlant: null,
            currentIndex: -1
        };
    }

    titleCase(str) {
        return str.toLowerCase().split(' ').map(function(word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }

    componentDidMount() {
        this.retrievePlants();
    }
    
    retrievePlants() {
        PlantsDataService.getAll()
            .then(response => {
                this.setState({
                    plants: response.data
                });
                console.log("here",response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrievePlants();
        this.setState({
            currentPlant: null,
            currentIndex: -1
        });
    }

    setActivePlant(plant, index) {
        this.setState({
            currentPlant: plant,
            currentIndex: index
        });
    }

    render() {
        const { plants, currentPlant, currentIndex } = this.state;
        const { searchName } = this.props;
        return (
            <div className="list row">
                <SearchBarComponent/>
                <div className="col-md-6">
                    <h4>Plants List</h4>
                    <ul className="list-group">
                        {plants &&
                        plants.map((plant, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActivePlant(plant, index)}
                                key={index}
                            >
                                {this.titleCase(plant.plantName)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentPlant ? (
                        <div>
                            <h4>Plant</h4>
                            <div>
                                <label>
                                    <strong>Plant Name:</strong>
                                </label>{" "}
                                {this.titleCase(currentPlant.plantName)}
                            </div>


                            <Link
                                to={"/plants/" + currentPlant.plantID}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Plant...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}