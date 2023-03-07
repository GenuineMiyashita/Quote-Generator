const quoteContainer = document.querySelector('#quoteContainer');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const soundBtn = document.querySelector('#textSpeech');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#newQuote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show Quote 
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    } 

    // Check Quote length to determine length
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
   showLoadingSpinner();
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (e) {
    // Catch Error Here
        alert('Error!', e);
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Text to Speech
function textToSpeech() {
    let utterance = new SpeechSynthesisUtterance (`${quoteText.textContent} by ${authorText.textContent}`)
    speechSynthesis.speak(utterance);
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
soundBtn.addEventListener('click', textToSpeech);

// On Load
getQuotes();