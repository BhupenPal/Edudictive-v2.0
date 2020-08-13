const CollegeTrialModel = require("../../../models/CollegeTrial.model");

const options = {
    parent: { name: "Demo Classes" }
}

module.exports = {
    options,
    resource: CollegeTrialModel
}