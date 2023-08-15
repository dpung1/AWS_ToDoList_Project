// 할 일을 추가하는 클릭 이벤트
const addTodoButtonOnClickHandle = () => {
    generateTodoObj();
}

// 할 일을 추가하는 클릭 이벤트를 Enter로 실행 이벤트
const addTodoOnKeyUpHandle = (event) => {
    if(event.keyCode === 13) {
        generateTodoObj();
    }
}

// 체크박스 변경 이벤트
const checkedOnChangeHandle = (target) => {
    TodoListService.getInstance().setCompleStatus(target.value, target.checked);
    TodoListService.getInstance().allUpdateTodoList();
    TodoListService.getInstance().updateTodoList();
}

// 수정 버튼 클릭 이벤트
const modifyTodoOnClickHandle = (target) => {
    openModal();
    modifyModal(TodoListService.getInstance().getTodoById(target.value));
}

// 삭제 버튼 클릭 이벤트
const deleteTodoOnClickHandle = (target) => {
    TodoListService.getInstance().removeTodo(target.value);
}

// 할 일 추가 이벤트 시 ToDo 객체 생성
const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-sidebar-items .text-input").value
    // 빈칸 및 공백 리스트 추가 X
    if(!todoContent.trim()) { 
        return;
    }
    // ToDo에 들어가는 데이터
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

// ToDo리스트 관리 클래스(싱글톤)
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

    // 날짜별 UpDateToDoList
    updateTodoList() {
        const todoListMainConteiner = document.querySelector(".todolist-sidebar-main-container");

        todoListMainConteiner.innerHTML = this.todoList.filter(todo => todo.createDate === DateUtils.toStringByFormatting(Calendar.getInstance().selectedDate)).map(todo => {
                return`
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"></label>
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

    // 전체 UpDateToDoList 및 Filter 용
    allUpdateTodoList(filteredList = null) {
        const todoListMainConteiner = document.querySelector(".all-todolist-container");

        const allTodoListToShow = filteredList || this.todoList;

        todoListMainConteiner.innerHTML = allTodoListToShow.map(todo => {
                return`
                <li class="todolist-items">
                    <div class="item-left">
                        <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                        <label for="complet-chkbox${todo.id}"></label>
                    </div>
                    <div class="itme-center">
                        <pre class="todolist-contant">${todo.todoContent}</pre>
                    </div>
                    <div class="item-right">
                        <p class="all-todolist-date">${todo.createDate}</p>
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

