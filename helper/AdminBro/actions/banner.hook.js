const fs = require('fs')
const path = require('path')

const after = async (response, request, context) => {
    const { record, ImageUpload } = context

    if (record.isValid() && ImageUpload) {
        const filePath = path.join('uploads', record.id().toString(), ImageUpload.name)
        await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
        await fs.promises.rename(ImageUpload, filePath)
        await record.update({ Banner: true })
    }
    return response
}

const before = async (request, context) => {
    if (request.method === 'post') {
        const { ImageUpload, ...otherParams } = request.payload

        context.ImageUpload = ImageUpload

        return {
            ...request,
            payload: otherParams
        }
    }
    return request
}

module.exports = {after, before}