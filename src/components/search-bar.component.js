import React, { Component } from "react";
import PlantsDataService from "../services/plants.service";

export default class SearchBarComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            searchName: ""
        };
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;
        console.log("onChangeSearchName searchName",searchName)
        this.setState({
            searchName: searchName
        });
    }

    searchName() {
        this.setState({
            currentPlant:null,
            currentIndex: -1
        });

        PlantsDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    plants: response.data
                });
                console.log("state",this.state)
                console.log("response data",response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName } = this.state;
        console.log("searchName",searchName)
        return(
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
        );
    }
}