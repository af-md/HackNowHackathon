const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const phoneService = require('./phonenumber.module')
const sentenceService = require('./basicSentence.module')
const classificationService = require('./classification.module')
const nameService = require('./name.module')
const addressService = require('./address.module')

const handleRequest = (req, res) => {
  
  const phoneResult = phoneService.service(req.body.text);
  const sentenceFragments = sentenceService.service(req.body.text)
  const nameResult = nameService.service(req.body.text)
  const classificationResult = classificationService.service(req.body.text)
  const addressResult = addressService.service(req.body.text)

  const result = {
    sentences : sentenceFragments,
    userData : {
      phoneNumbers : phoneResult,
      names : nameResult,
      addresses : addressResult
    },
    classification: classificationResult
  }

  res.send(result);
}


express()
  .use(bodyParser.urlencoded())
  .get('/', handleRequest)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
