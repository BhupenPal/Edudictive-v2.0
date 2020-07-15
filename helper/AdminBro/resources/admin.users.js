const UserModel = require("../../../models/User.model");
const { 
    after: passwordAfterHook, 
    before: passwordBeforeHook 
} = require('../actions/password.hook')

const options = {
    parent: {
        name: "Users"
    },
    properties: {
        OriginalPassword: {
            type: 'password'
        },
        Password: {
            isVisible: false
        }
    },
    actions: {
        new: {
            after: passwordAfterHook,
            before: passwordBeforeHook
        },
        edit: {
            after: passwordAfterHook,
            before: passwordBeforeHook
        }
    }
}

module.exports = {
    options,
    resource: UserModel
}