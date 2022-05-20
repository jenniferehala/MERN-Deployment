const PetsController = require("../controller/pets.controller");


module.exports = app => {
    app.get("/api/test", PetsController.testResponse);
    app.get("/api/pets/findAll", PetsController.findAllPets);
    app.post("/api/pets/create", PetsController.createPet);
    app.get("/api/pets/:_id", PetsController.findOnePet);
    app.delete("/api/pets/:_id/delete", PetsController.deletePet);
    app.patch("/api/pets/:_id/update", PetsController.updateOnePet);
    app.patch("/api/pets/:_id/upvote", PetsController.upvotePet);
}