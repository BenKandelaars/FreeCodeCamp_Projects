ReactDOM.render(
  (
    <div>
      <h1>Hello, world!</h1>
      <p>This is React Component</p>

      <h1>Hello, world!</h1>
      <p>This is React Component</p>

    </div>
  ),
  document.getElementById('root')
);

ReactDOM.render(
  (
    <main>
      <section className="title">
        <h1>Random Quote Generator</h1>
      </section>
      <section className="quote">
        <div className="twit-background"></div>
        <a className="twitter-share-button twit-position" name="twitter"
    href="https://twitter.com/intent/tweet?text=" target="_blank">
          <i className="fa fa-twitter-square fa-4x twitterstyle" id="twitter"></i></a>

        <p className="quote_text" id="quote_text">Keep it simple and do the simple well</p>
        <p className="quote_author" id="quote_author">Quote by Me
        </p>
      </section>
      <section className="section-2">
        <button id="btn" className="centre">Another Quote?</button>
        </section>
    </main>
  ),
  document.getElementById('root')
);
