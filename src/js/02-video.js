import '../css/common.css';
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

//get controls
const player = new Player(document.querySelector('iframe#vimeo-player'));

//set time of player once
setPlayerTime(player, localStorage.getItem('videoplayer-current-time'));

//upd last played time regular
player.on('timeupdate', throttle(savePlayerTime, 2000));

function savePlayerTime({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

function setPlayerTime(currentPlayer, currentTime) {
  if (currentTime) currentPlayer.setCurrentTime(currentTime);
}
