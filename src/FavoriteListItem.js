import React from "react";
import { ReactComponent as RemoveSVG } from "./svgs/remove.svg";
import { transferTimeToHumanize } from "./utils";
//import TrackCover2 from "./imgs/track2.jpg";

const FavoriteListItem = (props) => {
  const { FavTrack, onClickRe } = props;
  const Time = transferTimeToHumanize(FavTrack.musicTime);
  return (
    <div className="favorite-list list-item">
      <span>
        {/* tips，點選此 icon 時，將歌曲移除我的最愛 */}
        <RemoveSVG
          className="remove-icon icon"
          onClick={() => {
            onClickRe(FavTrack.id, FavTrack.favorite);
          }}
        />
      </span>
      <span className="track-wrapper">
        <img
          className="album-cover"
          src={FavTrack.albumCover}
          alt="album-cover"
        />
        <span className="column">
          <span className="label">{FavTrack.name}</span>
          <span className="label">{FavTrack.singer}</span>
        </span>
      </span>
      {/* tips: 善用 utils.js 的 transferTimeToHumanize 方法轉換歌曲時間的顯示格式 */}
      <span className="track-length">{Time}</span>
    </div>
  );
};

export default FavoriteListItem;
