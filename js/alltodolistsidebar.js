const statusDropDown = document.querySelector("#status-dropdown");

const tatusDropDownOnChangeHandle = () => {
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

    currnetFilterStatus = statusValue;
    filterTodolist(currnetFilterStatus);
}

function filterTodolist(completStatus) {
    let tempArray = [];

    if(completStatus === null) {
        tempArray = TodoListService.getInstance().todolst;
    } else {
        tempArray = TodoListService.getInstance().todolist.filter((todo) => {
            return todo.completStatus === completStatus;
        });
    }

    updateAllTodoList(tempArray);
}

function updateAllTodoList(filteredList = null) {
    const allTodoListToShow = filteredList || TodoListService.getInstance().todoList;
    const allTodoListContainer = document.querySelector(".all-todolist-container")

    allTodoListContainer.innerHTML = allTodoListToShow.map(todo => {
        return`
        <li class="todolist-items">
            <div class="item-left">
                <input type="checkbox" id="complet-chkboxㅌ${todo.id}}" class="complet-chkboxs" ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                <label for="complet-chkbox${todo.id}"}></label>
            </div>
            <div class="itme-center">
                <pre class="todolist-contant">${todo.todoContent}</pre>
            </div>
            <div class="item-right">
                <div class="todolist-item-buttons">
                    <button class="btn btn-edit" value="${todo.id}" onclick="modifyTodoOnClickHandle(this);">수정</button>
                    <button class="btn btn-remvoe" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);">삭제</button>
                </div>
            </div>
        </li>
        `
    }).join("");

}

updateAllTodoList();