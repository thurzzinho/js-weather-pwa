//APIs
const apiKey = "e994a336092581a7c52f6aa007b924e9";
const apiCountryURL = "https://flagfeed.com/country/";

const cityInput = document.querySelector("#city-input"); //campo de input
const searchBtn = document.querySelector("#search"); // ícone/botão de pesquisa


// Elementos
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descriptionElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");

//Elementos de tratamento de erro
const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

//Sugestões de cidades
const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// Animação do Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

// Função para obter os dados do clima
const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

// Função para exibir a mensagem de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

// Função para esconder as informações quando a busca for feita
const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

// Função para exibir os dados do clima
const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  // Exibição dos dados do clima de acordo com a API

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descriptionElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute( "src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;



  weatherContainer.classList.remove("hide");
};

// Eventos
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

// Sugestões
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});

// 1. pega o botão de localização que você adicionou no HTML
const locationBtn = document.querySelector("#location-btn");

// 2. Criar uma função específica para buscar o clima usando coordenadas numéricas
const getWeatherDataByLocation = async (lat, lon) => {
  // Exibe o ícone de carregamento na tela
  toggleLoader();

  // Monta a URL da API da OpenWeatherMap usando latitude (lat) e longitude (lon)
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=pt_br`;

  // Faz a requisição na internet e aguarda a resposta
  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  // Oculta o ícone de carregamento após receber os dados
  toggleLoader();

  // Retorna as informações do clima prontas para uso
  return data;
};

// 3. Criar uma função para processar e exibir os dados na tela
const showWeatherDataByLocation = async (lat, lon) => {
  // Limpa informações antigas e mensagens de erro da tela
  hideInformation();

  // Chama a função criada acima e guarda o resultado na variável data
  const data = await getWeatherDataByLocation(lat, lon);

  // Verifica se a API retornou algum erro
  if (data.cod === "404" || (data.cod && data.cod !== 200)) {
    showErrorMessage();
    return;
  }

  // Preenche os elementos visuais do HTML com os dados recebidos da API
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descriptionElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // Remove a classe que esconde a caixa de clima, tornando-a visível
  weatherContainer.classList.remove("hide");
};

// 4. Configurar o evento de clique no botão de localização
if (locationBtn) {
  locationBtn.addEventListener("click", (e) => {
    // Evita que a página recarregue acidentalmente ao clicar no botão
    e.preventDefault();

    // Verifica se o navegador do usuário possui suporte nativo a GPS
    if (navigator.geolocation) {
      
      // Solicita a posição atual do usuário
      navigator.geolocation.getCurrentPosition(
        
        // Caminho de Sucesso: O usuário permitiu o acesso ao GPS
        (position) => {
          // Extrai os números exatos de latitude e longitude da resposta do navegador
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          // Envia esses números para a função que atualiza a tela
          showWeatherDataByLocation(lat, lon);
        },
        
        // Caminho de Erro: O usuário recusou o acesso ou o GPS falhou
        (error) => {
          alert("Não foi possível acessar a localização. Verifique as permissões do dispositivo.");
        }
      );
      
    } else {
      // Exibe um aviso caso o navegador seja incompatível com o recurso
      alert("Geolocalização não suportada neste navegador.");
    }
  });
}

// Registro do Service Worker para PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => console.log("Service Worker registrado com sucesso!", reg))
      .catch((err) => console.log("Falha ao registrar o Service Worker:", err));
  });
}

// Lógica para o Botão de Instalação do PWA
let deferredPrompt;
const installBtn = document.querySelector("#install-btn");

window.addEventListener("beforeinstallprompt", (e) => {
  // Impede o mini-infobar automático do navegador
  e.preventDefault();
  // Armazena o evento para disparar quando o usuário clicar no botão
  deferredPrompt = e;
  // Mostra o botão de instalação (removendo a classe 'hide')
  if (installBtn) {
    installBtn.classList.remove("hide");
  }
});

if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    // Mostra o prompt nativo de instalação
    deferredPrompt.prompt();
    // Aguarda a escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("Usuário aceitou a instalação do PWA");
    }
    deferredPrompt = null;
    // Esconde o botão novamente
    installBtn.classList.add("hide");
  });
}
