function allTodoListOpenClick() {

    const isAllToDoListSidebarOpen = "isAllToDoListSidebarOpen";
    const allTodoListSideBar = document.querySelector(".all-todolist-sidebar");

    allTodoListSideBar.classList.toggle(isAllToDoListSidebarOpen)

    TodoListService.getInstance().allUpdateTodoList();
}
