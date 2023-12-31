/////////////////////////////////   Preloader   /////////////////////////////////
let slideBox = document.querySelector('.slide-box');
let solid = document.querySelector('.solid');

let width = 100;

let slide = setInterval(() => {
    solid.style.width = `${width}%`;
    width -= 1;
}, 20)

setTimeout(() => {
    clearInterval(slide);
    solid.style.width = `100%`;
}, 2050);

setInterval(() => {

    width = 100;
    let slide = setInterval(() => {
        solid.style.width = `${width}%`;
        width -= 1;
    }, 20)

    setTimeout(() => {
        clearInterval(slide);
    }, 2050);

}, 2050);

let preloader = document.querySelector(".loader-container");
let elements = document.querySelector(".main");
window.addEventListener("load", function loading(){
    preloader.style.display = "none";
    elements.style.display = "block";
});

// Declare a variable to store the selected category
let categoryTypeIs = "business";

// Add event listeners to the radio buttons
document.getElementById("business").addEventListener("change", function() {
  categoryTypeIs = this.value;
});

document.getElementById("personal").addEventListener("change", function() {
  categoryTypeIs = this.value;
});




let todos = JSON.parse(localStorage.getItem("todos")) || [];
var addTodoForm = document.getElementById("addToDoForm");
// Adding functionality to the form submit
function addNewTodo(e){
    // Creating a todo element
    const todo = {
      description: document.getElementById("todoDescription").value,
      dueDate: document.getElementById("todoDueDate").value,
      category: categoryTypeIs,
      completed: false,
    }
    // Pushing to other todos array and update it
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  
    // Display my todos
    displayTodos();
    // Reset the form and close it
    categoryTypeIs = "business";
    addTodoForm.reset();
  }

  addTodoForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    addNewTodo();
  })
  
  function displayTodos() {
    // Import the div wher i should display my todos and clear it
    const todoListDiv = document.querySelector(".todo-list-div");
    todoListDiv.innerHTML = "";
    // looping over each patient
    todos.forEach((todoOne) => {
      var todoElement = document.createElement("div");
      todoElement.classList.add("row-");
      todoElement.innerHTML =`   
      <input type="checkbox" class="check">
      <div class="description">
        <div >
            <input id="todo-description" value = "${todoOne.description}" readonly><br>
           <i class="fa-regular fa-calendar-check"></i><input class="date" type="date" value="${todoOne.dueDate}" readonly>
        </div>
      </div>
      <div class="actions">
        <i class="fa-regular fa-pen-to-square"></i>
        <i class="fa-solid fa-trash-can"></i>
      </div>`
      
      var checkbox = todoElement.querySelector(".check");
      checkbox.checked = todoOne.completed;

      if (todoOne.category === "business"){
        console.log("blou");
        checkbox.classList.add("businessCheck");

      }else{
        console.log("no");
        checkbox.classList.add("PersonalCheck");
      }
  
      todoListDiv.appendChild(todoElement);
      console.log(todoListDiv)
  
  
      //delete btn actions
      var deleteBtn = todoElement.querySelector(".fa-trash-can");
      deleteBtn.addEventListener("click", (e) => {
        todos = todos.filter((todo) => todo != todoOne);
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
      })
  
      // checkbox event
      checkbox.addEventListener("change", (e) =>{
        console.log("checked")
        todoOne.completed = checkbox.checked;
        localStorage.setItem("todos", JSON.stringify(todos));
      })
  
      //  Edit button
      var editBtn = todoElement.querySelector(".fa-regular.fa-pen-to-square");
      editBtn.addEventListener("click", () => {
        console.log(editBtn);
        var inputDescription = todoElement.querySelector("#todo-description");
        inputDescription.removeAttribute("readonly");
        inputDescription.focus();
        inputDescription.addEventListener("blur", () => {
            todoOne.description = inputDescription.value; // E.TARGERT.VALUE
            inputDescription.setAttribute("readonly", true);
          localStorage.setItem("todos", JSON.stringify(todos));
        })
        var inputDueDate = todoElement.querySelector(".date");
        inputDueDate.removeAttribute("readonly");
        inputDueDate.addEventListener("blur", () => {
            todoOne.description = inputDueDate.value; // E.TARGERT.VALUE
            inputDueDate.setAttribute("readonly", true);
          localStorage.setItem("todos", JSON.stringify(todos));
        })
      });
    })
  }
  displayTodos();
  
  
  
  // Filter button
  const filterButton = document.getElementById("menu1");
  
  // Add event listeners to the filter options
  const filterOptions = document.querySelectorAll(".dropdown-menu p[role='menuitem']");
  filterOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Get the selected filter option text
      const selectedFilter = option.innerText;
      
      // Filter todos based on their category and completed property
      const filteredTodos = todos.filter((todo) => {
        if (selectedFilter === "Business" && todo.category.toLowerCase() === "business") {
          return true;
        } else if (selectedFilter === "Personal" && todo.category.toLowerCase() === "personal") {
          return true;
        } else if (selectedFilter === "Completed" && todo.completed) {
          return true;
        } else if (selectedFilter === "Not Completed" && !todo.completed) {
          return true;
        } else if (selectedFilter === "All") {
          return true; 
        }
        return false;
      });
      
      // Update the displayed todos with the filtered list
      displayFilteredTodos(filteredTodos);
    });
  });
  
  
  // Function to display filtered patients
  function displayFilteredTodos(filteredTodos) {
    const todoListDiv = document.querySelector(".todo-list-div");
    todoListDiv.innerHTML = "";
  
    // Loop through the filtered patients and display them
    filteredTodos.forEach((todoOne) => {
        var todoElement = document.createElement("div");
        todoElement.classList.add("row-");
        todoElement.innerHTML =`   
        <input type="checkbox" class="check">
        <div class="description">
          <div >
              <input id="todo-description" value = "${todoOne.description}" readonly><br>
             <i class="fa-regular fa-calendar-check"></i><input class="date" type="date" value="${todoOne.dueDate}" readonly>
          </div>
        </div>
        <div class="actions">
          <i class="fa-regular fa-pen-to-square"></i>
          <i class="fa-solid fa-trash-can"></i>
        </div>`
        
        var checkbox = todoElement.querySelector(".check");
        checkbox.checked = todoOne.completed;
  
        if (todoOne.category === "business"){
          console.log("blou");
          checkbox.classList.add("businessCheck");
  
        }else{
          console.log("no");
          checkbox.classList.add("PersonalCheck");
        }
    
        todoListDiv.appendChild(todoElement);
        console.log(todoListDiv)
    
    
        //delete btn actions
        var deleteBtn = todoElement.querySelector(".fa-trash-can");
        deleteBtn.addEventListener("click", (e) => {
          todos = todos.filter((todo) => todo != todoOne);
          localStorage.setItem("todos", JSON.stringify(todos));
          displayTodos();
        })
    
        // checkbox event
        checkbox.addEventListener("change", (e) =>{
          console.log("checked")
          todoOne.completed = checkbox.checked;
          localStorage.setItem("todos", JSON.stringify(todos));
        })
    
        //  Edit button
        var editBtn = todoElement.querySelector(".fa-regular.fa-pen-to-square");
        editBtn.addEventListener("click", () => {
          console.log(editBtn);
          var inputDescription = todoElement.querySelector("#todo-description");
          inputDescription.removeAttribute("readonly");
          inputDescription.focus();
          inputDescription.addEventListener("blur", () => {
              todoOne.description = inputDescription.value; // E.TARGERT.VALUE
              inputDescription.setAttribute("readonly", true);
            localStorage.setItem("todos", JSON.stringify(todos));
          })
          var inputDueDate = todoElement.querySelector(".date");
          inputDueDate.removeAttribute("readonly");
          inputDueDate.addEventListener("blur", () => {
              todoOne.description = inputDueDate.value; // E.TARGERT.VALUE
              inputDueDate.setAttribute("readonly", true);
            localStorage.setItem("todos", JSON.stringify(todos));
          })
        });
    })
  
  
  }
  
