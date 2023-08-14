const welcomeGoOnClickHandle = () => {
    Routes.getInstance().routeState = "welcome"
    Routes.getInstance().show();
}

const calendarBody = document.getElementById("calendar-body");
const monthDisplay = document.querySelector(".calendar-month");

let calendarDate = new Date();

class Calendar {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new Calendar();
        }
        return this.#instance;
    }
    selectedDate = null;
}

function showCalendar() {
    const today = new Date();
    const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
    const lastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);
    
    calendarBody.innerHTML = "";
    
    let currentDate = new Date(firstDay);
    let weekRow = document.createElement("tr");
    
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement("td");
        weekRow.appendChild(emptyCell);
    }
    
    while (currentDate <= lastDay) {
        const cell = document.createElement("td");
        const content = document.createElement("div");
        const contentText = document.createElement("span");
        contentText.textContent = currentDate.getDate();
        contentText.addEventListener("click", () => {
            const selectedDate = new Date(`${calendarDate.getFullYear()}/${calendarDate.getMonth() + 1}/${contentText.textContent}`);
            handleDateClick(selectedDate);
        });

        if(
            currentDate.getDate() === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        ) {
            contentText.classList.add("today")
        }

        content.appendChild(contentText);
        cell.appendChild(content);
        weekRow.appendChild(cell);
        
        if (currentDate.getDay() === 6 || currentDate.getTime() === lastDay.getTime()) {
            calendarBody.appendChild(weekRow);
            weekRow = document.createElement("tr");
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    monthDisplay.textContent = `${calendarDate.getFullYear()}년 ${calendarDate.getMonth() + 1}월`;
}

function handleDateClick(selectedDate) {
    const isToDoListSidebarOpen = "isToDoListSidebarOpen"; 

    const todoListSideBar = document.querySelector(".todolist-sidebar"); 
    const clickedDateDisplay = document.querySelector(".todolist-sidebar-date");
    const todoInput = document.querySelector(".todolist-sidebar-items .text-input");
    
    todoInput.value = ""; // 사이드바 나올때마다 input창 초기화
    
    if (todoListSideBar.classList.contains(isToDoListSidebarOpen) && Calendar.getInstance().selectedDate - selectedDate === 0) {

        todoListSideBar.classList.remove(isToDoListSidebarOpen)

    } else {

        todoListSideBar.classList.add(isToDoListSidebarOpen)
        
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth() + 1;
        
        clickedDateDisplay.textContent = `${year}년 ${month}월 ${selectedDate.getDate()}일`;
        Calendar.getInstance().selectedDate = selectedDate;
    }
    
    TodoListService.getInstance().updateTodoList();
}
// 이전 달 이동
function beforeMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate());
    showCalendar();
}

document.getElementById("beforebtn").addEventListener("click", beforeMonth);
// 다음 달 이동
function nextMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate());
    showCalendar();
}

document.getElementById("nextbtn").addEventListener("click", nextMonth);

showCalendar();