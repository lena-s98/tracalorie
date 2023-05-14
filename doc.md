# Calorie Tracker Documentation

The `CalorieTracker` class is a JavaScript class that provides functionality for tracking daily calorie intake and workouts. It interacts with the `Storage` class to store and retrieve data from the browser's local storage. The `App` class is responsible for initializing the calorie tracker and managing user interactions.

## CalorieTracker Class

### Constructor

The `CalorieTracker` class constructor initializes the calorie tracker by retrieving data from the local storage and displaying it on the user interface. It also sets event listeners and loads existing meal and workout items.

### Public Methods

- `addMeal(meal)`: Adds a new meal to the calorie tracker. It updates the total calorie count, saves the meal to local storage, and renders the updated UI.
- `addWorkout(workout)`: Adds a new workout to the calorie tracker. It updates the total calorie count, saves the workout to local storage, and renders the updated UI.
- `removeMeal(id)`: Removes a meal from the calorie tracker based on its ID. It updates the total calorie count, removes the meal from local storage, and renders the updated UI.
- `removeWorkout(id)`: Removes a workout from the calorie tracker based on its ID. It updates the total calorie count, removes the workout from local storage, and renders the updated UI.
- `reset()`: Resets the calorie tracker by clearing all data and local storage. It sets the total calorie count, meals, and workouts to their initial values and renders the updated UI.
- `setLimit(calorieLimit)`: Sets the calorie limit for the day. It updates the calorie limit value, saves it to local storage, and renders the updated UI.
- `loadItems()`: Loads existing meal and workout items from local storage and displays them on the UI.

### Private Methods

- `_displayCaloriesLimit()`: Displays the calorie limit on the UI.
- `_displayCaloriesTotal()`: Displays the total calorie count on the UI.
- `_displayCaloriesConsumed()`: Calculates and displays the total calories consumed from meals on the UI.
- `_displayCaloriesBurned()`: Calculates and displays the total calories burned from workouts on the UI.
- `_displayCaloriesRemaining()`: Calculates and displays the remaining calories based on the calorie limit and total calories consumed on the UI. It also updates the UI elements' styles based on the remaining calories.
- `_displayCaloriesProgress()`: Calculates and displays the progress bar of calories consumed as a percentage of the calorie limit on the UI.
- `_displayNewItem(obj, type)`: Creates and displays a new item card (meal or workout) on the UI.
- `_render()`: Calls the necessary private methods to update and render the calorie tracker UI.

## Meal Class

The `Meal` class represents a meal item with properties such as `id`, `name`, and `calories`.

### Constructor

The `Meal` class constructor initializes a new meal item with a unique ID generated using `Math.random()`, a name, and the calorie count.

## Workout Class

The `Workout` class represents a workout item with properties such as `id`, `name`, and `calories`.

### Constructor

The `Workout` class constructor initializes a new workout item with a unique ID generated using `Math.random()`, a name, and the calorie count.

## Storage Class

The `Storage` class is a utility class that provides static methods to interact with the browser's local storage for storing and retrieving data related to the calorie tracker.

### Static Methods

- `getCalorieLimit(defaultLimit)`: Retrieves the calorie limit from local storage or returns a default limit if not found.
- `setCalorieLimit(calorieLimit)`: Saves the calorie limitto local storage.
- `getMeals()`: Retrieves the meal items from local storage.
- `setMeals(meals)`: Saves the meal items to local storage.
- `getWorkouts()`: Retrieves the workout items from local storage.
- `setWorkouts(workouts)`: Saves the workout items to local storage.

## App Class

The `App` class is responsible for initializing the calorie tracker, managing user interactions, and coordinating actions between the `CalorieTracker` class and the user interface.

### Constructor

The `App` class constructor initializes the `CalorieTracker` instance, sets up event listeners for user interactions, and calls the necessary methods to load existing data and render the UI.

### Event Listeners

- `addMealForm`: Listens for the submission of the "Add Meal" form and triggers the addition of a new meal to the `CalorieTracker` instance.
- `addWorkoutForm`: Listens for the submission of the "Add Workout" form and triggers the addition of a new workout to the `CalorieTracker` instance.
- `mealList`: Listens for the click event on the meal list and triggers the removal of a meal item from the `CalorieTracker` instance.
- `workoutList`: Listens for the click event on the workout list and triggers the removal of a workout item from the `CalorieTracker` instance.
- `resetButton`: Listens for the click event on the reset button and triggers the reset action on the `CalorieTracker` instance.
- `limitForm`: Listens for the submission of the "Set Limit" form and triggers the setting of a new calorie limit on the `CalorieTracker` instance.

### Private Methods

- `_updateUI()`: Updates the UI by calling the necessary methods on the `CalorieTracker` instance to display the current calorie information.

## Usage

To use the calorie tracker:

1. Create an instance of the `App` class.
2. The `App` class will handle the initialization of the `CalorieTracker` instance and set up the event listeners.
3. Interact with the UI by adding meals, workouts, setting calorie limits, and removing items.
4. The `CalorieTracker` instance will update the calorie information and store data in the local storage.
5. The UI will reflect the changes made through the `CalorieTracker` instance.

Note: The functionality of saving and retrieving data from local storage relies on the `Storage` class. Make sure the browser supports local storage and JavaScript is enabled.

That concludes the documentation for the Calorie Tracker application. Enjoy tracking your daily calorie intake and workouts!
