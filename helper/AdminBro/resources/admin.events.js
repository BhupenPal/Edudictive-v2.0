const AdminBro = require('admin-bro')
const Events = require("../../../models/Event.model");

const {
    before: uploadBeforeHook,
    after: uploadAfterHook
} = require('../actions/event-banner.hook')

const options = {
    parent: { name: "Events" },
    properties: {
        ImageUpload: {
            components: {
                edit: AdminBro.bundle('../components/EventImage.tsx')
            }
        }
    },
    actions: {
        new: {
            after: (response, request, context) => {
                return uploadAfterHook(response, request, context)
            },
            before: (request, context) => {
                return uploadBeforeHook(request, context)
            }
        },
        edit: {
            after: (response, request, context) => {
                return uploadAfterHook(response, request, context)
            },
            before: (request, context) => {
                return uploadBeforeHook(request, context)
            }
        }
    }
}

module.exports = {
    options,
    resource: Events
}