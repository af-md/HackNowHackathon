# information-extraction.py

import nltk
from nltk.corpus import stopwords
stop = stopwords.words('english')

string = """
Hello, I'm called Matthew Lucas I usually go by the name of Matt some times with one T sometimes with two. Hello. My name is Tom. I need some bread. Have you heard of Steven Kumail, he lives in London.
"""

# string = "Hello. My name is Tom. I need some bread."

def ie_preprocess(document):
    document = ' '.join([i for i in document.split() if i not in stop])

    sentences = nltk.sent_tokenize(document)

    sentences = [nltk.word_tokenize(sent) for sent in sentences]

    sentences = [nltk.pos_tag(sent) for sent in sentences]

    return sentences

def extract_names(document):
    names = []
    locations = []
    sentences = ie_preprocess(document)
    for tagged_sentence in sentences:
        for chunk in nltk.ne_chunk(tagged_sentence):
            if type(chunk) == nltk.tree.Tree:
                print(chunk)
                if chunk.label() == 'PERSON':
                    names.append(' '.join([c[0] for c in chunk]))
                if chunk.label() == 'LOCATION':
                    locations.append(' '.join([c[0] for c in chunk]))
    return names

names = extract_names(string)
print(names)