const EventRegister = require("../../../models/EventRegister.model");

const options = {
    parent: { name: "Events" }
}

module.exports = {
    options,
    resource: EventRegister
}