const AdminBro = require('admin-bro')
const CourseModel = require("../../../models/Course.model");

const {
    before: uploadBeforeHook,
    after: uploadAfterHook
} = require('../actions/banner.hook')

const options = {
    parent: { name: "Courses" },
    properties: {
        Banner: {   
            isVisible: false
        },
        ImageUpload: {
            components: {
                edit: AdminBro.bundle('../components/CourseBanner.tsx')
            }
        },
        CourseSyllabus: {
            components: {
                edit: AdminBro.bundle('../components/CourseSyllabus.tsx')
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
    resource: CourseModel
}