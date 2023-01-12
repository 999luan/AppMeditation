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
