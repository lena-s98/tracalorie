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
		this._displayCaloriesProgress();
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
		const progressEl = document.querySelector("#calorie-progress");

		const remaining = this._calorieLimit - this._totalCalories;

		caloriesRemainingEl.innerHTML = remaining;

		if (remaining < 0) {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				"bg-light"
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add(
				"bg-danger"
			);
			progressEl.classList.remove("bg-success");
			progressEl.classList.add("bg-danger");
		} else {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				"bg-danger"
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
			progressEl.classList.remove("bg-danger");
			progressEl.classList.add("bg-success");
		}
	}

	_displayCaloriesProgress() {
		const progressEl = document.querySelector("#calorie-progress");

		const percentage = (this._totalCalories / this._calorieLimit) * 100;

		const width = Math.min(percentage, 100);

		progressEl.style.width = `${width}%`;
	}

	_render() {
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCaloriesProgress();
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

class App {
	constructor() {
		this._tracker = new CalorieTracker();

		document
			.querySelector("#meal-form")
			.addEventListener("submit", this._newItem.bind(this, "meal"));

		document
			.querySelector("#workout-form")
			.addEventListener("submit", this._newItem.bind(this, "workout"));
	}

	_newItem(type, e) {
		e.preventDefault();

		const name = document.querySelector(`#${type}-name`);
		const calories = document.querySelector(`#${type}-calories`);

		// Validate inputs
		if (name.value === "" || calories.value === "") {
			alert("Please fill in all fieds");
			return;
		}

		if (type === "meal") {
			const meal = new Meal(name.value, parseInt(calories.value));
			this._tracker.addMeal(meal);
		} else {
			const workout = new Workout(name.value, parseInt(calories.value));
			this._tracker.addWorkout(workout);
		}

		name.value = "";
		calories.value = "";

		const collapseItem = document.querySelector(`#collapse-${type}`);
		const bsCollapse = new bootstrap.Collapse(collapseItem, {
			toggle: true,
		});
	}
}

const app = new App();
