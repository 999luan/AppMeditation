Projeto Readme


Este projeto é um simples player de música que permite ao usuário reproduzir/pausar, além de selecionar uma duração para a música e exibir o tempo restante. Ele é específico para uma aplicação de meditação sonora.

A classe App controla toda a funcionalidade do player de música. Ela usa JavaScript para selecionar e manipular elementos do DOM e adicionar listeners de eventos para interações do usuário. A classe possui vários métodos que lidam com diferentes ações, como initEventListeners que configura todos os listeners de eventos para os botões e música, selectSound que muda a música e o vídeo quando um botão é clicado, checkPlay que alterna o estado de reprodução/pausa da música, selectDuration que muda a duração da música e animate que atualiza o progresso visual da música e o tempo restante.

A classe também usa os atributos data-sound e data-video no HTML dos botões para obter a fonte da música e do vídeo.

O projeto também usa ícones SVG para o botão de reprodução/pausa.

A classe também tem um construtor que configura o estado inicial do player, como definir o strokeDashoffset e strokeDasharray do elemento de contorno para corresponder à duração da música.

A classe também tem a variável duracaoFalsa que é usada para definir a duração da música, e a variável outlineLength que é usada para controlar a animação da barra de progresso.

Uso
Para usar este projeto, basta abrir o arquivo HTML em um navegador web e usar os botões para reproduzir/pausar a música e selecionar uma duração para a música. O tempo restante da música será exibido e a barra de progresso mostrará a posição atual da música.

Informações adicionais
Este projeto foi construído com as seguintes tecnologias:

HTML
CSS
JavaScript
SVG
Tenha em mente que este projeto é um simples conceito de prova e pode não ser adequado para uso em produção.
