const params = new URLSearchParams(window.location.search);
const resultsDiv = document.getElementById('results');

// getting data from html form
let swipes = params.get('swipes');
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


// array for number of days each month
const daysInMonth = [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

// console testing
console.log(`starting date: ${startDate}`);
console.log(`starting date type: ${typeof startDate}`);
console.log(`year: ${year}`);
console.log(`start month: ${firstMonth}`);
console.log(`start day: ${firstDay}`);
console.log(`ending date: ${endDate}`);
console.log(`fall break type: ${typeof fallBreak}`);
console.log(`spring break: ${springBreak}`);
console.log(`spring break type: ${typeof springBreak}`);
const str = 'str';
console.log(typeof str === 'string')

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

displayResults = () => {
    resultsDiv.innerHTML = `
        <p>Meals per day: ${(swipes / total_days).toFixed(2)}</p><br>
        <p>Days left: ${total_days}</p>
        <p>Meal swipes: ${swipes}</p>
        <p>Starting date: ${startDate}</p>
        <p>Ending date: ${endDate}</p>
        `
}
    

let total_days = calcDays();
breakDays();
swipes = farmersMarket();
displayResults();