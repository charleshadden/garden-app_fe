import http from "../http-common";

class PlantDataService {
    getAll() {
        return http.get("/plants");
    }

    get(plantID) {
        return http.get(`/plants/${plantID}`);
    }

    create(data) {
        return http.post("/plants", data);
    }

    update(id, data) {
        return http.put(`/plants/${id}`, data);
    }

    delete(plantID) {
        return http.delete(`/plants/${plantID}`);
    }


    findByName(plantName) {
        return http.get(`plants/plantName/${plantName}`);
    }
}

export default new PlantDataService();