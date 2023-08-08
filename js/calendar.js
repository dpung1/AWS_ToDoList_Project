const calendarBody = document.getElementById("calendar-body");
const monthDisplay = document.querySelector(".calendar-month");

let calendarDate = new Date();

function showCalendar() {
    const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1);
    const lastDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0);

    calendarBody.innerHTML = "";

    let currentDate = new Date(firstDay);
    let weekRow = document.createElement("tr");

    // 공백 셀 추가
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyCell = document.createElement("td");
        weekRow.appendChild(emptyCell);
    }

    while (currentDate <= lastDay) {
        const cell = document.createElement("td");
        cell.textContent = currentDate.getDate();
        cell.addEventListener("click", () => {
            handleDateClick(currentDate.getDate());
        });
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
}

function beforeMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate());
    showCalendar();
}

function nextMonth() {
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate());
    showCalendar();
}

showCalendar();
