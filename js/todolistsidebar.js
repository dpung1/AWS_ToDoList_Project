const addTodoButtonOnClickHandle = () => {
    generateTodoObj();
}

const addTodoOnKeyUpHandle = (event) => {
    if(event.keyCode === 13) {
        generateTodoObj();
    }
}

const checkedOnChangeHandle = (target) => {

    TodoListService.getInstance().setCompleStatus(target.value, target.checked)
    TodoListService.getInstance().allUpdateTodoList();
    TodoListService.getInstance().updateTodoList();

}

const modifyTodoOnClickHandle = (target) => {
    openModal();
    modifyModal(TodoListService.getInstance().getTodoById(target.value));
}

const deleteTodoOnClickHandle = (target) => {
    TodoListService.getInstance().removeTodo(target.value);
}

const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-sidebar-items .text-input").value
    
    if(!todoContent.trim()) { // 빈칸 및 공백 리스트 추가 X
        return;
    }

    const todoObj = {
        id: 0, 
        todoContent: todoContent,
        completStatus: false,
        createDate: DateUtils.toStringByFormatting(Calendar.getInstance().selectedDate)
    };
    document.querySelector(".todolist-sidebar-items .text-input").value = ""
    
    TodoListService.getInstance().addTodo(todoObj);

    closeModal();
}

class TodoListService {
    static #instance = null;
    
    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new TodoListService();
        }
        
        return this.#instance;
    }
    
    todoList = new Array();
    todoIndex = 1;
    
    constructor() {
        this.loadTodoList();
    }
    
    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        this.todoIndex = !!this.todoList[this.todoList.length -1] ?.id ? this.todoList[this.todoList.length -1].id + 1 : 1;
    }
    
    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }
    
    getTodoById(id) {
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }
    
    addTodo(todoObj) {
        const todo = {
            ...todoObj,
            id : this.todoIndex
        }
        
        this.todoList.push(todo);
        
        this.saveLocalStorage();
        
        this.updateTodoList();

        this.allUpdateTodoList();
        
        this.todoIndex++;
    }
    
    setCompleStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) {
                this.todoList[index].completStatus = status;
            }
        });
        
        this.saveLocalStorage();
    }
    
    setTodo(todoObj) {
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }

        this.saveLocalStorage();
        this.updateTodoList();
        this.allUpdateTodoList();
    }

    removeTodo(id) {
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
        this.allUpdateTodoList();
    }

    updateTodoList() {
        const todoListMainConteiner = document.querySelector(".todolist-sidebar-main-container");

        todoListMainConteiner.innerHTML = this.todoList.filter(todo => todo.createDate === DateUtils.toStringByFormatting(Calendar.getInstance().selectedDate)).map(todo => {
                return`
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}}" class="complet-chkboxs" ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"}></label>
                    </div>
                    <div class="itme-center">
                        <pre class="todolist-contant">${todo.todoContent}</pre>
                    </div>
                    <div class="item-right">
                        <div class="todolist-item-buttons">
                            <button class="btn btn-edit" value="${todo.id}" onclick="modifyTodoOnClickHandle(this);"><i class="fa-solid fa-pen-to-square fa-2xl"></i></button>
                            <button class="btn btn-remvoe" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);"><i class="fa-solid fa-trash-can fa-2xl"></i></button>
                        </div>
                    </div>
                </li> 
                `;
        }).join("");
    }

    allUpdateTodoList(filteredList = null) {
        const todoListMainConteiner = document.querySelector(".all-todolist-container");

        const allTodoListToShow = filteredList || this.todoList;

        todoListMainConteiner.innerHTML = allTodoListToShow.map(todo => {
                return`
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}}" class="complet-chkboxs" ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"}></label>
                    </div>
                    <div class="itme-center">
                        <pre class="todolist-contant">${todo.todoContent}</pre>
                    </div>
                    <div class="item-right">
                        <p class="todolist-date">${todo.createDate}</p>
                        <div class="todolist-item-buttons">
                            <button class="btn btn-edit" value="${todo.id}" onclick="modifyTodoOnClickHandle(this);"><i class="fa-solid fa-pen-to-square fa-2xl"></i></button>
                            <button class="btn btn-remvoe" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);"><i class="fa-solid fa-trash-can fa-2xl"></i></button>
                        </div>
                    </div>
                </li> 
                `;
        }).join("");
    }
}

const statusDropDown = document.querySelector("#status-dropdown");

const statusDropDownOnChangeHandle = () => {
    const selectedStatus = statusDropDown.options[statusDropDown.selectedIndex].value;

    let statusValue;

    switch(selectedStatus) {
        case "전체":
            statusValue = null;
            break;
        case "진행중":
            statusValue = false;
            break;
        case "완료":
            statusValue = true;
            break;
        default :
            statusValue = null;
            break;
    }

    currentFilterStatus = statusValue;
    filterTodoList(currentFilterStatus);
}

function filterTodoList(completStatus) {
    let tempArray = [];

    if(completStatus === null) {
        tempArray = TodoListService.getInstance().todoList;
    } else {
        tempArray = TodoListService.getInstance().todoList.filter((todo) => {
            return todo.completStatus === completStatus;
        });
    }

    TodoListService.getInstance().allUpdateTodoList(tempArray);
}