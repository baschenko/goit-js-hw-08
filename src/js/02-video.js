import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const getPlayerCurrentTime = localStorage.getItem('videoplayer-current-time');

if (getPlayerCurrentTime) {
   player.setCurrentTime(getPlayerCurrentTime);
}

const onPlay = function ({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));
