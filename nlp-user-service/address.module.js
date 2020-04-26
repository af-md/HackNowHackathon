const natural = require('natural')
const basicSentence = require('./basicSentence.module')
const _ = require('lodash')
const https = require('https');

const service = (text) => {

    let tokens = basicSentence.tokenizedSentence(text)

    let possibleAddressSentences = _.filter(tokens, (t) => {
        let i = _.findIndex(t, (e) => {
            return e.includes("addre") ||
            e.includes("delive") ||
            e.includes("post")
        })
        return i >= 0;
    })
    
    if(possibleAddressSentences && possibleAddressSentences.length > 0) {
        //goog api is OK based on the input but we need to do far more sanitation for it's worth while
        //let googResult = checkGoogleApiForAddress(possibleAddressSentences[0])

        const language = "EN"
        const defaultCategory = 'N'
        const defaultCategoryCapitalized = 'NNP'
         
        var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized)
        var ruleSet = new natural.RuleSet('EN')
        var tagger = new natural.BrillPOSTagger(lexicon, ruleSet)
    
        let tags = tagger.tag(possibleAddressSentences[0])

        let address = _.filter(tags.taggedWords, (t) => {
            return t.tag == 'NNP' || t.tag == 'N'
        })
        let possibleAddress = _.map(address, "token")

        return possibleAddress.join(" ")
    }

    // Some logic to find the most relavant?
    return null;
}

const checkGoogleApiForAddress = (sentence) => {

    console.log('calling', sentence.join(" "))
    https.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${sentence.join("+")}&key=`, (resp) => {
        let data = '';
      
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          console.log(JSON.parse(data));
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
      
}

module.exports = {
    service
}