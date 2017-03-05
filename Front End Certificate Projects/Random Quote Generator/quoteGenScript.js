/* future development ideas
- Changing color to the background
-Thinking type picture randomly appears- Link to google the quote for more information
*/

var $quoteText;
var $quoteAuthor;
var url;
var original;
var str;

function nextQuote() {
	$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(response) {

		quoteText = response.quoteText;
		quoteAuthor = response.quoteAuthor;

    original = response;
		str = JSON.stringify(response);

		if (quoteAuthor == "") {
			quoteAuthor = "Anonymous";
		}

		if (quoteText.length > 100) {
			nextQuote();
		}
	})
};

function updateQuote() {;

 url = encodeURIComponent(quoteText + " " + quoteAuthor);
												$(".quote_text").text(quoteText);
 $(".quote_author").text(quoteAuthor);
$(".twitter-share-button").attr("href","https://twitter.com/intent/tweet?text=" + url);
	 };

nextQuote();

//listener update quote and quote on
document.getElementById("btn").onclick = function() {

	nextQuote();
	updateQuote();

}
