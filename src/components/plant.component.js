import React, { Component } from "react";
import PlantDataService from "../services/plants.service";

export default class PlantComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.getPlant = this.getPlant.bind(this);
        this.updatePlant = this.updatePlant.bind(this);
        this.deletePlant = this.deletePlant.bind(this);

        this.state = {
            currentPlant: {
                plantID: null,
                plantName: ""
            },
            message: ""
        };
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.getPlant(this.props.match.params.plantID);
    }

    onChangeName(e) {
        const plantName = e.target.value;

        this.setState(function(prevState) {
            return {
                currentPlant: {
                    ...prevState.currentPlant,
                    plantName: plantName
                }
            };
        });
    }

    getPlant(plantID) {
        console.log("get plant")
        PlantDataService.get(plantID)
            .then(response => {
                this.setState({
                    currentPlant: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePlant() {
        console.log("updating plant")
        PlantDataService.update(
            this.state.currentPlant.plantID,
            this.state.currentPlant
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The plant was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deletePlant() {
        PlantDataService.delete(this.state.currentPlant.plantID)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/plants')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        console.log("rendering")
        const { currentPlant } = this.state;
        console.log("currentPlant",currentPlant)
        return (
            <div>
                {currentPlant ? (
                    <div className="edit-form">
                        <h4>Plant1</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="plantName">Plant Name2</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="plantName"
                                    value={currentPlant.plantName}
                                    onChange={this.onChangeName}
                                />
                            </div>
                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deletePlant}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updatePlant}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Plant...</p>
                    </div>
                )}
            </div>
        );
    }
}