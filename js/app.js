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
		this._displayNewItem(meal, "meal");
		this._render();
	}

	addWorkout(workout) {
		this._workouts.push(workout);
		this._totalCalories -= workout.calories;
		this._displayNewItem(workout, "workout");
		this._render();
	}

	removeMeal(id) {
		const index = this._meals.findIndex((meal) => {
			return meal.id === id;
		});

		if (index !== -1) {
			const meal = this._meals[index];
			this._totalCalories -= meal.calories;
			this._meals.splice(index, 1);
			this._render();
		}
	}

	removeWorkout(id) {
		const index = this._workouts.findIndex((workout) => {
			return workout.id === id;
		});

		if (index !== -1) {
			const workout = this._workouts[index];
			this._totalCalories += workout.calories;
			this._workouts.splice(index, 1);
			this._render();
		}
	}

	reset() {
		this._totalCalories = 0;
		this._meals = [];
		this._workouts = [];
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

	_displayNewItem(obj, type) {
		const cardDiv = document.createElement("div");
		cardDiv.classList.add("card", "my-2");
		cardDiv.setAttribute("data-id", obj.id);

		const cardBodyDiv = document.createElement("div");
		cardBodyDiv.classList.add("card-body");

		const alignmentDiv = document.createElement("div");
		alignmentDiv.classList.add(
			"d-flex",
			"align-items-center",
			"justify-content-between"
		);

		const h4 = document.createElement("h4");
		h4.classList.add("mx-1");
		h4.textContent = `${obj.name}`;

		const valueDiv = document.createElement("div");
		valueDiv.classList.add(
			"fs-1",
			"text-white",
			"text-center",
			"rounded-2",
			"px-2",
			"px-sm-5"
		);
		valueDiv.textContent = `${obj.calories}`;

		const button = document.createElement("button");
		button.classList.add("delete", "btn", "btn-danger", "btn-sm", "mx-2");

		const icon = document.createElement("i");
		icon.classList.add("fa-solid", "fa-xmark");

		button.appendChild(icon);
		alignmentDiv.appendChild(h4);
		alignmentDiv.appendChild(valueDiv);
		alignmentDiv.appendChild(button);
		cardBodyDiv.appendChild(alignmentDiv);
		cardDiv.appendChild(cardBodyDiv);

		if (type === "meal") {
			const mealItems = document.querySelector("#meal-items");
			mealItems.appendChild(cardDiv);

			valueDiv.classList.add("bg-primary");
		} else {
			const workoutItems = document.querySelector("#workout-items");
			workoutItems.appendChild(cardDiv);

			valueDiv.classList.add("bg-secondary");
		}
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

		document
			.querySelector("#meal-items")
			.addEventListener("click", this._removeItem.bind(this, "meal"));

		document
			.querySelector("#workout-items")
			.addEventListener("click", this._removeItem.bind(this, "workout"));

		document
			.querySelector("#filter-meals")
			.addEventListener("keyup", this._filterItems.bind(this, "meal"));

		document
			.querySelector("#filter-workouts")
			.addEventListener("keyup", this._filterItems.bind(this, "workout"));

		document
			.querySelector("#reset")
			.addEventListener("click", this._reset.bind(this));
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

	_removeItem(type, e) {
		if (
			e.target.classList.contains("delete") ||
			e.target.classList.contains("fa-xmark")
		) {
			if (confirm("Delete this?")) {
				const id = e.target.closest(".card").getAttribute("data-id");

				type === "meal"
					? this._tracker.removeMeal(id)
					: this._tracker.removeWorkout(id);

				e.target.closest(".card").remove();
			}
		}
	}

	_filterItems(type, e) {
		const text = e.target.value.toLowerCase();
		document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
			const name = item.firstElementChild.firstElementChild.textContent;

			if (name.toLowerCase().indexOf(text) !== -1) {
				item.style.display = "block";
			} else {
				item.style.display = "none";
			}
		});
	}

	_reset() {
		if (confirm("Reset the day?")) {
			this._tracker.reset();

			document.querySelector("#meal-items").innerHTML = "";
			document.querySelector("#workout-items").innerHTML = "";
			document.querySelector("#filter-meals").value = "";
			document.querySelector("#filter-workouts").value = "";
		}
	}
}

const app = new App();
