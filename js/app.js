class CalorieTracker {
	constructor() {
		this._calorieLimit = 1500;
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];

		this._displayTotalCalories();
		this._displayCaloriesLimit();
	}

	// Public Methods/API //

	addMeal(meal) {
		this._meals.push(meal);
		this._totalCalories += meal.calories;
		this._render();
	}

	addWorkout(workout) {
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
		this._render();
	}

	// Private Methods //

	_displayTotalCalories() {
		const _totalCaloriesEl = document.querySelector("#calories-total");
		_totalCaloriesEl.innerHTML = this._totalCalories;
	}

	_displayCaloriesLimit() {
		const _calorieLimitEl = document.querySelector("#calories-limit");
		_calorieLimitEl.innerHTML = this._calorieLimit;
	}

	_render() {
		this._displayTotalCalories();
	}
}

const tracker = new CalorieTracker();

class Meal {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2);
		this.name = name;
		this.calories = calories;
	}
}

class Workout {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2);
		this.name = name;
		this.calories = calories;
	}
}

const breakfast = new Meal("Breakfast", 400);
tracker.addMeal(breakfast);

const run = new Workout("Jogging", 200);
tracker.addWorkout(run);
