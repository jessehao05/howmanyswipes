const params = new URLSearchParams(window.location.search);
const resultsDiv = document.getElementById('result-text');

// getting data from html form
let swipes = params.get('swipes');
const money = params.get('money');
const startDate = params.get('startDate');
const endDate = params.get('endDate');

const fallBreak = params.get('fallBreak');
const turkey = params.get('turkey');
const springBreak = params.get('springBreak');
const fMarket = params.get('fMarket')

const startDateArray = startDate.split("-");
const year = parseInt(startDateArray[0]);
const firstMonth = parseInt(startDateArray[1]);
const firstDay = parseInt(startDateArray[2]);

const endDateArray = endDate.split("-");
const lastMonth = parseInt(endDateArray[1]);
const lastDay = parseInt(endDateArray[2]);

// ----- calculating swipes -----
// array for number of days each month
const daysInMonth = [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

calcDays = () => {
    if (firstMonth === lastMonth) {
        return lastDay - firstDay;
    } else if (firstMonth + 1 === lastMonth) {
        return daysInMonth[firstMonth - 1] - firstDay + lastDay;
    } else {
        let days = daysInMonth[firstMonth - 1] - firstDay

        for (let i = firstMonth; i < lastMonth; ++i) {
            days += daysInMonth[i];
        }
        days += lastDay;

        return days
    };
}

breakDays = () => {
    if (typeof fallBreak === 'string') {
        total_days -= 3;
    } 
    if (typeof turkey === 'string') {
        total_days -= 8; 
    } 
    if (typeof springBreak === 'string') {
        total_days -= 8;
    }
}

farmersMarket = () => {
    return swipes - fMarket;
}

// ----- meal money calculations -----
const pricePerMeal = 17;
const numMeals = money / 17;
const change = money % 17;


// ----- results -----
displayResults = () => {
    resultsDiv.innerHTML = `
        <p>Meals per day: <strong>${(swipes / total_days).toFixed(2)}</strong></p><br>
        <p>Starting date: ${startDate}</p>
        <p>Ending date: ${endDate}</p>
        <p>Days left: <strong>${total_days}</strong></p>
        <p>Meal swipes: <strong>${swipes}</strong></p>
        <br>
        <p>Number of meal money meals: <strong>${numMeals}</strong></p>
        <p>Remaining meal money: <strong>${change}</strong></p>
        `
}
    

let total_days = calcDays();
breakDays();
swipes = farmersMarket();
displayResults();