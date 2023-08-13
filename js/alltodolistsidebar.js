function allTodoListOpenClick() {
    const isAllToDoListSidebarOpen = "isAllToDoListSidebarOpen";

    const mainContainer = document.querySelector(".main-container");
    const allTodoListSideBar = document.querySelector(".all-todolist-sidebar");

    allTodoListSideBar.classList.toggle(isAllToDoListSidebarOpen)

    if(allTodoListSideBar.classList.contains(isAllToDoListSidebarOpen)) {
        mainContainer.style.transform = `translateX(${100}px)`; 
    } else {
        mainContainer.style.transform = "none";
    }

    TodoListService.getInstance().allUpdateTodoList();
}
