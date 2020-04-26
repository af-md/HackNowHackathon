const natural = require('natural')
const _ = require('lodash')

const sTokenizer = new natural.SentenceTokenizer()
const wTokenizer = new natural.WordPunctTokenizer()

const findNouns = (arrayOfTokens) => {
    const language = "EN"
    const defaultCategory = 'N'
    const defaultCategoryCapitalized = 'NNP'
     
    var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized)
    var ruleSet = new natural.RuleSet('EN')
    var tagger = new natural.BrillPOSTagger(lexicon, ruleSet)

    let tags = tagger.tag(arrayOfTokens)

    let names = _.filter(tags.taggedWords, (g) => {
        return g.tag == 'NN' || 
            g.tag == 'NNP' ||
            g.tag == 'N'
    })

    if (names) return names;
    return undefined;
}

const service = (sentence) => {
    let sentences = sTokenizer.tokenize(sentence)
    let tokenizedSentences = []
    let i = 0
    _.forEach(sentences, (s) => {
        tokenizedSentences.push([])
       
        _.forEach(wTokenizer.tokenize(s), (v) => {
            tokenizedSentences[i].push(v);
        })
        i++
    });

    let keyPhraseIndex = _.findIndex(tokenizedSentences, (s) => {
        return _.find(s, (w) => w == 'name')
    })

    if (keyPhraseIndex >= 0) {

        let sentenceWeThinkNameIs = tokenizedSentences[keyPhraseIndex]

        let allNouns = findNouns(sentenceWeThinkNameIs)
    
        let properNouns = _.filter(allNouns, (n) => {
            return n.tag === 'NNP'
        })
    
        if (properNouns) {
            let result = []
            _.forEach(properNouns, (pn) => {
                result.push({value: pn.token, confidence: 50})
            })
            return result
        }
    }
   
    return [{value: "null", confidence: NaN}]
    
    // Horrible shot at manually parsing the string.
    // natural.PorterStemmer.attach();
    // let tokens = sentence.tokenizeAndStem();

    // let nameIndex = _.findIndex(tokens, (t) => {
    //     return t == "name"
    // })

    // if (nameIndex >= 0) {
    //     const possibleNames = _.slice(tokens, nameIndex + 1)
    //     const maxDepthOfOptions = possibleNames.slice(0, 5)
        
    //     console.log(maxDepthOfOptions)
    // } else {
    //     // Name doesn't exist - what other directives could we check for?
    // }


}

module.exports = {
    service
}