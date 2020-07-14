const ContactModel = require("../../../models/Contact.model");

const options = {
    parent: { name: "Contact" }
}

module.exports = {
    options,
    resource: ContactModel
}