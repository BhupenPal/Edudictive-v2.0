const fs = require('fs')
const path = require('path')
const move = require('mv')

const after = async (response, request, context) => {
    const { record, ImageUpload, CourseSyllabus, Key} = context
    if (record.isValid() && ImageUpload) {
        const filePath = path.join('assets', 'uploads', 'courses', Key, 'banner.svg')
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
        move(ImageUpload.path, filePath, { mkdirp: true }, (err) => {
            if (!err) {
                record.update({ Banner: true })
            }
        })
    }
    if (record.isValid() && CourseSyllabus) {
        const filePath = path.join('assets', 'uploads', 'courses', Key, 'course-structure.pdf')
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
        move(CourseSyllabus.path, filePath, { mkdirp: true }, () => {})
    }
    return response
}

const before = async (request, context) => {
    if (request.method === 'post') {
        const { ImageUpload, CourseSyllabus, ...otherParams } = request.payload
        context.ImageUpload = ImageUpload
        context.CourseSyllabus = CourseSyllabus
        context.Key = otherParams.Key
        return {
            ...request,
            payload: otherParams
        }
    }
    return request
}

module.exports = { after, before }