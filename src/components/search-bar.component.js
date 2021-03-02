import React, { Component } from "react";

export default class SearchBarComponent extends Component {


    // onChangeSearchName(e) {
    //     const searchName = e.target.value;
    //
    //     this.setState({
    //         searchName: searchName
    //     });
    // }

    // searchName() {
    //     this.setState({
    //         currentPlant:null,
    //         currentIndex: -1
    //     });
    //
    //     PlantsDataService.findByName(this.state.searchName)
    //         .then(response => {
    //             this.setState({
    //                 plants: response.data
    //             });
    //             console.log(this.state)
    //             console.log(response.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    render() {
        return(
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={this.props.searchName}
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