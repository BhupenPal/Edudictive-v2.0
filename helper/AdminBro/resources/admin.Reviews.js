const ReviewModel = require("../../../models/Review.model");

const options = {
    parent: { name: "Courses" }
}

module.exports = {
    options,
    resource: ReviewModel
}