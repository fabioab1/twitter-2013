window.onload = async function() { // Async estou dizendo que é uma função assincrona, o codigo precisa estar ok antes de emitir resposta e tals e funcionar
    const url = "https://newsapi.org/v2/everything";
    const apiKey = "4d127a6091984a38b580b6012a6d81a7";

    const response = await fetch(`${url}?${new URLSearchParams({ // Await é esperar
        q: 'brazil dev', // Tema que eu quero pegar as notícias da API
        from: '2023-10-01', // Filtrar pela data da publicação
        sortBy: 'publishedAt',
        apiKey // Se eu só por o nome o js ja entende que eu to chamando a variável, n preciso por dois pontos 
    })}`, {
        method: 'GET'
    }) // Usa-se os acentos graves indicativos de crase para colocar uma variável em uma string, se fosse aspas normal o js iria entender como string

    const result = await response.json();

    if(result.status === "ok") { // se são 2 iguais == ele compara e retorna e faz a validação, mas ele não compara tipo, se a variável for string e a outra for int ele vai dar ok se forem iguais
        const divStream = document.getElementById('stream');
        
        result.articles.forEach(article => { // articles é o nome que veio na response da API, tem que ser igualzinho
            divStream.innerHTML += `
            <div class="tweet">
            <div class="content">
              <img class="avatar" src="${article.urlToImage}" />
              <strong class="fullname">${article.author}</strong>
              <span class="username">@${article.author?.toLowerCase().replaceAll(' ', '_')}</span>

              <p class="tweet-text">${article.description}</p>
              <div class="tweet-actions">
                <ul>
                  <li><span class="icon action-reply"></span> Reply</li>
                  <li><span class="icon action-retweet"></span> Retweet</li>
                  <li><span class="icon action-favorite"></span> Favorite</li>
                  <li><span class="icon action-more"></span> More</li>
                </ul>
              </div>

              <div class="stats">
                <div class="retweets">
                  <p class="num-retweets">30</p>
                  <p>RETWEETS</p>
                </div>
                <div class="favorites">
                  <p class="num-favorites">6</p>
                  <p>FAVORITES</p>
                </div>
                <div class="users-interact">
                  <div>
                    <img src="img/alagoon.jpg" />
                    <img src="img/vklimenko.jpg" />
                  </div>
                </div>
                <div class="time">
                ${new Date(article.publishedAt).toLocaleDateString()}
                @
                ${new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
            `
        })
    }
}