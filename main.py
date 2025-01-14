month_list = ["january", "feburary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]

month_numbers = {
    "january": 1,
    "february": 2,
    "march": 3,
    "april": 4,
    "may": 5,
    "june": 6,
    "july": 7,
    "august": 8,
    "september": 9,
    "october": 10,
    "november": 11,
    "december": 12
}

days_list = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] # days in each month

def get_meal_swipes():
    return int(input("Meal swipes remaining: "))

def get_date(): 
    month = input("Enter month: ")
    while (month.lower() not in month_list):
        print("Invalid month.")
        month = input("Enter month: ")

    day = input("Enter day: ")
    while (not day.isdigit()):
        print("Invalid day. ")
        day = input("Enter day: ")

    # add handling of numbers greater than the days in a certain month (ex. january 32)    
    return month, int(day)

def calc_days(month, day, final_month, final_day):
    # convert months into numbers to use as indexes later
    month_num = month_numbers[month.lower()]
    final_month_num = month_numbers[final_month.lower()]

    # start by setting days equal to the number of days left in the current month
    days = days_list[month_num - 1] - day

    for i in range(month_num, final_month_num - 1):
        days += days_list[i]

    days += final_day
    return days

def break_days(days, month):
    if (month_numbers[month.lower()] <= 5):
        if (input("Remove (8) Spring Break days (yes/no)? ").lower() == 'yes'):
            days -= 8
    else:
        if (input("Remove (3) Fall Break days (yes/no)? ").lower()):
            days -= 3
        if (input("Remove (8) Thanksgiving Break days (yes/no)? ").lower()):
            days -= 8
    return days

def farmers_market(meals):
    num = int(input("Estimated swipes to be used on Farmer's Market: "))
    meals -= num
    return meals


def print_results(month, day, final_month, final_day, total_days, meals):
    print('')
    print('Meals per day:', round(meals / total_days, 2))
    print('----------------------------')
    print('Today:', month, day)
    print('Last day:', final_month, final_day)
    print('Days remaning:', total_days)
    print('Meal swipes:', meals)
    print('')
    return

meals = get_meal_swipes()

print("--- Starting Date ---")
month, day = get_date()
print("--- Ending Date ---")
final_month, final_day = get_date()

total_days = calc_days(month, day, final_month, final_day)
total_days = break_days(total_days, month)
meals = farmers_market(meals)

print_results(month, day, final_month, final_day, total_days, meals)