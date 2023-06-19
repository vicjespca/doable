import DOMHandler from "../dom-handler.js";
import HomePage from "../pages/home-page.js";
import { editComTask,editImpTask } from "../services/task-services.js";
import STORE from "../store.js"

export function renderTask(task) {
  const dueDateFormatted = new Date(task.due_date).toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return `
    <div class="task">
    ${task.completed ? `<input data-id=${task.id} class="checkbox__input js-checkbox-incompleted" type="checkbox" checked>` : `<input data-id=${task.id} class="checkbox__input js-checkbox-completed" type="checkbox">`}
      <div class="task-info ${task.completed ? 'completed' : ''}">
        <div class="task-info-2 ${task.completed ? 'completed' : ''}">
          <p class="task-title">${task.title}</p>
          ${task.important ? `<img data-id=${task.id} class="exclamation-icon ${task.completed ? 'completed' : ''} js-not-important" src="./assets/icon-color.svg" alt="exclamation-circle">` : `<img data-id=${task.id} class="exclamation-icon js-important" src="./assets/exclamation-circle.svg" alt="exclamation-circle">`}
        </div> 
          ${task.due_date ? `<p class="due-date">${dueDateFormatted}</p>` : ""}
      </div>
    </div>
  `;
}

  
  export function listenTaskCompleted() {
    const completed = document.querySelector(".js-action-tasks")
    completed.addEventListener("click",async (event) => {
      event.preventDefault()
      if(event.target.classList.contains("js-checkbox-completed")){
        const taskId = event.target.dataset.id
        await editComTask(taskId, { completed: true })
        await STORE.fetchTasks()
        DOMHandler("#root").load(HomePage)
      }
      if(event.target.classList.contains("js-checkbox-incompleted")){
        const taskId = event.target.dataset.id
        await editComTask(taskId, { completed: false })
        await STORE.fetchTasks()
        DOMHandler("#root").load(HomePage)
      }
    })
  }
  
  export function listenTaskImportant() {
    const important = document.querySelector(".js-action-tasks")
    important.addEventListener("click", async (event) => {
      event.preventDefault()
      if(event.target.classList.contains("js-important")){
        const taskId = event.target.dataset.id
        await editImpTask(taskId, { important: true })
        await STORE.fetchTasks()
        DOMHandler("#root").load(HomePage)
      }
      if(event.target.classList.contains("js-not-important")){
        const taskId = event.target.dataset.id
        await editImpTask(taskId, { important: false })
        await STORE.fetchTasks()
        DOMHandler("#root").load(HomePage)
      }
    })
  }

  function sortByDte(a, b){
    var dateA = new Date(a.due_date);
    var dateB = new Date(b.due_date);
    return dateA < dateB ? 1 : -1 ;
  }


  export function listenSortTasks() {
    const select = document.querySelector("#Importance")
    select.addEventListener("change", function () {
      let valueSelect = this.value
      if(valueSelect == "Alpha"){
        STORE.tasks.sort((a, b) => (a.title > b.title ? 1 : -1))
        STORE.optionSelect = "alpha"
        DOMHandler("#root").load(HomePage)
      }
      if(valueSelect == "Due_date"){
        STORE.tasks.sort(sortByDte)
        STORE.optionSelect = "dueDate"
        DOMHandler("#root").load(HomePage)
      }
      if(valueSelect == "Import"){
        STORE.tasks.sort((a, b) => (b.important > a.important ? 1 : -1))
        STORE.optionSelect = "import"
        DOMHandler("#root").load(HomePage)
      }
    })
  }
