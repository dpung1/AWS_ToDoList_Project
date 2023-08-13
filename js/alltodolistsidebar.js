const allTodoListOpenClick = () => {
    const isAllToDoListSidebarOpen = document.querySelector(".all-todolist-btn");

    const mainContainer = document.querySelector(".main-container");
    const todoListSideBar = document.querySelector(".all-todolist-sidebar");

    todoListSideBar.classList.toggle(isAllToDoListSidebarOpen)

    mainContainer.style.transform = `translateX(${100}px)`; 


    TodoListService.getInstance().allUpdateTodoList();
}