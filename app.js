class App {
  constructor() {
    this.song = document.querySelector(".song");
    this.play = document.querySelector(".play");
    this.outline = document.querySelector(".moving-outline circle");
    this.video = document.querySelector(".vidContainer video");
    this.sounds = document.querySelectorAll(".selecionaMusica button");
    this.mostraTempo = document.querySelector(".mostraTempo");
    this.selecionaTempo = document.querySelectorAll(".selecionaTempo button");
    this.volumeControl = document.querySelector(".volume-control");
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
    this.volumeControl.addEventListener("input", (e) => {
      this.song.volume = e.target.value;
    });
    this.song.addEventListener("volumechange", () => {
      this.volumeControl.value = this.song.volume;
    });
  }

  selectSound(e) {
    // Get the button that was clicked
    const button = e.target;

    // Check if the button already has the 'disabled' class
    if (button.classList.contains("disabled")) return;

    const sound = button.getAttribute("data-sound");
    const video = button.getAttribute("data-video");

    if (!sound || !video) {
      console.error(
        "Could not find sound or video source. Make sure to have the data-sound and data-video attributes correctly set on the buttons element"
      );
      return;

      // Add the 'disabled' class to the button
      button.classList.add("disabled");

      this.song.src = sound;
      this.video.src = video;

      // Attach an event listener to the song's `canplay` event
      this.song.addEventListener("canplay", () => {
        // Remove the disabled class when the song is ready
        button.classList.remove("disabled");
      });
    }
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
    let seconds = ("0" + Math.floor(elapsed % 60)).slice(-2);
    let minutes = Math.floor(elapsed / 60);

    let progresso =
      this.outlineLength -
      (currentTime / this.duracaoFalsa) * this.outlineLength;
    this.outline.style.strokeDashoffset = progresso;
    this.mostraTempo.textContent = `${minutes}:${seconds}`;
    if (currentTime >= this.duracaoFalsa) {
      this.song.pause();
      this.song.currentTime = 0;
      this.play.src = "./svg/play.svg";
    }
  }
}
const myApp = new App();
