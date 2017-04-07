// Glitch - if you enter a search item then delete it then the button stays a search button.

// Enhance with dropdown for other wikipedia entries as you type. Will need to override the auto fill already present.

let searchEg = "Obama";

function formInput(e) {

  console.log(e.type)
  if (e.which == 13 || e.type == "submit") {

    // code if return entered or submit button pressed
    e.preventDefault()
    let searchValue = searchInput.value
    hideKeyboard()
    formEntry(searchValue)

  } else {

    // Action if only button press without return or submit button fire
    wikiButton.innerHTML = "Search"

  }
}

function formEntry(searchValue) {

  // searchValue has an item
  if (searchValue) {

    console.log("Search = " + searchValue)

    // reset WikiButton & input field
    wikiButton.innerHTML = "Gimme a random article"
    searchInput.value = ""

    // code to complete Search and display item

    // returns URL for search
    getWikiData(searchValue)
      .then(function(data) {
        return displayResults(data)
      })
      .catch(function() {
        results.innerHTML = "<p>Sorry an error occured, try again<p>"
      })

  } else {

    // no search value present presents a random article
    let wikiUrl = "https://en.wikipedia.org/wiki/Special:Random"
    wikiOpenTab(wikiUrl)
  }
}

function wikiOpenTab(wikiUrl) {
  let win = window.open(wikiUrl, "_blank")
  win.focus()
}

function setWikiUrl(searchValue) {

  return "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchValue + "&namespace=0&limit=5&profile=classic&redirects=resolve&callback=?"
}

function displayResults(data) {

  let msg = ""
  msg += '<p>You searched for <b>' + data[0] + '</b></p>'
  msg += '</br>'

  for (i = 0; i < 5; i++) {
    msg += '<a href="' + data[3][i] + '" target="_blank"><p>' + data[1][i] + '</p></a>'
    msg += ''
    msg += '<p>' + decodeURI(data[2][i]) + '</p>'
    msg += '</br>'
  }

  results.innerHTML = msg

}

function getWikiData(searchTerm) {

  let wikiUrl = setWikiUrl(searchTerm)

  return new Promise(function(resolve, reject) {

    $.getJSON(wikiUrl, function() {})
      .done(function(data) {
        return resolve(data)
      })
      .fail(function() {
        return reject("Search error occured")
      })

  })
}

function hideKeyboard() {
  //this set timeout needed for case when hideKeyborad
  //is called inside of 'onfocus' event handler
  setTimeout(function() {

    //creating temp field
    var field = document.createElement('input');
    field.setAttribute('type', 'text');
    //hiding temp field from peoples eyes
    //-webkit-user-modify is nessesary for Android 4.x
    field.setAttribute('style', 'position:absolute; top: 0px; opacity: 0; -webkit-user-modify: read-write-plaintext-only; left:0px;');
    document.body.appendChild(field);

    //adding onfocus event handler for out temp field
    field.onfocus = function(){
      //this timeout of 200ms is nessasary for Android 2.3.x
      setTimeout(function() {

        field.setAttribute('style', 'display:none;');
        setTimeout(function() {
          document.body.removeChild(field);
          document.body.focus();
        }, 14);

      }, 200);
    };
    //focusing it
    field.focus();

  }, 50);
}

function runSearch() {}

console.log("start")

let elForm = document.getElementById('searchForm')
let wikiButton = document.getElementById('wikiButton')
let searchInput = document.getElementById('searchItem')
let results = document.getElementById('results')

elForm.addEventListener('submit', formInput, false)
searchInput.addEventListener('keypress', formInput, false)
