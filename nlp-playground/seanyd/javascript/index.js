const natural = require('natural')
const _ = require('lodash')


console.log('-----------start--------------');


const sentences = 
[
"Hi, please could someone collect a parcel from the Post Office? I live at 123 Fake St, London. My name is Dr. Evil. Thanks!",
"Hello, I have a problem with my television, there's no sound. Can anyone help, my phone number is 0161811 811.",
"I have run out of fresh fruit, could somebody help me? My address is 45 Long Road.",
"I'm in the middle of knitting a jumper but have no blue wool left, can anyone help? Call me on 01877 882 118",
"Please can somebody post a Daily Mail to 98 Beech Street? I need to see what the stock market looks like.",
"Hello my name is tiger I was washing the dishes and I broke the tap I need to someone to fix it.",
"It's too warm in my house, I think the AC is broken, can you send someone to fix it?",
"I ran out of strawberries for my strawberry pie, can someone drop some off at my house. Number is 0844565417 I live on the corner of Apple Lane, my door number is 64. 0799884654",
"Hello, can you call the doctor for me I can remember the number, I have a really bad headache.",
"Hello, Can you buy me groceries, I need: 3 apples 5 pears a box of kelloggs rice krispies, some bananas a toy fire truck for my grandson, he's turning 7 next week, I thought it would, be nice to get him that becuase he like fireman sam, he watches it all the time on the tv, hello can you hear me hello, hello fucking bastard hung up."
]


function attemptPhoneNumber(sentence) {

    let noSpace = sentence.split(" ").join("")
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
            chances.push(firstPass);
        } else {
            // multiple numbers starting with zero
            chances.push(...firstPass)
        }
    }

    // could do loads more brute force checks in here: https://en.wikipedia.org/wiki/Telephone_numbers_in_the_United_Kingdom
    // parsing area codes ect.

    return chances;
}

function attemptName() {

}

_.forEach(sentences, (s) => {
    console.log(attemptPhoneNumber(s));
});
