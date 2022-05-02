import React from "react";
import RankingListItem from "./RankingListItem";
import { transferTimeToHumanize } from "./utils";

const SumDatareduce = (Array) => {
  return Array.reduce((a, b) => a + b);
};

// tips: 計算歌曲總長度時間可善用 array.reduce() 方法進行加總
const RankingList = (props) => {
  const Array = props.tracks.map((track) => {
    return track.musicTime;
  });
  const sum = SumDatareduce(Array);
  const sumTime = transferTimeToHumanize(sum);

  const { tracks, onClickFav, incLike, decLike } = props;
  return (
    <div className="ranking-list list">
      <div className="title">
        {/* tips: 善用 utils.js 的 transferTimeToHumanize 方法轉換歌曲時間的顯示格式 */}
        音樂榜<span className="total">（總長度 {sumTime}）</span>
      </div>
      {/* tips，傳入歌曲資料與適當的 callback */}
      {tracks.map((track) => (
        <RankingListItem
          key={track.id}
          track={track}
          onClickFav={onClickFav}
          incLike={incLike}
          decLike={decLike}
        />
      ))}
    </div>
  );
};

export default RankingList;
