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
    title.innerHTML = song.toUpperCase();
    audio.src = `./assets/audio/${song}.mp3`
    cover.src = `./assets/img/cover${songIndex + 1}.png`
}

loadSong(songs[songIndex])

// Play
function playSong () {
    player.classList.add('play')
    audio.play()
    audio.currentTime = 0;
    imgSrc.src = './assets/svg/pause.png'
    imgSrc.classList.add('active')
}

// Pause
function pauseSong () {
    player.classList.remove('play')
    audio.pause()
    imgSrc.src = './assets/svg/play.png'
    imgSrc.classList.remove('active')

}

playBtn.addEventListener('click', () => {
    const isPlay = player.classList.contains('play')
    if(isPlay) {
        pauseSong()
    } else {
        playSong()
    }
})

// Next Song
function nextSong () {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex])
    playSong()
}
nextBtn.addEventListener('click', nextSong)

// Prev Song
function prevSong () {
    songIndex--;

    if(songIndex < 0) {
        songIndex =  songs.length - 1;
    }

    loadSong(songs[songIndex])
    playSong()
}

prevBtn.addEventListener('click', prevSong)

// Function Update Progress

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
    // console.log(duration);
    // console.log(currentTime);
}
audio.addEventListener('timeupdate', updateProgress)