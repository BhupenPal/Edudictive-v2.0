const fs = require('fs')
const path = require('path')
const move = require('mv')

const after = async (response, request, context) => {
    const { record, ImageUpload, Key} = context
    if (record.isValid() && ImageUpload) {
        const filePath = path.join('assets', 'uploads', 'events', Key, 'banner.jpeg')
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
        move(ImageUpload.path, filePath, { mkdirp: true }, (err) => {})
    }
    return response
}

const before = async (request, context) => {
    if (request.method === 'post') {
        const { ImageUpload, CourseSyllabus, ...otherParams } = request.payload
        context.ImageUpload = ImageUpload
        context.Key = otherParams.Key
        return {
            ...request,
            payload: otherParams
        }
    }
    return request
}

module.exports = { after, before }