const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".vidContainer video");

  // musicas

  const sounds = document.querySelectorAll(".selecionaMusica button");

  // mostra o tewmpo
  const mostraTempo = document.querySelector(".mostraTempo");

  // tamanho da outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);

  // duracao
  let duracaoFalsa = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //Toca som
  play.addEventListener("click", () => {
    checkPlay(song);
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

    //mostranod texto

    mostraTempo.textContent = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };
};

app();
