const bcrypt = require('bcryptjs')

const after = async (response) => {
    if (response.record && response.record.errors) {
        response.record.errors.OriginalPassword = {
            message: "Path `OriginalPassword` is required",
            type: "required"
        }
    }
    return response
}

const before = async (request) => {
    if (request.method === 'post') {
        const { OriginalPassword, ...otherParams } = request.payload

        if (OriginalPassword) {
            Password = await new Promise((resolve, reject) => {
                bcrypt.genSalt(12, (err, salt) =>
                    bcrypt.hash(OriginalPassword, salt, (err, hash) => {
                        if (err) reject(err)
                        resolve(hash)
                    })
                )
            })

            return {
                ...request,
                payload: {
                    ...otherParams,
                    Password
                }
            }
        }

    }
    return request
}

module.exports = {after, before}