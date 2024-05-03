const inputBox = document.getElementById("input-box");
const inputBtn = document.getElementById("input-btn");
const form = document.querySelector("form");

// Load saved data from localStorage when the page loads
window.addEventListener("DOMContentLoaded", () => {
    const savedData = localStorage.getItem("todoItems");
    if (savedData) {
        document.querySelector(".data").innerHTML = savedData;
        // Add event listeners for edit, delete, and check after loading saved data
        addEventListeners();
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const li = document.createElement("li");
    const firstDiv = document.createElement("div");
    const secondDiv = document.createElement("div");
    firstDiv.classList.add("content");
    secondDiv.classList.add("edit_del");

    const firstDivNestedfirstDiv = document.createElement("div");
    const firstDivNestedSecondDiv = document.createElement("input");
    firstDivNestedSecondDiv.setAttribute("type", "text");
    firstDivNestedSecondDiv.setAttribute("value", inputBox.value);
    firstDivNestedSecondDiv.readOnly = true; // Add readOnly initially

    firstDivNestedfirstDiv.classList.add("check");

    const secondDivNestedfirstDiv = document.createElement("div");
    secondDivNestedfirstDiv.textContent = "✏️"; // Edit button

    const secondDivNestedSecondDiv = document.createElement("div");
    secondDivNestedSecondDiv.textContent = "❌";

    firstDiv.appendChild(firstDivNestedfirstDiv);
    firstDiv.appendChild(firstDivNestedSecondDiv);

    secondDiv.appendChild(secondDivNestedfirstDiv);
    secondDiv.appendChild(secondDivNestedSecondDiv);

    li.appendChild(firstDiv);
    li.appendChild(secondDiv);

    secondDivNestedSecondDiv.addEventListener("click", () => {
        li.remove();
        saveToLocalStorage(); // Save data after removing an item
    });

    document.querySelector(".data").appendChild(li);

    addEventListeners(); // Add event listeners for edit and check after adding a new item

    saveToLocalStorage(); // Save data after adding a new item
});

// Function to add event listeners for edit, delete, and check
function addEventListeners() {
    const editButtons = document.querySelectorAll(".edit_del > div:first-child");
    const checkButtons = document.querySelectorAll(".check");
    const deleteButtons = document.querySelectorAll(".edit_del > div:last-child");

    editButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const inputField = button.parentElement.parentElement.querySelector("input[type='text']");
            inputField.readOnly = !inputField.readOnly;
            inputField.focus();
            inputField.classList.toggle("borderVisible")
        });
    });

    checkButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.toggle("checked");
            const inputField = button.parentElement.querySelector("input[type='text']");
            inputField.classList.toggle("checkedVal");
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const listItem = button.parentElement.parentElement;
            listItem.remove();
            saveToLocalStorage(); // Save data after removing an item
        });
    });
}

// Function to save input data to localStorage
function saveToLocalStorage() {
    const todoItems = document.querySelector(".data").innerHTML;
    localStorage.setItem("todoItems", todoItems);
}
