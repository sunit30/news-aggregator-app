//  Enter your JS code here
document.getElementById("display").innerHTML = `-- Top Headlines --`;
window.addEventListener("load", load_func); //display news on page load
let search_text = `top-headlines?country=in`;
const key = `148d45517dda466ea6bd5e1aa55f22c2`;

async function load_func() {
  document.getElementById(
    "news-articles"
  ).innerHTML = `<div id="loader"></div>`;

  let response = await fetch(
    `https://newsapi.org/v2/${search_text}&apiKey=${key}`
  );

  let data = await response.json();
  let output = ``;

  if (data.articles.length === 0) {
    output = `No article was found based on the search.`;
    document.getElementById("display").innerHTML = output;
    document.getElementById("news-articles").innerHTML = ``;
  } else {
    data.articles.forEach((item, i) => {
      output += `<li class="article card shadow" id="news_card">`;
      output += `<img src=${data.articles[i].urlToImage} class="article-img card-img-top" alt="news_image"/>`;
      output += `<a href=${data.articles[i].url} class="article-link" target="_blank">`;

      output += `<div class="card-body" id="card_main">`;
      output += `<h2 class="article-title card-title">${data.articles[i].title}</h2>`;
      output += `<p class="article-description card-text">${data.articles[i].description}</p>`;
      output += `<p class="card-text" id="text_author"><span class="article-author"> - ${data.articles[i].author}</span></p>`;
      output += `</div>`;

      output += `</a>`;

      output += `</li>`;
    });

    document.getElementById("news-articles").innerHTML = output;
  }
}

document.getElementById("search").addEventListener("keyup", search_func); //display on enter key press

function search_func(keyletter) {
  let val = keyletter.target.value;

  if (keyletter.which == 13) {
    document.title = `${val}`; // change the doc title according to search
    if (val === "") {
      search_text = `top-headlines?country=in`;
      document.getElementById("display").innerHTML = `-- Top Headlines --`;
      load_func();
    } else {
      search_text = `everything?q=${val}`;
      load_func();
      document.getElementById(
        "display"
      ).innerHTML = `-- Search results for : ${val} --`;
    }
  }
}

document.getElementById("check").addEventListener("click", theme_func); //dark mode
function theme_func(val) {
  if (val.target.checked) {
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "./styles/dark.css";
    document.head.appendChild(link);
  } else {
    let sheet = document.querySelector(`link[href="./styles/dark.css"]`);
    if (sheet) {
      // if sheet exists
      sheet.disabled = true;
      sheet.parentNode.removeChild(sheet);
    }
  }
}
document.getElementById("head_div").addEventListener("click", logo_func); //display on logo click
function logo_func() {
  search_text = `top-headlines?country=in`;
  document.getElementById("display").innerHTML = `-- Top Headlines --`;
  load_func();
}
