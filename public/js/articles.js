// Fetch articles using Axios and display them
axios.get('/scaper news/api/articles.php')
  .then(response => {
    const articles = response.data;
    const container = document.getElementById('articles-container');
    if (!container) return;
    container.innerHTML = '';
    articles.forEach(article => {
      const div = document.createElement('div');
      div.className = 'article';
      div.innerHTML = `<h2>${article.title}</h2><p>${article.content}</p>`;
      container.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error fetching articles:', error);
  });