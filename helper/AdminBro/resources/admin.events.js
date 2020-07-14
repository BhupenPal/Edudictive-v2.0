const Events = require("../../../models/Event.model");

const options = {
    parent: { name: "Events" }
}

module.exports = {
    options,
    resource: Events
}