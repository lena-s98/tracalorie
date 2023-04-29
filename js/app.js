class CalorieTracker {
	constructor() {
		this._calorieLimit = 2000;
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];
	}

	addMeal(meal) {
		this._meals.push(meal);
		this._totalCalories += meal.calories;
	}

	addWorkout(workout) {
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
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
