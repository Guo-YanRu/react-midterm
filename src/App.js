import React, { Component } from "react";
import Header from "./Header";
import RankingList from "./RankingList";
import FavoriteList from "./FavoriteList";
import tracks from "./datas";
import "./App.css";
import "./fonts/BebasNeue/BebasNeue-Regular.ttf";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: tracks,
    };
  }

  // tips，處理加入或移除我的最愛功能
  handleToggleFavorite = (id, favorite) => {
    const type = favorite === true ? false : true;
    const newTracks = this.state.tracks.map((track) => ({
      ...track,
      favorite: track.id === id ? type : track.favorite,
    }));
    this.setState({
      tracks: newTracks,
    });
  };

  // tips，處理移除我的最愛功能
  handleRemoveFavorite = (id, favorite) => {
    const type = favorite === true ? false : false;
    const newTracks = this.state.tracks.map((track) => ({
      ...track,
      favorite: track.id === id ? type : track.favorite,
    }));
    this.setState({
      tracks: newTracks,
    });
  };

  // tips，處理增加 like 計數功能
  handleIncreaseLikeCount = (id) => {
    this.setState((state) => {
      return {
        tracks: state.tracks.map((track) => {
          return track.id === id
            ? { ...track, likeCount: track.likeCount + 1 }
            : track;
        }),
      };
    });
  };

  // tips，處理減少 like 計數功能
  handleDecreaseLikeCount = (id) => {
    this.setState((state) => {
      return {
        tracks: state.tracks.map((track) => {
          if (track.likeCount > 0) {
            return track.id === id
              ? { ...track, likeCount: track.likeCount - 1 }
              : track;
          } else {
            return track.id === id
              ? { ...track, likeCount: track.likeCount }
              : track;
          }
        }),
      };
    });
  };

  render() {
    const { tracks } = this.state;
    const FavTracks = this.state.tracks.filter(
      (track) => track.favorite === true
    );
    return (
      <div className="app">
        <Header studentID="C108156124" studentName="郭宴儒" />
        <div className="main">
          {/* tips，傳入歌曲資料及相關事件的傳遞 */}
          <RankingList
            tracks={tracks}
            onClickFav={this.handleToggleFavorite}
            incLike={this.handleIncreaseLikeCount}
            decLike={this.handleDecreaseLikeCount}
          />
          {/* tips，傳入歌曲資料及相關事件的傳遞 */}
          <FavoriteList
            FavTracks={FavTracks}
            onClickRe={this.handleRemoveFavorite}
          />
        </div>
      </div>
    );
  }
}
