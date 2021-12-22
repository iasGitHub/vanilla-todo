const SUPABASE_URL = "https://wxjcyteyybmalqnylyik.supabase.co/rest/v1/Taches";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDA5MzAwMiwiZXhwIjoxOTU1NjY5MDAyfQ.hETBNghGA7-ND48IUFBN5XV8m5E7hHqqL0DVOxhPerE";

import { applyRouting } from "./routing.js";

// On créé ici un tableau TODO_ITEMS qui contient deux objets 
// const TODO_ITEMS = [
//     { id: 1, text: "Faire les courses", done: false },
//     { id: 2, text: "Aller chercher les enfants", done: true },
// ];

// Nous créons une fonction qui servira à ajouter un élément dans le UL à partir d'un objet tâche
const addTodo = (item) => {
    // On sélectionne le <ul>
  const container = document.querySelector("ul");

  // On ajoute du HTML à la fin du <ul>
  container.insertAdjacentHTML(
    "beforeend",
    `
        <li>
            <label>
                <input type="checkbox" id="todo-${item.id}" ${item.done ? "checked" : ""} /> 
                ${item.text}
            </label>
        </li>
    `
  );
  document.querySelector("input#todo-" + item.id).addEventListener("click", onClickCheckbox);
};

// Pour chaque élément du tableau TODO_ITEMS, on appelle la fonction addTodo en fournissant
// l'item
// TODO_ITEMS.forEach((item) => addTodo(item));

// On souhaite réagir à chaque fois que le formulaire est soumis
document.querySelector("form").addEventListener("submit", (event) => {
    // On souhaite aussi empêcher le rechargement de la page
    event.preventDefault();
  
    // On récupère l'input
    const input = document.querySelector('input[name="todo-text"]');
  
    // On créé une nouvelle tâche avec pour text la valeur tapée dans l'input
    const item = {
      text: input.value,
      done: false,
    };
    
    // On appelle la fonction créée plus tôt qui ajoutera la tâche dans le <ul>
    addTodo(item);
    fetch(SUPABASE_URL, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json",
            apiKey: SUPABASE_API_KEY,
            Prefer: "return=representation",
        },
    })
    .then((response) => response.json())
    .then((items) => {
      addTodo(items[0]);
      input.value = "";
      input.focus();
    });
  
    // On vide l'input et replace le curseur dedans
    input.value = "";
    input.focus();
});

// Lorsque les éléments du DOM sont tous connus
document.addEventListener("DOMContentLoaded", () => {
    // Appel HTTP vers Supabase
    fetch(`${SUPABASE_URL}?order=created_at`, {
      headers: {
        apiKey: SUPABASE_API_KEY,
      },
    })
      .then((response) => response.json())
      .then((items) => {
        items.forEach((item) => addTodo(item));
      });
});

// Nous souhaitons intervenir lors d'un click sur une checkbox
const onClickCheckbox = (e) => {
    // Nous récupérons l'identifiant de la checkbox (ressemble à "todo-1" ou "todo-23" ...)
  const inputId = e.target.id; 
  // Nous en déduisons l'identifiant de la tâche dans Supabase (ne récupérant que le nombre)
  const id = +inputId.split("-").pop();  
  // On découvre si la checkbox était déjà cochée ou pas
  const isDone = e.target.checked;

  // Nous empêchons le comportement par défaut de l'événement (cocher ou décocher)
  e.preventDefault();

  fetch(`${SUPABASE_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_KEY,
      Prefer: "return=representation",
    },
    body: JSON.stringify({ done: isDone }),
  }).then(() => {
      // Lorsque le serveur a pris en compte la demande et nous a répond
      // Nous cochons (ou décochons) la case
    e.target.checked = isDone;
  });
}

document.addEventListener("DOMContentLoaded", () => {
    // On applique le routage par rapport au pathname (tout ce qui vient après le nom de domaine)
    // Exemple : /12/details
    applyRouting(window.location.pathname);

    loadTodoItemsFromApi().then((items) => {
        items.forEach((item) => addTodo(item));
    });
})

