const containerVideos = document.querySelector(".videos__container");


async function buscarEMostrarVideos(){
    try{
const busca = await fetch("http://localhost:3000/videos")
const videos = await busca.json()


// .then(res => res.json())
// então pegue a resposta dessa api(conteúdo dela) e transforme ela em arquivo json para manipular
// .then((videos) =>
    videos.forEach((video)=> {
        if(video.categoria == ""){
            throw new Error('Vídeo não têm categoria')
        }
    // a cada video de todos os videoS
        containerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title"${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                 	<img class="img-canal" src = "${video.imagem}" alt="Logo do Canal">
                 	<h3 class="titulo-video">${video.titulo}</h3>
                         <p class="titulo-canal">${video.descricao}</p>
                         <p class = "categoria" hidden>${video.categoria}</p>
                 </div>
              
        </li>
        `;
    // crie um elemento. Pegamos o const que guardava um li do nosso HTML que vai ser lá onde será guardada TODOS os videos e criar um li, iframe, divs, p e h3...
    // isso é uma tecnica de DOOM
    })}
catch(error){
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error}</p>`
}

// .catch((error) => {containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos: ${error} </p>`})
// quando há alguma erro, temos que buscar formas de parar e solucionar o que aconteceu, então a função catch trata o que tiver de erro
}

buscarEMostrarVideos()

// algumas linhas de códigos foram modificadas pois uma aplicação com muito .then é descrita como callback hell, o que não queremos para aplicações de grande escalas.

const barraDePesquisa = document.querySelector(".pesquisar__input");
barraDePesquisa.addEventListener("input", filtrarPesquisa)

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos__item")

    if(barraDePesquisa != ""){  
        for(let video of videos){
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase()
            let valorFiltro = barraDePesquisa.value.toLowerCase();
        
            if(!titulo.includes(valorFiltro)){
                video.style.display = "none"

            } else {
                video.style.display = "block"
            }



        }   

    }else{
        for (let video of videos) { 
            video.style.display = 'block';
        }
    }}

    const botaoCategoria = document.querySelectorAll(".superior__item")

    botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
    })

    function filtrarPorCategoria(filtro){
        const videos = document.querySelectorAll(".videos__item")
        for(let video of videos) {
            let categoria = video.querySelector(".categoria").textContent.toLowerCase();
            let valorFiltro = filtro.toLowerCase()


            if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
                video.style.display = 'none'
            } else {
                video.style.display = 'block'
            }
        }
    }