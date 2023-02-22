import React from "react";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import unsplash from "./unsplash";
import youtube from "./youtube";

// component searchbar
class SearchBar extends React.Component {
  state = { terms: "" };
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    // this.props.onSubmit(this.state.term);
    this.props.onSubmit(this.textInput.current.value);
  };

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Video Search</label>
            {/* <input type="text" value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })} /> */}
            <input type="text" ref={this.textInput} />
          </div>
        </form>
      </div>
    );
  }
}
// component app (menampilkan video dari API youtube)
class App extends React.Component {
  state = { videos: [], firstVideo: null };

  // fungsi saat submit data dari searchbar
  onSearchSubmit = async (term) => {
    // memanggil fungsi axios youtube
    const response = await youtube.get("/search", {
      params: { q: term },
    });

    // console.log(term);
    this.setState({ videos: response.data.items });
    this.setState({ firstVideo: response.data.items[0] });

    console.log(response.data.items);
    console.log(response.data.items[1].id.videoId);
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        {/* render searchbar */}
        <SearchBar onSubmit={this.onSearchSubmit} />
        <div class="ui segment">
          <div class="ui very relaxed two column grid">
            <div class="column">
              <iframe
                width="420"
                height="315"
                src={"https://www.youtube.com/embed/" + this.state.firstVideo.id.videoId}
              ></iframe>
            </div>
            <div class="column">
              {this.state.videos.map((data, index) => (
                <div>
                  <img src={data.snippet.thumbnails.medium.url} alt={data.snippet.description} />
                  {/* <iframe src={data.snippet.thumbnails.default.url} frameborder="0"></iframe> */}
                  <p>{data.snippet.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const search = ReactDOM.createRoot(document.getElementById("search"));
search.render(<App />);
