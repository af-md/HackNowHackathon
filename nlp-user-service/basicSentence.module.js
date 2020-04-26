const natural = require('natural')
const _ = require('lodash')
const sTokenizer = new natural.SentenceTokenizer()
const wTokenizer = new natural.WordPunctTokenizer()

const language = "EN"
const defaultCategory = 'N';
const defaultCategoryCapitalized = 'NNP';
 
var lexicon = new natural.Lexicon(language, defaultCategory, defaultCategoryCapitalized);
var ruleSet = new natural.RuleSet('EN');
var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

const service = (text) => {
    //natural.PorterStemmer.attach();
    //const sentences =  text.tokenizeAndStem
    let result = []
    const sentences = sTokenizer.tokenize(text)
    _.forEach(sentences, (sentence) => {

        result.push(sentence)
        // const words = wTokenizer.tokenize(sentence)
        // //console.log(words)
        // const posTags = tagger.tag(words)
        // console.log(posTags)

    })
    return result
}

const tokenizedSentence = (sentence) => {
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
    return tokenizedSentences
}

module.exports = {
    service,
    tokenizedSentence
}