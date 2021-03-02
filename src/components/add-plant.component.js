import React, { Component } from "react";
import PlantsDataService from "../services/plants.service";

export default class AddPlantComponent extends Component {
constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.savePlant = this.savePlant.bind(this);
    this.newPlant = this.newPlant.bind(this);

    this.state = {
        plantID: null,
        plantName: "",
        submitted: false
    };
}

onChangeName(e) {
    this.setState({
        plantName: e.target.value
    });
}

savePlant() {
    let data = {
        plantName: this.state.plantName
    };

    PlantsDataService.create(data)
        .then(response => {
            this.setState({
                plantID: response.data.plantID,
                plantName: response.data.plantName,

                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
}

newPlant() {
    this.setState({
        plantID: null,
        plantName: "",

        submitted: false
    });
}

render() {
    return (
        <div className="submit-form">
            {this.state.submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={this.newPlant}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="plantName">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="plantName"
                            required
                            value={this.state.plantName}
                            onChange={this.onChangeName}
                            name="plantName"
                        />
                    </div>

                    <button onClick={this.savePlant} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
}