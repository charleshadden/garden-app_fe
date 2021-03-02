import React, { Component } from "react";
import PlantsDataService from "../services/plants.service";
import { Link } from "react-router-dom";

export default class PlantsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrievePlants = this.retrievePlants.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePlant = this.setActivePlant.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            plants: [],
            currentPlant: null,
            currentIndex: -1,
            searchName: ""
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

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrievePlants() {
        PlantsDataService.getAll()
            .then(response => {
                this.setState({
                    plants: response.data
                });
                console.log(response.data);
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

    searchName() {
        this.setState({
            currentTutorial:null,
            currentIndex: -1
        });

        PlantsDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    plants: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName, plants, currentPlant, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
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