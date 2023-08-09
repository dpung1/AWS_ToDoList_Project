const calendarBody = document.getElementById("calendar-body");
const monthDisplay = document.querySelector(".calendar-month");

let calendarDate = new Date();

function showCalendar() {
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
            handleDateClick(currentDate.getDate());
        });
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

function handleDateClick(date) {
    const todoListSideBar = document.querySelector(".todolist-sidebar");
    const mainContainer = document.querySelector(".main-container");
    const isToDoListSidebarOpen = "isToDoListSibebarOpen"; 
    
    const clickedDateDisplay = document.querySelector(".todolist-sidebar-date");
    
    todoListSideBar.classList.toggle(isToDoListSidebarOpen);
    
    if (todoListSideBar.classList.contains(isToDoListSidebarOpen)) {
        mainContainer.style.transform = `translateX(-${150}px)`;
        
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth() + 1;
        
        clickedDateDisplay.textContent = `${year}년 ${month}월 ${date}일`
    } else {
        mainContainer.style.transform = "none";
        clickedDateDisplay.textContent = "";
    }
    
    contentText.addEventListener("click", () => {
        handleDateClick(currentDate.getDate());
    });

}


function beforeMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate());
    showCalendar();
}

function nextMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate());
    showCalendar();
}

document.getElementById("beforebtn").addEventListener("click", beforeMonth);

document.getElementById("nextbtn").addEventListener("click", nextMonth);

showCalendar();
