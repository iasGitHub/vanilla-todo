/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ (() => {

eval("const SUPABASE_URL = \"https://wxjcyteyybmalqnylyik.supabase.co/rest/v1/Taches\";\nconst SUPABASE_API_KEY = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDA5MzAwMiwiZXhwIjoxOTU1NjY5MDAyfQ.hETBNghGA7-ND48IUFBN5XV8m5E7hHqqL0DVOxhPerE\";\n\n\n// On créé ici un tableau TODO_ITEMS qui contient deux objets \n// const TODO_ITEMS = [\n//     { id: 1, text: \"Faire les courses\", done: false },\n//     { id: 2, text: \"Aller chercher les enfants\", done: true },\n// ];\n\n// Nous créons une fonction qui servira à ajouter un élément dans le UL à partir d'un objet tâche\nconst addTodo = (item) => {\n    // On sélectionne le <ul>\n  const container = document.querySelector(\"ul\");\n\n  // On ajoute du HTML à la fin du <ul>\n  container.insertAdjacentHTML(\n    \"beforeend\",\n    `\n        <li>\n            <label>\n                <input type=\"checkbox\" id=\"todo-${item.id}\" ${item.done ? \"checked\" : \"\"} /> \n                ${item.text}\n            </label>\n        </li>\n    `\n  );\n  document.querySelector(\"input#todo-\" + item.id).addEventListener(\"click\", onClickCheckbox);\n};\n\n// Pour chaque élément du tableau TODO_ITEMS, on appelle la fonction addTodo en fournissant\n// l'item\n// TODO_ITEMS.forEach((item) => addTodo(item));\n\n// On souhaite réagir à chaque fois que le formulaire est soumis\ndocument.querySelector(\"form\").addEventListener(\"submit\", (event) => {\n    // On souhaite aussi empêcher le rechargement de la page\n    event.preventDefault();\n  \n    // On récupère l'input\n    const input = document.querySelector('input[name=\"todo-text\"]');\n  \n    // On créé une nouvelle tâche avec pour text la valeur tapée dans l'input\n    const item = {\n      text: input.value,\n      done: false,\n    };\n    \n    // On appelle la fonction créée plus tôt qui ajoutera la tâche dans le <ul>\n    addTodo(item);\n    fetch(SUPABASE_URL, {\n        method: \"POST\",\n        body: JSON.stringify(item),\n        headers: {\n            \"Content-Type\": \"application/json\",\n            apiKey: SUPABASE_API_KEY,\n            Prefer: \"return=representation\",\n        },\n    })\n    .then((response) => response.json())\n    .then((items) => {\n      addTodo(items[0]);\n      input.value = \"\";\n      input.focus();\n    });\n  \n    // On vide l'input et replace le curseur dedans\n    input.value = \"\";\n    input.focus();\n});\n\n// Lorsque les éléments du DOM sont tous connus\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    // Appel HTTP vers Supabase\n    fetch(`${SUPABASE_URL}?order=created_at`, {\n      headers: {\n        apiKey: SUPABASE_API_KEY,\n      },\n    })\n      .then((response) => response.json())\n      .then((items) => {\n        items.forEach((item) => addTodo(item));\n      });\n});\n\n// Nous souhaitons intervenir lors d'un click sur une checkbox\nconst onClickCheckbox = (e) => {\n    // Nous récupérons l'identifiant de la checkbox (ressemble à \"todo-1\" ou \"todo-23\" ...)\n  const inputId = e.target.id; \n  // Nous en déduisons l'identifiant de la tâche dans Supabase (ne récupérant que le nombre)\n  const id = +inputId.split(\"-\").pop();  \n  // On découvre si la checkbox était déjà cochée ou pas\n  const isDone = e.target.checked;\n\n  // Nous empêchons le comportement par défaut de l'événement (cocher ou décocher)\n  e.preventDefault();\n\n  fetch(`${SUPABASE_URL}?id=eq.${id}`, {\n    method: \"PATCH\",\n    headers: {\n      \"Content-Type\": \"application/json\",\n      apiKey: SUPABASE_API_KEY,\n      Prefer: \"return=representation\",\n    },\n    body: JSON.stringify({ done: isDone }),\n  }).then(() => {\n      // Lorsque le serveur a pris en compte la demande et nous a répond\n      // Nous cochons (ou décochons) la case\n    e.target.checked = isDone;\n  });\n}\n\n\n\n//# sourceURL=webpack://amu-tp-vanilla-todo/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.js"]();
/******/ 	
/******/ })()
;