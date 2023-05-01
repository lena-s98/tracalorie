class CalorieTracker {
	constructor() {
		this._calorieLimit = 1500;
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];

		this._displayCaloriesLimit();
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
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

	_displayCaloriesLimit() {
		const calorieLimitEl = document.querySelector("#calories-limit");
		calorieLimitEl.innerHTML = this._calorieLimit;
	}

	_displayCaloriesTotal() {
		const totalCaloriesEl = document.querySelector("#calories-total");
		totalCaloriesEl.innerHTML = this._totalCalories;
	}

	_displayCaloriesConsumed() {
		const caloriesConsumedEl = document.querySelector("#calories-consumed");

		const consumed = this._meals.reduce((total, meal) => {
			return total + meal.calories;
		}, 0);

		caloriesConsumedEl.innerHTML = consumed;
	}

	_displayCaloriesBurned() {
		const caloriesBurnedEl = document.querySelector("#calories-burned");

		const burned = this._workouts.reduce((total, workout) => {
			return total + workout.calories;
		}, 0);

		caloriesBurnedEl.innerHTML = burned;
	}

	_displayCaloriesRemaining() {
		const caloriesRemainingEl = document.querySelector("#calories-remaining");

		const remaining = this._calorieLimit - this._totalCalories;

		caloriesRemainingEl.innerHTML = remaining;
	}

	_render() {
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
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
const lunch = new Meal("Lunch", 500);
tracker.addMeal(breakfast);
tracker.addMeal(lunch);

const run = new Workout("Jogging", 200);
tracker.addWorkout(run);
