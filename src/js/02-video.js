import '../css/common.css';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// // get controls
// const player = new Player(document.querySelector('iframe#vimeo-player'));
//
// //set time of player once
// setPlayerTime(player, localStorage.getItem('videoplayer-current-time'));
//
// //upd last played time regular
// player.on('timeupdate', throttle(savePlayerTime, 2000));
//
// function savePlayerTime({ seconds }) {
//   localStorage.setItem('videoplayer-current-time', seconds);
// }
//
// function setPlayerTime(currentPlayer, currentTime) {
//   if (currentTime) currentPlayer.setCurrentTime(currentTime);
// }

const player = new Player(document.querySelector('iframe#vimeo-player'));

player.on('timeupdate', throttle(onPlay, 1000));

if (localStorage.getItem('videoplayer-current-time')) {
  player.setCurrentTime(Number(JSON.parse(localStorage.getItem('videoplayer-current-time'))));
}

function onPlay(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
}


