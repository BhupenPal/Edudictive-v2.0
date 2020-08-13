const SchoolTrialModel = require("../../../models/SchoolTrial.model");

const options = {
    parent: { name: "Demo Classes" }
}

module.exports = {
    options,
    resource: SchoolTrialModel
}