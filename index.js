const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const pauseBtn = document.querySelector('#pause')
const playPause = document.querySelector('.play-pause')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song Title
const songs = ['Beyond-Me', 'Do-It-Again', 'Eledumare']

// Keep track of the songs
let songIndex = 2

// Update song details
const loadSong = (song) => {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpeg`
}

// Initially load songs into DOM
loadSong(songs[songIndex])

// Functions Play and Pause Songs
const playSong = () => {
    musicContainer.classList.add('play')
    playBtn.style.opacity = 0.2
    pauseBtn.style.opacity = 1

    audio.play()
}

const pauseSong = () => {
    musicContainer.classList.remove('play')
    playBtn.style.opacity = 1
    pauseBtn.style.opacity = 0.2

    audio.pause()
}

const prevSong = () => {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])

    playSong()
}

const nextSong = () => {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

const updateProgress = (e) => {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

const setProgress = (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}


// Event Listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
    } else {
        playSong()
    }
})

pauseBtn.addEventListener('click', ()=> {
    const isPaused = musicContainer.classList.remove('play')

    if (isPaused) {
    } else {
        pauseSong()
    }
})

// Change Song Events - previous and next
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

// Progress Navigation
progressContainer.addEventListener('click', setProgress)

// Moving on to the next song
audio.addEventListener('ended', nextSong)