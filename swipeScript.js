
        const form = document.querySelector(".meal-swipes-form");
        
        // form elements + farmerSwipes
        let meals, startDate, endDate, fallBreak, turkeyBreak, springBreak, farmers, farmerSwipes;

        // form elements - dates
        let startDateArray, year, firstMonth, firstDay, endDateArray, lastMonth, lastDay;

        let days;


        function getInputs() {
            meals = parseInt(document.querySelector("#meals-remaining").value);
            startDate = document.querySelector("#start-date").value;
            endDate = document.querySelector("#end-date").value;

            fallBreak = document.querySelector("#fall-break").checked;
            turkeyBreak = document.querySelector("#turkey-break").checked;
            springBreak = document.querySelector("#spring-break").checked;
            farmers = document.querySelector("#farmers").value;

            farmerSwipes = farmers === '' ? 0 : parseInt(farmers);

            startDateArray = startDate.split("-");
            year = parseInt(startDateArray[0]);
            firstMonth = parseInt(startDateArray[1]);
            firstDay = parseInt(startDateArray[2]);

            endDateArray = endDate.split("-");
            lastMonth = parseInt(endDateArray[1]);
            lastDay = parseInt(endDateArray[2]);
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

        function removeFarmers() {
            meals -= farmerSwipes;
        }

        function displayResults() {
            console.log(meals);
            const results = document.querySelector('.results-text');
            results.classList.add('active');
            results.innerHTML = `
                Meals per day: <strong>${(meals / days).toFixed(2)}</strong><br>
                Meals remaining: <strong>${meals}</strong><br>
                Days remaining: <strong>${days}</strong>
            `;
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            getInputs();
            calculateDays();
            removeBreakDays();
            removeFarmers();
            displayResults();
        })