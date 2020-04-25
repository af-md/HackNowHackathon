# This program prints Hello, world!
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

ps = PorterStemmer()
wnl = WordNetLemmatizer()

print('----------------_START_-----------------')

# Tokenisation

mytext = "Hi, please could someone collect a parcel from the Post Office? I live at 123 Fake St, London. My name is Dr. Evil. Thanks!"

#tokens = sent_tokenize(mytext)
tokens = word_tokenize(mytext)
#tokens = [t for t in mytext.split()]

# Cleaning Stop words

clean_tokens = tokens[:]

sr = stopwords.words('english')

for token in tokens:

    if token in stopwords.words('english'):

        clean_tokens.remove(token)

stemmed_tokens = []
for cln_tok in clean_tokens:
    stemmed_tokens.append(wnl.lemmatize(cln_tok))

#print(stemmed_tokens)


# Position Of Speach Tagging

print(nltk.pos_tag(stemmed_tokens))

# Classification


print("-----------------_END_------------------")


# Extractions
 # - Common fields and information
 # - Structured data

# Directives
 # - Objectives
 # - Open ended goals 

