import { header } from "../components/header.js";
import { listenLogout } from "../components/header.js";
import STORE from "../store.js";
import { renderTask, listenTaskCompleted, listenTaskImportant, listenSortTasks } from "../components/task.js"
import { formTask, listenCreateTask } from "../components/form.js";
import { optionUser, listenNavigation, changeCurrent } from "../components/option-user.js";

function render(){
  const currentTab = STORE.currentTab
  return `
    ${header(true)}
    <main class="padding">
      <section class="container-sm mt-4">
        ${optionUser()}
      </section>
      <section class="container-sm mt-4 js-action-tasks">
        ${currentTab === "" ? STORE.tasks.map(renderTask).join("") : ""}
        ${currentTab === "completed" ? STORE.completed.map(renderTask).join("") : ""}
        ${currentTab === "important" ? STORE.important.map(renderTask).join("") : ""}
      </section>
      <section class="container-sm">
        ${formTask()}
      </section>
    </main>
  `;
}

const HomePage = {
  toString() {
    return render();
  },
  addListeners() {
    listenLogout();
    listenCreateTask();
    listenNavigation();
    changeCurrent();
    listenTaskCompleted();
    listenTaskImportant();
    listenSortTasks();
  }
};
export default HomePage;