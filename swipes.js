// state variables
let swipes = "";
let startDate = "";
let endDate = "";
let fallBreak = false;
let thanksgiving = false;
let springBreak = false;
let farmers = "";
let submitted = false;
let finalMeals = 0;
let finalDays = 0;

// helper functions
const calculateDays = (firstMonth, lastMonth, firstDay, lastDay, year) => {
    const daysInMonth = [31, (year % 4 === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let days;
    
    // determine if dates are in the same month, one month apart, or other
    if (firstMonth === lastMonth) {
        days = lastDay - firstDay;
    } else if (firstMonth + 1 === lastMonth) {
        days = daysInMonth[firstMonth - 1] - firstDay + lastDay;
    } else {
        days = daysInMonth[firstMonth - 1] - firstDay; // days = the remaining amount of days in current month

        for (let i = firstMonth; i < lastMonth - 1; ++i) {
            days += daysInMonth[i];
        }
        days += lastDay;
    }
    return days;
};

const removeBreakDays = (fall, turkey, spring, days) => {
    if (fall) {
        days -= 3;
    } 
    if (turkey) {
        days -= 8; 
    } 
    if (spring) {
        days -= 8;
    }
    return days;
};

const removeFarmers = (meals, farmerSwipes) => {
    meals -= farmerSwipes;
    return meals;
};

// results component equivalent
const renderResults = (meals, days) => {
    const mealsPerDay = days > 0 ? (meals / days).toFixed(2) : 0;
    
    return `
        <div class="results-container">
            <div class="results-title">Results</div>
            <div class="result-item">
                <span class="result-label">Total Days:</span>
                <span class="result-value">${days}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Remaining Meals:</span>
                <span class="result-value">${meals}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Meals Per Day:</span>
                <span class="result-value">${mealsPerDay}</span>
            </div>
        </div>
    `;
};

// event handlers
const handleSubmit = (e) => {
    e.preventDefault();
    
    let meals = parseInt(swipes);
    const farmerSwipes = farmers === '' ? 0 : parseInt(farmers);
    const startDateArray = startDate.split("-");
    const year = parseInt(startDateArray[0]);
    const firstMonth = parseInt(startDateArray[1]);
    const firstDay = parseInt(startDateArray[2]);

    const endDateArray = endDate.split("-");
    const lastMonth = parseInt(endDateArray[1]);
    const lastDay = parseInt(endDateArray[2]);

    let days = calculateDays(firstMonth, lastMonth, firstDay, lastDay, year);
    days = removeBreakDays(fallBreak, thanksgiving, springBreak, days);
    meals = removeFarmers(meals, farmerSwipes);

    finalDays = days;
    finalMeals = meals;
    submitted = true;
    
    // show results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = renderResults(finalMeals, finalDays);
    resultsContainer.classList.remove('hidden');
};

const handleReset = () => {
    console.log('reset');
    
    // reset form values
    document.getElementById('swipes').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('fallBreak').checked = false;
    document.getElementById('thanksgiving').checked = false;
    document.getElementById('springBreak').checked = false;
    document.getElementById('farmers').value = '';
    
    // reset state variables
    swipes = '';
    startDate = '';
    endDate = '';
    fallBreak = false;
    thanksgiving = false;
    springBreak = false;
    farmers = '';
    submitted = false;
    
    // hide results
    document.getElementById('results').classList.add('hidden');
};

// initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('swipesForm');
    
    // form submission
    form.addEventListener('submit', handleSubmit);
    
    // reset button
    form.addEventListener('reset', handleReset);
    
    // input change listeners
    document.getElementById('swipes').addEventListener('change', (e) => {
        swipes = e.target.value;
    });
    
    document.getElementById('startDate').addEventListener('change', (e) => {
        startDate = e.target.value;
    });
    
    document.getElementById('endDate').addEventListener('change', (e) => {
        endDate = e.target.value;
    });
    
    document.getElementById('fallBreak').addEventListener('change', (e) => {
        fallBreak = e.target.checked;
    });
    
    document.getElementById('thanksgiving').addEventListener('change', (e) => {
        thanksgiving = e.target.checked;
    });
    
    document.getElementById('springBreak').addEventListener('change', (e) => {
        springBreak = e.target.checked;
    });
    
    document.getElementById('farmers').addEventListener('change', (e) => {
        farmers = e.target.value;
    });
});