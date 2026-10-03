/* =========================================
   FITPULSE JAVASCRIPT
========================================= */


/* ================= VARIABLES ================= */

let calories = 500;

let steps = 5000;

let activeTime = 30;

let calorieIntake = 1800;

let water = 1500;

let waterGoal = 2500;

let workouts = [];

let exercises = [
    {
        name: "Running",
        category: "Cardio"
    },
    {
        name: "Squats",
        category: "Strength"
    },
    {
        name: "Push Ups",
        category: "Strength"
    }
];


/* ================= PAGE NAVIGATION ================= */

function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageName);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ================= DATE ================= */

function showDate() {

    const dateElement =
        document.getElementById("today");

    if (!dateElement) {
        return;
    }


    const today =
        new Date();


    const options = {
        day: "numeric",
        month: "short",
        year: "numeric"
    };


    dateElement.innerText =
        today.toLocaleDateString(
            "en-IN",
            options
        );
}


/* ================= REGISTER ================= */

function register() {

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const age =
        document.getElementById("age").value;

    const height =
        document.getElementById("height").value;

    const weight =
        document.getElementById("weight").value;

    const goal =
        document.getElementById("goal").value;

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (
        name === "" ||
        email === "" ||
        age === "" ||
        height === "" ||
        weight === "" ||
        goal === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        alert(
            "Please fill all the fields."
        );

        return;
    }


    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    if (Number(age) <= 0 ||
        Number(height) <= 0 ||
        Number(weight) <= 0) {

        alert(
            "Please enter valid values."
        );

        return;
    }


    const user = {

        name: name,

        email: email,

        age: age,

        height: height,

        weight: weight,

        goal: goal,

        password: password

    };


    localStorage.setItem(
        "fitpulseUser",
        JSON.stringify(user)
    );


    alert(
        "Registration successful!"
    );


    showPage("login");

}


/* ================= LOGIN ================= */

function login() {

    const email =
        document
        .getElementById("loginEmail")
        .value
        .trim();

    const password =
        document
        .getElementById("loginPassword")
        .value;


    if (
        email === "" ||
        password === ""
    ) {

        alert(
            "Please enter email and password."
        );

        return;
    }


    const savedUser =
        localStorage.getItem(
            "fitpulseUser"
        );


    if (savedUser) {

        const user =
            JSON.parse(savedUser);


        if (
            email !== user.email ||
            password !== user.password
        ) {

            alert(
                "Invalid email or password."
            );

            return;
        }

    }


    localStorage.setItem(
        "fitpulseLoggedIn",
        "true"
    );


    alert(
        "Login successful!"
    );


    showPage("dashboard");

}


/* ================= DEMO LOGIN ================= */

function demoLogin() {

    document.getElementById(
        "loginEmail"
    ).value =
        "demo@fitpulse.com";


    document.getElementById(
        "loginPassword"
    ).value =
        "123456";


    localStorage.setItem(
        "fitpulseLoggedIn",
        "true"
    );


    alert(
        "Demo login successful!"
    );


    showPage("dashboard");

}


/* ================= CALORIES ================= */

function changeCalories(value) {

    calories += value;


    if (calories < 0) {

        calories = 0;

    }


    document.getElementById(
        "calories"
    ).innerText =
        calories;

}


/* ================= STEPS ================= */

function addSteps() {

    steps += 1000;


    document.getElementById(
        "steps"
    ).innerText =
        steps;


    updateRecommendation();

}


/* ================= ACTIVE TIME ================= */

function addActive() {

    activeTime += 15;


    document.getElementById(
        "active"
    ).innerText =
        activeTime;


    updateRecommendation();

}


/* ================= CALORIE INTAKE ================= */

function addIntake(value) {

    calorieIntake += value;


    document.getElementById(
        "intake"
    ).innerText =
        calorieIntake;

}


/* ================= WATER ================= */

function changeWater(value) {

    water += value;


    if (water < 0) {

        water = 0;

    }


    if (water > waterGoal) {

        water = waterGoal;

    }


    document.getElementById(
        "water"
    ).innerText =
        water;


    updateWaterProgress();

}


/* ================= WATER PROGRESS ================= */

function updateWaterProgress() {

    const percentage =
        (water / waterGoal) * 100;


    document.getElementById(
        "waterProgress"
    ).style.width =
        percentage + "%";

}


/* ================= BMI ================= */

function calculateBMI() {

    const height =
        Number(
            document.getElementById(
                "bmiHeight"
            ).value
        );


    const weight =
        Number(
            document.getElementById(
                "bmiWeight"
            ).value
        );


    const result =
        document.getElementById(
            "bmiResult"
        );


    if (
        height <= 0 ||
        weight <= 0
    ) {

        result.innerText =
            "Please enter valid height and weight.";

        return;
    }


    const heightMeter =
        height / 100;


    const bmi =
        weight /
        (heightMeter * heightMeter);


    let category = "";


    if (bmi < 18.5) {

        category = "Underweight";

    }

    else if (bmi < 25) {

        category = "Normal Weight";

    }

    else if (bmi < 30) {

        category = "Overweight";

    }

    else {

        category = "Obesity";

    }


    result.innerHTML =
        "<strong>BMI: " +
        bmi.toFixed(2) +
        "</strong><br>" +
        category;

}


/* ================= WORKOUT ================= */

function saveWorkout() {

    const exercise =
        document
        .getElementById("exercise")
        .value
        .trim();


    const duration =
        Number(
            document.getElementById(
                "duration"
            ).value
        );


    const weight =
        Number(
            document.getElementById(
                "workoutWeight"
            ).value
        );


    if (
        exercise === "" ||
        duration <= 0
    ) {

        alert(
            "Please enter exercise and duration."
        );

        return;
    }


    /*
       Simple calorie calculation
       for the demo project.
    */

    const caloriesBurned =
        Math.round(
            duration * 7
        );


    const workout = {

        exercise: exercise,

        duration: duration,

        weight: weight,

        calories: caloriesBurned

    };


    workouts.push(workout);


    calories += caloriesBurned;


    document.getElementById(
        "calories"
    ).innerText =
        calories;


    document.getElementById(
        "workoutMessage"
    ).innerText =
        "✓ Workout saved successfully!";


    document.getElementById(
        "exercise"
    ).value = "";


    document.getElementById(
        "duration"
    ).value = "";


    document.getElementById(
        "workoutWeight"
    ).value = "";


    displayWorkouts();


    updateRecommendation();

}


/* ================= DISPLAY WORKOUTS ================= */

function displayWorkouts() {

    const list =
        document.getElementById(
            "workoutList"
        );


    list.innerHTML = "";


    workouts.forEach(
        function(workout, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "workout-item";


            item.innerHTML =

                "<div>" +

                "<strong>" +
                workout.exercise +
                "</strong><br>" +

                "<small>" +
                workout.duration +
                " minutes | " +

                workout.calories +
                " kcal" +

                "</small>" +

                "</div>" +

                "<button onclick='deleteWorkout(" +
                index +
                ")'>" +

                "Delete" +

                "</button>";


            list.appendChild(item);

        }
    );

}


/* ================= DELETE WORKOUT ================= */

function deleteWorkout(index) {

    workouts.splice(
        index,
        1
    );


    displayWorkouts();

}


/* ================= RECOMMENDATION ================= */

function updateRecommendation() {

    const recommendation =
        document.getElementById(
            "recommendationText"
        );


    if (steps < 5000) {

        recommendation.innerText =
            "Try to reach at least 5,000 steps today. Keep moving!";

    }

    else if (water < 1500) {

        recommendation.innerText =
            "Your steps are good. Remember to drink more water.";

    }

    else if (activeTime < 45) {

        recommendation.innerText =
            "Good progress! Try adding another 15 minutes of activity.";

    }

    else {

        recommendation.innerText =
            "Excellent work! Keep maintaining your fitness routine.";

    }

}


/* ================= COACH ================= */

function addExercise() {

    const name =
        document
        .getElementById(
            "newExercise"
        )
        .value
        .trim();


    const category =
        document
        .getElementById(
            "exerciseCategory"
        )
        .value
        .trim();


    if (
        name === "" ||
        category === ""
    ) {

        alert(
            "Enter exercise name and category."
        );

        return;
    }


    exercises.push({

        name: name,

        category: category

    });


    document.getElementById(
        "newExercise"
    ).value = "";


    document.getElementById(
        "exerciseCategory"
    ).value = "";


    displayExercises();

}


/* ================= DISPLAY EXERCISES ================= */

function displayExercises() {

    const list =
        document.getElementById(
            "exerciseList"
        );


    list.innerHTML = "";


    exercises.forEach(
        function(exercise, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "exercise-item";


            item.innerHTML =

                "<span>" +

                exercise.name +

                "</span>" +

                "<small>" +

                exercise.category +

                " &nbsp; " +

                "<button onclick='deleteExercise(" +
                index +
                ")'>" +

                "Delete" +

                "</button>" +

                "</small>";


            list.appendChild(item);

        }
    );

}


/* ================= DELETE EXERCISE ================= */

function deleteExercise(index) {

    exercises.splice(
        index,
        1
    );


    displayExercises();

}


/* ================= PAGE LOAD ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        showDate();

        updateWaterProgress();

        displayExercises();

        updateRecommendation();

    }
);