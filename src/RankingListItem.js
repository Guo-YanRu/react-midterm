import { Component } from "react";
import { ReactComponent as PlaySVG } from "./svgs/play.svg";
import { ReactComponent as FavoriteSVG } from "./svgs/favorite.svg";
import { ReactComponent as FavoriteFillSVG } from "./svgs/favorite-fill.svg";
import { ReactComponent as LikeSVG } from "./svgs/like.svg";
import { ReactComponent as DislikeSVG } from "./svgs/dislike.svg";
import { transferTimeToHumanize } from "./utils";
//import TrackCover1 from "./imgs/track1.jpg";

export default class RankingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadTime: props.track.downloadTime,
    };
  }

  // tips，處理下載剩餘時間倒數功能
  componentDidMount() {
    this.timer = setInterval(() => {
      if (this.state.downloadTime > 0) {
        this.setState((state) => ({
          downloadTime: state.downloadTime - 1,
        }));
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  // tips，處理下載剩餘時間倒數功能
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { track, onClickFav, incLike, decLike } = this.props;
    const { downloadTime } = this.state;
    const Time = transferTimeToHumanize(this.props.track.musicTime);
    return (
      <div className="ranking-list-item list-item">
        <span>
          <PlaySVG className="play-icon icon" />
        </span>
        <span className="track-wrapper">
          <img
            className="album-cover"
            src={track.albumCover}
            alt="album-cover"
          />
          <span className="column">
            <span className="label">{track.name}</span>
            <span className="label">{track.singer}</span>
          </span>
        </span>
        <span className="download">
          {/* tips，歌曲 "下載尚未完成" 時顯示下方內容，進行下載剩餘秒數倒數 */}
          {downloadTime > 0 && (
            <span className="loading">
              下載中...（剩 {this.state.downloadTime} 秒）
            </span>
          )}
          {/* tips，歌曲 "下載完成" 時顯示下方內容 */}
          {downloadTime <= 0 && <span className="completed">下載完成</span>}
        </span>
        <span className="like-wrapper">
          {/* tips，點選此 icon 時，增加歌曲的 Like 數 */}
          <LikeSVG
            className="like-icon icon"
            onClick={() => {
              incLike(track.id);
            }}
          />
          <span className="count">{track.likeCount}</span>
          {/* tips，點選此 icon 時，減少歌曲的 Like 數 */}
          <DislikeSVG
            className="dislike-icon icon"
            onClick={() => {
              decLike(track.id);
            }}
          />
        </span>
        <span>
          {/* tips，當此歌曲 "已加入" 我的最愛時，顯示下方綠色愛心內容，點選此 icon 時，將歌曲移除我的最愛 */}
          {track.favorite === true && (
            <FavoriteFillSVG
              className="favorite-icon icon checked"
              onClick={() => {
                onClickFav(track.id, track.favorite);
              }}
            />
          )}

          {/* tips，當此歌曲 "未加入" 我的最愛時，顯示下方空心愛心內容，點選此 icon 時，將歌曲加入我的最愛*/}
          {track.favorite === false && (
            <FavoriteSVG
              className="favorite-icon icon"
              onClick={() => {
                onClickFav(track.id, track.favorite);
              }}
            />
          )}
        </span>
        {/* tips: 善用 utils.js 的 transferTimeToHumanize 方法轉換歌曲時間的顯示格式 */}
        <span className="track-length">{Time}</span>
      </div>
    );
  }
}
