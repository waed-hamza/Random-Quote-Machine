import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const style = {
  transition: "all 2s",
};

function App() {
  let colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];

  const [color, setColor] = useState(colors[0]);
  const [quoteData, setQuoteData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState("");
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [initialStyle, setInitialStyle] = useState({ opacity: 0 });
  const [twitter, setTwitter] = useState("");
  const [tumbler, setTumbler] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let data;

    const fetchData = async () => {
      data = await axios.get(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      setQuoteData(data.data.quotes);
      setLoaded(true);
    };

    fetchData();
    getQuotes();
  }, [loaded]);

  const getRandomQuote = () => {
    return quoteData[Math.floor(Math.random() * quoteData.length)];
  };

  const getQuotes = () => {
    if (loaded) {
      let randomQuote = getRandomQuote();

      setCurrentQuote(randomQuote.quote);
      setCurrentAuthor(randomQuote.author);
      setInitialStyle({ opacity: 1 });

      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      setColor(randomColor);
    }
  };

  useEffect(() => {
    setTwitter(
      `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
        '"' + currentQuote + '" ' + currentAuthor
      )}`
    );

    setTumbler(
      "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
        encodeURIComponent(currentAuthor) +
        "&content=" +
        encodeURIComponent(currentQuote) +
        "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
    );
  }, [currentAuthor, currentQuote]);

  return (
    loaded && (
      <div
        className="App"
        style={{
          color: color,
          ...initialStyle,
          ...style,
          backgroundColor: color,
        }}
      >
        <div id="quote-box">
          <div id="text">
            <i className="fa fa-quote-left"> </i>
            {currentQuote}
          </div>

          <div id="author">-{currentAuthor}</div>

          <div id="btns-container">
            <a
              href={twitter}
              id="tweet-quote"
              className="button"
              style={{ backgroundColor: color, ...initialStyle, ...style }}
              target="_blank"
            >
              <i className="fa fa-twitter"></i>
            </a>

            <a
              href={tumbler}
              id="tumbler-quote"
              className="button"
              style={{ backgroundColor: color, ...initialStyle, ...style }}
              target="_blank"
            >
              <i className="fa fa-tumblr"></i>
            </a>

            <button
              id="new-quote"
              className="button"
              style={{ backgroundColor: color, ...initialStyle, ...style }}
              onClick={getQuotes}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default App;
