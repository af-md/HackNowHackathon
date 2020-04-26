const natural = require('natural')
var classifier = new natural.BayesClassifier();

classifier.addDocument('I have a problem with', 'remote');
classifier.addDocument('I need help', 'remote');
classifier.addDocument('phone me', 'remote');
classifier.addDocument('does not work', 'remote');
classifier.addDocument('broken', 'remote');
classifier.addDocument('assistance with', 'remote');
classifier.addDocument('call me', 'remote');
classifier.addDocument('phone', 'remote');

classifier.addDocument('deliver a', 'physical');
classifier.addDocument('post me', 'physical');
classifier.addDocument('send a', 'physical');
classifier.addDocument('send', 'physical');
classifier.addDocument('collect', 'physical');
classifier.addDocument('visit me', 'physical');
classifier.addDocument('ran out of', 'physical');
classifier.addDocument('buy me', 'physical');


classifier.train();

console.log(classifier.getClassifications("Hi, please could someone collect a parcel from the Post Office? I live at 123 Fake St, London. My name is Dr. Evil. Thanks!"), "Hi, please could someone collect a parcel from the Post Office? I live at 123 Fake St, London. My name is Dr. Evil. Thanks!");
console.log(classifier.getClassifications("Hello, can you call the doctor for me I can remember the number, I have a really bad headache."), "Hello, can you call the doctor for me I can remember the number, I have a really bad headache.");
console.log(classifier.getClassifications("Please can somebody post a Daily Mail to 98 Beech Street? I need to see what the stock market looks like."), "Please can somebody post a Daily Mail to 98 Beech Street? I need to see what the stock market looks like.")
console.log(classifier.getClassifications("I ran out of strawberries for my strawberry pie, can someone drop some off at my house. Number is 0844565417 I live on the corner of Apple Lane, my door number is 64. 0799884654"), "I ran out of strawberries for my strawberry pie, can someone drop some off at my house. Number is 0844565417 I live on the corner of Apple Lane, my door number is 64. 0799884654")

console.log(classifier.getClassifications("Hello, please could someone call me on 0122122122, I have a question about a problem."), "Hello, please could someone call me on 0122122122, I have a question about a problem.")

// console.log(classifier.getClassifications("Hi, please could someone collect a parcel from the Post Office? I live at 123 Fake St, London. My name is Dr. Evil. Thanks!"));

// console.log(classifier.getClassifications("Hi, please could someone collect a parcel from the Post Office? I live at 123 Fake St, London. My name is Dr. Evil. Thanks!"));
