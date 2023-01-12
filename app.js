class App {
  constructor() {
    this.song = document.querySelector(".song");
    this.play = document.querySelector(".play");
    this.outline = document.querySelector(".moving-outline circle");
    this.video = document.querySelector(".vidContainer video");
    this.sounds = document.querySelectorAll(".selecionaMusica button");
    this.mostraTempo = document.querySelector(".mostraTempo");
    this.selecionaTempo = document.querySelectorAll(".selecionaTempo button");
    this.outlineLength = this.outline.getTotalLength();
    this.duracaoFalsa = 600;

    this.outline.style.strokeDasharray = this.outlineLength;
    this.outline.style.strokeDashoffset = this.outlineLength;

    this.initEventListeners();
  }

  initEventListeners() {
    this.sounds.forEach((sound) => {
      sound.addEventListener("click", (e) => this.selectSound(e));
    });

    this.play.addEventListener("click", () => {
      this.checkPlay(this.song);
    });

    this.selecionaTempo.forEach((option) => {
      option.addEventListener("click", this.selectDuration.bind(this));
    });

    this.song.ontimeupdate = this.animate.bind(this);
  }

  selectSound(e) {
    let sound = e.target.getAttribute("data-sound");
    let video = e.target.getAttribute("data-video");

    if (!sound || !video) {
      console.warn("Could not find sound or video source");
      return;
    }

    this.song.src = sound;
    this.video.src = video;
    this.song.addEventListener("loadedmetadata", () => {
      if (this.song.readyState > 0) {
        this.checkPlay(this.song);
      }
    });
  }
  togglePlay() {
    this.checkPlay(this.song);
  }

  selectDuration(e) {
    this.duracaoFalsa = e.target.getAttribute("data-time");
    this.mostraTempo.textContent = `${Math.floor(
      this.duracaoFalsa / 60
    )}:${Math.floor(this.duracaoFalsa % 60)}`;
  }

  checkPlay(song) {
    if (song.paused) {
      song.play();
      this.video.play();
      this.play.src = "./svg/pause.svg";
    } else {
      song.pause();
      this.video.pause();
      this.play.src = "./svg/play.svg";
    }
  }

  animate() {
    let currentTime = this.song.currentTime;
    let elapsed = this.duracaoFalsa - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    let progresso =
      this.outlineLength -
      (currentTime / this.duracaoFalsa) * this.outlineLength;
    this.outline.style.strokeDashoffset = progresso;

    this.mostraTempo.textContent = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    if (currentTime >= this.duracaoFalsa) {
      this.song.pause();
      this.song.currentTime = 0;
      this.play.src = "./svg/play.svg";
      this.video.pause();
    }
  }
}
const myApp = new App();
