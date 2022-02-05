const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'), 
      progressContainer = document.querySelector('.progress__container'), 
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      cover = document.querySelector('.cover__img'),
      imgSrc = document.querySelector('.img__src')

// Songs
const songs = ['beyonce', 'dontstartnow']

// Песня по умолчанию
let songIndex = 0;

// Init
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `assets/${song}.np3`
    cover.src = `assets/img/cover${songIndex + 1}.png`
}

loadSong(songs[songIndex])