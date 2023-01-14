const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vidContainer video");
  // musicas

  const sounds = document.querySelectorAll(".selecionaMusica button");

  // mostra o tewmpo
  const mostraTempo = document.querySelector(".mostraTempo");
  const selecionaTempo = document.querySelectorAll(".selecionaTempo button");
  // tamanho da outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);

  // duracao
  let duracaoFalsa = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //seleciona musicas diferentes
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlay(song);
    });
  });

  //Toca som
  play.addEventListener("click", () => {
    checkPlay(song);
  });

  selecionaTempo.forEach((option) => {
    option.addEventListener("click", function () {
      duracaoFalsa = this.getAttribute("data-time");
      mostraTempo.textContent = `${Math.floor(duracaoFalsa / 60)}:${Math.floor(
        duracaoFalsa % 60
      )}`;
    });
  });

  //parar e tocar som
  const checkPlay = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();

      play.src = "./svg/play.svg";
    }
  };

  //animar o circulo com o tempo
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duracaoFalsa - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animando progresso
    let progresso =
      outlineLength - (currentTime / duracaoFalsa) * outlineLength;
    outline.style.strokeDashoffset = progresso;

    //mostrando texto

    mostraTempo.textContent = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    if (currentTime >= duracaoFalsa) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();

//modelo em classes #1

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
