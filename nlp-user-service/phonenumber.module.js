//const natural = require('natural')
const _ = require('lodash')

const evaluateConfidence = (value) => {
    result = 0;
    if (value.length >= 8 && value.length <= 13) result += 50
    if (value.length < 8 || value.length > 13) result -= 50
    // more checks in here

    return result;
}

const service = (message) => {
    let noSpace = message.split(" ").join("")
    let firstPass = noSpace.match(/\d+/g)

    let chances = [];

    // Very simple implemenation checks for a single number starting with 0
    // Just a rough intial idea
    if (firstPass && firstPass.length > 0) {
        _.remove(firstPass, (f) => {
            return f[0].charAt(0) != 0
        })
        if (firstPass.length === 1) {
            // 1 number starting with 0 - assume it's phone
            const bonusForOnlyNumber = 100;
            chances.push(
                {
                    value: firstPass[0],
                    confidence: evaluateConfidence(firstPass) + bonusForOnlyNumber
                }
            )
        } else {
            console.log(firstPass)
            // multiple numbers starting with zero
            _.forEach(firstPass, (e) => {
                chances.push(
                    {
                        value: e,
                        confidence: evaluateConfidence(e)
                    });
            })
        }
    }

    // could do loads more brute force checks in here: https://en.wikipedia.org/wiki/Telephone_numbers_in_the_United_Kingdom
    // parsing area codes ect.

    return chances;
}

module.exports = {
    service,
}