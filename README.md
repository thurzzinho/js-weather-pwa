# Weather App: PWA de Previsão do Tempo

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![PWA](https://img.shields.io/badge/PWA-5A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white)

Um Progressive Web App (PWA) simples, rápido e responsivo para consultar a previsão do tempo em tempo real. O projeto consome uma API externa de clima e utiliza recursos nativos do dispositivo, como GPS, para fornecer dados meteorológicos precisos com base na localização atual do usuário.

## Funcionalidades

* **Instalável (PWA):** Pode ser adicionado à tela inicial de smartphones ou desktops, funcionando com uma interface de aplicativo nativo.
* **Geolocalização (GPS):** Utiliza o hardware do dispositivo para identificar as coordenadas do usuário e exibir o clima local instantaneamente.
* **Suporte Offline Básico:** Implementação de Service Workers para armazenar recursos estáticos em cache, garantindo o carregamento da interface mesmo em conexões instáveis.
* Busca de previsão do tempo pelo nome da cidade.
* Exibição da temperatura atual, mínima e máxima (em °C).
* Informações detalhadas: umidade do ar, velocidade do vento e sensação térmica.
* Interface responsiva que se adapta perfeitamente a dispositivos móveis e desktops.
* Tratamento de erros amigável, notificando caso a cidade não seja encontrada ou a localização seja negada.

## Link do projeto

> [Clima Agora PWA](https://thurzzinho.github.io/js-weather-pwa/)

## Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **HTML5 e CSS3:** Para estruturação semântica, acessibilidade e estilização responsiva.
* **JavaScript (ES6+):** Para lógica da aplicação e manipulação do DOM.
* **Service Workers e Web App Manifest:** Tecnologias centrais para a transformação em PWA.
* **Geolocation API:** Interface nativa do navegador para acesso ao hardware de GPS do dispositivo.
* **Fetch API:** Para realizar as requisições HTTP de forma moderna e assíncrona.
* **[OpenWeatherMap API](https://openweathermap.org/)**: Como fonte de dados em tempo real.

## Como executar o projeto localmente

Siga os passos abaixo para rodar o projeto na sua máquina.

### Pré-requisitos
* Um navegador web moderno (Chrome, Edge, Safari, etc).
* Um editor de código (recomendamos o [VS Code](https://code.visualstudio.com/)).
* Uma chave de API gratuita (API Key) do OpenWeatherMap.

### Passo a Passo

1. **Clone este repositório:**
   ```bash
   git clone [https://github.com/thurzzinho/js-weather-pwa.git](https://github.com/thurzzinho/js-weather-pwa.git)
