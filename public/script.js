"use strict";

(function() {
  window.addEventListener("load", init);

  function init() {
    getRandomJoke();
    id("load-categories").addEventListener("click", getCategories);
    id("search-category").addEventListener("click", searchCategory);
    id("add-joke-form").addEventListener("submit", addJoke);
  }

  // GET RANDOM JOKE function 
  function getRandomJoke() {
    fetch("/jokebook/random")
      .then(checkStatus)
      .then(data => {
        id("random-joke").textContent =
          data.setup + " - " + data.delivery + " (" + data.category + ")";
      })
      .catch(console.error);
  }

  // GET ALL CATEGORIES function 
  function getCategories() {
    fetch("/jokebook/categories")
      .then(checkStatus)
      .then(categories => {
        let div = id("categories");
        div.innerHTML = "";
        categories.forEach(cat => {
          let btn = document.createElement("button");
          btn.textContent = cat.category;
          btn.addEventListener("click", () => getCategory(cat.category));
          div.appendChild(btn);
        });
      })
      .catch(console.error);
  }

  // GET JOKES BY CATEGORY function 
  function getCategory(category) {
    fetch("/jokebook/category/" + category)
      .then(checkStatus)
      .then(jokes => showJokes(jokes))
      .catch(console.error);
  }

  // SEARCH CATEGORY function 
  function searchCategory() {
    let category = id("category-input").value;
    if (category.trim() !== "") {
      getCategory(category);
    }
  }

  // ADD A NEW JOKE function 
  function addJoke(evt) {
    evt.preventDefault();
    let data = new FormData(id("add-joke-form"));
    fetch("/jokebook/add", {
      method: "POST",
      body: data
    })
      .then(checkStatus)
      .then(jokes => showJokes(jokes))
      .catch(console.error);
  }

  // DISPLAY JOKES function 
  function showJokes(jokes) {
    let div = id("category-jokes");
    div.innerHTML = "";
    jokes.forEach(j => {
      let p = document.createElement("p");
      p.textContent = j.setup + " - " + j.delivery + " (" + j.category + ")";
      div.appendChild(p);
    });
  }

  // HELPER function 
  function id(name) {
    return document.getElementById(name);
  }

  function checkStatus(res) {
    if (!res.ok) throw Error("Error: " + res.statusText);
    return res.json();
  }
})();
