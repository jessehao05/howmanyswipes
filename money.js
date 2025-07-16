const form = document.querySelector(".meal-money-form");

// form elements
let money, days, dollarsPerMeal;
let startDate, endDate, fallBreak, turkeyBreak, springBreak;

// form elements - dates
let startDateArray, year, firstMonth, firstDay, endDateArray, lastMonth, lastDay;

function getInputs() {
    money = parseFloat(document.querySelector("#money-remaining").value);
    dollarsPerMeal = parseFloat(document.querySelector('#price-per-meal').value);
    // startDate = document.querySelector("#start-date").value;
    // endDate = document.querySelector("#end-date").value;

    // fallBreak = document.querySelector("#fall-break").checked;
    // turkeyBreak = document.querySelector("#turkey-break").checked;
    // springBreak = document.querySelector("#spring-break").checked;


    // startDateArray = startDate.split("-");
    // year = parseInt(startDateArray[0]);
    // firstMonth = parseInt(startDateArray[1]);
    // firstDay = parseInt(startDateArray[2]);

    // endDateArray = endDate.split("-");
    // lastMonth = parseInt(endDateArray[1]);
    // lastDay = parseInt(endDateArray[2]);
}

function calculateDays() {
    const daysInMonth = [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    
    if (firstMonth === lastMonth) {
        days = lastDay - firstDay;
    } else if (firstMonth + 1 === lastMonth) {
        days = daysInMonth[firstMonth - 1] - firstDay + lastDay;
    } else {
        days = daysInMonth[firstMonth - 1] - firstDay

        for (let i = firstMonth; i < lastMonth; ++i) {
            days += daysInMonth[i];
        }
        days += lastDay;
    };
}

function removeBreakDays() {
    if (fallBreak) {
        days -= 3;
    } 
    if (turkeyBreak) {
        days -= 8; 
    } 
    if (springBreak) {
        days -= 8;
    }
}


function displayResults() {
    const results = document.querySelector('.results-text');
    results.classList.add('active');
    results.innerHTML = `
        Meal money left: <strong>$${money}</strong><br>
        Number of meals: <strong>${Math.round(money / dollarsPerMeal)}</strong><br>
        Remaining money: <strong>$${money % dollarsPerMeal}</strong>
    `;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getInputs();
    calculateDays();
    removeBreakDays();
    displayResults();
})