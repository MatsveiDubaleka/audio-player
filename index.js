const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      wrapper = document.querySelector('.wrapper'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'), 
      progressContainer = document.querySelector('.progress__container'), 
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      cover = document.querySelector('.cover__img'),
      imgSrc = document.querySelector('.img__src'),
      audioLength = document.querySelector('.length')

// Songs
const songs = ['lemonade - britney spirs', 'dont start now - dua lipa']

// Песня по умолчанию
let songIndex = 0;

// Init
function loadSong(song) {
    title.innerHTML = song.toUpperCase();
    wrapper.style.backgroundImage = `url(./assets/img/cover${songIndex + 1}.png)`
    audio.src = `./assets/audio/${song}.mp3`
    cover.src = `./assets/img/cover${songIndex + 1}.png`
}

loadSong(songs[songIndex])

audio.addEventListener('loadedmetadata', () => {
    audioLength.innerHTML = getTimeCodeFromNum(audio.duration);
})
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
}
audio.addEventListener('timeupdate', updateProgress)

// Set Progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
    progress.value = clickX * duration;
}
progressContainer.addEventListener('click', setProgress)

// Autoplay
audio.addEventListener('ended', nextSong)

// Проверка процента звука и обновление каждые полсекунды
setInterval(() => {
    progress.style.width = audio.currentTime / audio.duration * 100 + "%";
    player.querySelector(".time .current").textContent = getTimeCodeFromNum(
      audio.currentTime
    );
  }, 500);

  // Перевод целых секунд в минуты
function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
  
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }