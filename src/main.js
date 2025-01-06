const toDoValue = document.querySelector("#todo_value");
const whereToDoAdds = document.querySelector("#todo_add");
const addingButton = document.querySelector("#adding_button");

const validateInput = () => {
    if (toDoValue.value === "") {
        toDoValue.placeholder = "Task is required!";
        toDoValue.classList.add("error");
        return false;
    }
    toDoValue.classList.remove("error");
    return true;
};

const createToDoElement = (toDoValue) => {
    const toDoContent = document.createElement("section");
    toDoContent.classList.add("todo_and_delete_icon");

    toDoContent.innerHTML = `
        <section class="todos_list_section">
            <button class="add_button complete_button">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <p class="to_do_tittle">${toDoValue}</p>
        </section>
        <i class="fa-solid fa-x delete-icon x_icon"></i>
    `;

    return toDoContent;
};

const addDeleteListener = (toDoContent) => {
    const deleteIcon = toDoContent.querySelector(".delete-icon");
    deleteIcon.addEventListener("click", () => {
        toDoContent.remove();
    });
};

const completingToDo = (toDoContent) => {
    const completingButton = toDoContent.querySelector(".complete_button");
    completingButton.addEventListener("click", () => {
        const toDoTittle = toDoContent.querySelector(".to_do_tittle");
        toDoTittle.classList.toggle("completed");
    });
};

const controlingElements = () => {
    if (!validateInput()) return;

    const toDoContent = createToDoElement(toDoValue.value);
    addDeleteListener(toDoContent);
    completingToDo(toDoContent);

    whereToDoAdds.appendChild(toDoContent);
    toDoValue.value = "";
    toDoValue.placeholder = "Create a new todo...";
};

addingButton.addEventListener("click", controlingElements);
toDoValue.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        controlingElements();
    }
});

const allElements = document.querySelector("#all");
const activeElements = document.querySelector("#active");
const completedElements = document.querySelector("#completed");

allElements.addEventListener("click", () => {
    activeElements.classList.remove("active");
    completedElements.classList.remove("active");
    allElements.classList.add("active");

    const toDoLists = whereToDoAdds.querySelectorAll(".todo_and_delete_icon");

    toDoLists.forEach((todo) => {
        todo.classList.remove("none");
    });
});

activeElements.addEventListener("click", () => {
    allElements.classList.remove("active");
    completedElements.classList.remove("active");
    activeElements.classList.add("active");

    const toDoActiveElements = whereToDoAdds.querySelectorAll(".to_do_tittle");
    const toDoLists = whereToDoAdds.querySelectorAll(".todo_and_delete_icon");
    toDoLists.forEach((todo, index) => {
        const todoTittle = toDoActiveElements[index];

        todo.classList.remove("none");
        if (todoTittle.classList.contains("completed")) {
            todo.classList.add("none");
        }
    });
});

completedElements.addEventListener("click", () => {
    allElements.classList.remove("active");
    activeElements.classList.remove("active");
    completedElements.classList.add("active");

    const toDoLists = whereToDoAdds.querySelectorAll(".todo_and_delete_icon");

    toDoLists.forEach((todo, index) => {
        const todoTittle =
            whereToDoAdds.querySelectorAll(".to_do_tittle")[index];
        todo.classList.remove("none");

        if (!todoTittle.classList.contains("completed")) {
            todo.classList.add("none");
        }
    });
});

// clearing all completed works

const clearAll = document.querySelector("#clear_all");
clearAll.addEventListener("click", () => {
    const toDolisting = whereToDoAdds.querySelectorAll(".todo_and_delete_icon");

    toDolisting.forEach((todo) => {
        const todoTittle = whereToDoAdds.querySelector(".to_do_tittle");

        if (todoTittle.classList.contains("completed")) {
            todo.remove();
        }
    });
});
