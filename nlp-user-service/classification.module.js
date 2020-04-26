const natural = require('natural')
var classifier = new natural.BayesClassifier();

// Do we have any data to train this with?

classifier.addDocument('I have a problem with', 'remote');
classifier.addDocument('I need help', 'remote');
classifier.addDocument('phone me', 'remote');
classifier.addDocument('does not work', 'remote');
classifier.addDocument('broken', 'remote');
classifier.addDocument('assistance with', 'remote');
classifier.addDocument('call me', 'remote');
classifier.addDocument('phone', 'remote');

classifier.addDocument('deliver', 'physical');
classifier.addDocument('deliver to', 'physical');
classifier.addDocument('delivered', 'physical');

classifier.addDocument('post me', 'physical');
classifier.addDocument('send a', 'physical');
classifier.addDocument('collect', 'physical');
classifier.addDocument('visit me', 'physical');
classifier.addDocument('ran out of', 'physical');
classifier.addDocument('buy me', 'physical');
classifier.addDocument('go to', 'physical');
classifier.addDocument('goto', 'physical');
classifier.addDocument('go to', 'physical');

classifier.train();

const service = (sentence) => {

    return classifier.getClassifications(sentence)
}

module.exports = { 
    service
}