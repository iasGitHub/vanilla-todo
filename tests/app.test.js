import { loadTodoItemsFromApi, saveTodoItemToApi } from "../src/api";
import { displayTodoList } from "../src/ui";
import { tick } from "./utils";

jest.mock("../src/api");

it("displays todo items from API", async () => {
  // ...
});

// Testons qu'on peut ajouter une tâche avec le formulaire
it("should add a todo item", async () => {
    // Imaginons que l'API ne renvoie aucune tâche déjà enregistrée
    loadTodoItemsFromApi.mockResolvedValue([]);
    // Et partons du principe que lorsqu'on va sauvegarder une tâche dans Supabase, celle-ci va nous retourner cette tâche tel que :
    saveTodoItemToApi.mockResolvedValue([
        { id: 1, text: "MOCK_TASK", done: false },
    ]);

    // On simule un document HTML qui contient un élément <main>
    document.body.innerHTML = `
        <main></main>
      `;

    // On appelle displayTodoList() dont le but est d'afficher la liste ET le formulaire
    displayTodoList();

    // On peut désormais manipuler le formulaire
    // Donnons la valeur MOCK_TASK a notre <input />
    document.querySelector('input[type=text]').value = "MOCK_TASK";
    // Puis nous soumettons le formulaire
    document.querySelector('form').submit();

    // Normalement, cela devrait déclencher la fonction onSubmitForm() et donc l'appel HTTP à Supabase
    // Puis l'ajout d'une nouvelle tâche dans le <ul>
    // Comme on a de l'asynchrone, on simule une petite attente :
    await tick();

    // Et on s'attend à trouver un <li> dans le <ul> (la tâche qu'on vient d'ajouter)
    expect(document.querySelectorAll('ul li').length).toBe(1);
    // Vous pourriez ajouter d'autres vérifications pour vous assurer que ça fonctionne correctement :)
});