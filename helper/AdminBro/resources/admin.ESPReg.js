const ESPModel = require("../../../models/ESP.model");

const options = {
    parent: { name: "Student Partners" }
}

module.exports = {
    options,
    resource: ESPModel
}