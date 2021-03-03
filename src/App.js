import _ from "lodash";
import React, { Component } from "react";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

import axios from "axios";

const API_KEY = "AIzaSyCGCuRZ5gTwxhNKxXzEcXSwRaPEu9c_Erc";

// Create a new component which will produce some HTML.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };

    this.vidSearch = this.vidSearch.bind(this);
  }

  async vidSearch(term) {
    var youtube = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
    });

    var response = await youtube.get("/search", {
      params: {
        part: "snippet",
        maxResults: 10,
        key: API_KEY,
        q: term,
      },
    });

    var videos = response.data.items;

    this.setState({
      videos: videos,
      selectedVideo: videos[0],
    });
  }

  componentDidMount() {
    this.vidSearch("doggos");
  }

  render() {
    const vidSearch = _.debounce((term) => {
      this.vidSearch(term);
    }, 400);

    return (
      <div>
        <SearchBar onSearchTermChange={this.vidSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={(selectedVideo) => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

export default App;
