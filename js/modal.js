// 모달 열기
const openModal = () => {
    const modal = document.querySelector(".modal");

    modal.classList.remove("invisible");
}

// 모달 닫기
const closeModal = () => {
    const modal = document.querySelector(".modal");
    
    modal.classList.add("invisible");
    modal.innerHTML = "";
}

// 수정 모달 실행 코드
const modifyModal = (todo) => {
    const modal = document.querySelector(".modal");

    modal.innerHTML = `
        <div class="modal-container">
            <header class="modal-header">
                <h1 class="modal-title">
                    할 일 수정
                </h1>
            </header>
            <main class="modal-main">
                <p class="modal-message">
                    할 일을 수정해주세요.
                </p>
                <input type="text" class="text-input w-f" value="${todo.todoContent}" onKeypress="modifySumitOnkeyUp(event, ${todo.id});">
            </main>
            <footer class="modal-footer">
                <button class="btn" onclick="modifySumitButtonOnClick(${todo.id});">확인</button>
                <button class="btn" onclick="closeModal();">닫기</button>
            </footer>
        </div>
    `;
}

// 모달 수정 확인 버튼 클릭 이벤트
const modifySumitButtonOnClick = (id) => {
   const newTodoContent = document.querySelector(".modal-main .text-input").value;
   const todo = TodoListService.getInstance().getTodoById(id);

    if(todo.todoContent === newTodoContent || !newTodoContent) {
        return;
    }

    const todoObj = {
        ...todo,
        todoContent : newTodoContent
    }

    TodoListService.getInstance().setTodo(todoObj);
    closeModal();
}

// 모달 수정 확인 버튼 클릭 이벤트를 Enter로 실행 이벤트
const modifySumitOnkeyUp = (event, id) => {
    if(event.keyCode === 13) {
        modifySumitButtonOnClick(id)
    }

}
