// 전체 리스트 오픈 클릭 이벤트
function allTodoListOpenClick() {

    const isAllToDoListSidebarOpen = "isAllToDoListSidebarOpen";
    const allTodoListSideBar = document.querySelector(".all-todolist-sidebar");

    allTodoListSideBar.classList.toggle(isAllToDoListSidebarOpen);

    TodoListService.getInstance().allUpdateTodoList();
}


// 드롭박스 옵션 값으로 필터링 이벤트
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
    // 선택된 드롭박스 옵션으로 ToDo 필터링 업데이트
    filterTodoList(currentFilterStatus);
}

// 결과를 필터링하여 업데이트
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
