import React from "react";
import FavoriteListItem from "./FavoriteListItem";
import { transferTimeToHumanize } from "./utils";

const SumDatareduce = (Array) => {
  if (Array.length > 0) {
    return Array.reduce((a, b) => a + b);
  } else {
    return 0;
  }
};

// tips: 計算歌曲總長度時間可善用 array.reduce() 方法進行加總
const FavoriteList = (props) => {
  const Array = props.FavTracks.map((FavTrack) => {
    return FavTrack.musicTime;
  });
  const sumTime = SumDatareduce(Array);
  const Time = transferTimeToHumanize(sumTime);
  const { FavTracks, onClickRe } = props;

  return (
    <div className="favorite-list list">
      <div className="title">
        我的最愛
        {/* tips: 善用 utils.js 的 transferTimeToHumanize 方法轉換歌曲時間的顯示格式 */}
        {sumTime > 0 && <span className="total">（總長度 {Time}）</span>}
      </div>
      {/* tips，傳入歌曲資料與適當的 callback */}
      {FavTracks.map((FavTrack) => (
        <FavoriteListItem
          key={FavTrack.id}
          FavTrack={FavTrack}
          onClickRe={onClickRe}
        />
      ))}
    </div>
  );
};

export default FavoriteList;
