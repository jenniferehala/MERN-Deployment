const Pets = require("../model/pets.model");

module.exports.testResponse = (req, res) => {
    res.json({message:"hey its me"});
}

module.exports.findAllPets = (req, res) => {
    Pets.find({}).sort([["type", 1]])
        .then(results=>res.json({results: results}))
        .catch(err=>res.status(400).json({message: "that didn't quite work.", err}));
}

module.exports.createPet = (req, res) => {
    Pets.create(req.body)
    .then(newPets=>res.json({results: newPets}))
    .catch(err=>res.status(400).json({message:"that didn't work", err})) 
}

module.exports.findOnePet = (req, res) => {
    Pets.findOne({_id: req.params._id })
        .then(results=>res.json({results: results}))
        .catch(err=>res.status(400).json({message: "that didn't quite work.", err}));
} 

module.exports.deletePet = (req, res) => {
    Pets.deleteOne({_id:req.params._id})
        .then(results=>res.json({results: results}))
        .catch(err=>res.status(400).json({message: "that didn't quite work.", err}));
} 

module.exports.updateOnePet = (req, res) => {
    Pets.updateOne({_id:req.params._id}, req.body, {runValidators:true})
        .then(results=>res.json({results: results}))
        .catch(err=>res.status(400).json({message: "that didn't quite work.", err}));
}

module.exports.upvotePet=(req,res) => {
    Pets.findOneAndUpdate({_id:req.params._id}, {$inc: {score:1}})
    .then(results=>res.json({results: results}))
    .catch(err=>res.status(400).json({message: "that didn't quite work.", err}));
}