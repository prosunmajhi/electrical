// User info form submission
document.getElementById('userInfoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get user inputs
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Save name and phone number in a global variable
    window.userInfo = { name, phone };

    // Hide the welcome section and show the quiz
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';

    // Start the quiz
    populate();
});

// Populate the quiz with questions
function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // Show question
        const element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // Show options
        const choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            const choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("bt" + i, choices[i]);
        }

        showProgress();
    }
}

// Handle user's guesses
function guess(id, guess) {
    const button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    };
}

// Show the progress of the quiz
function showProgress() {
    const currentQuestionNumber = quiz.questionIndex + 1;
    const element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

// Show the scores at the end of the quiz
function showScores() {
    const gameOverHTML = `
        <h1>Result</h1>
        <h2 id='score'> Your score: ${quiz.score}</h2>
    `;
    const element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;

    // Send data to Google Sheets
    sendToGoogleSheets(window.userInfo.name, window.userInfo.phone, quiz.score);
}

// Send data to Google Sheets
function sendToGoogleSheets(name, phone, score) {
    const url = 'https://script.google.com/macros/s/AKfycbw9U4Faj13qL1iFjolvwosNJj-WZ_Tv_w6DKCrGRx97mrOOy21k9ImaFvjkcA-25ofZ/exec'; // Replace with your Script ID
    
    fetch(`${url}?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&score=${encodeURIComponent(score)}`)
        .then(response => {
            if (response.ok) {
                console.log('Data saved successfully');
            } else {
                console.error('Error saving data');
            }
        })
        .catch(error => console.error('Fetch error:', error));
}

// Create questions
const questions = [
    new Question("Insulation resistance is measured by which instrument?", ["Multimeter", "Insulation resistance tester", "Clamp meter", "Oscilloscope"], "Insulation resistance tester"),
    new Question("1 HP = how many watts?", ["500 watts", "745 watts", "1000 watts", "1200 watts"], "745 watts"),
    new Question("Motor RPM is measured by which instrument?", ["Tachometer", "Voltmeter", "Ammeter", "Oscilloscope"], "Tachometer"),
    new Question("How is the connection of house wiring and lights, Fan?", ["Series connection", "Parallel connection", "Star connection", "Delta connection"], "Parallel connection"),
    new Question("How is the connection of Fan Regulator?", ["Series connection", "Parallel connection", "Variable resistor connection", "Capacitive connection"], "Capacitive connection"),
    new Question("What is the typical capacitor capacity (in µF) installed in a ceiling fan?", ["1 µF", "2.5 µF", "5 µF", "10 µF"], "2.5 µF"),
    new Question("What is MCCB Full Form?", ["Motor Control Circuit Breaker", "Molded Case Circuit Breaker", "Multi-Current Circuit Breaker", "Magnetic Coil Circuit Breaker"], "Molded Case Circuit Breaker"),
    new Question("1 unit = how many watt?", ["100 watts", "500 watts", "1000 watts", "1000 watt-hours"], "1000 watt-hours"),
    new Question("What is the motor used in industries?", ["AC Induction Motor", "DC Motor", "Stepper Motor", "Synchronous Motor"], "AC Induction Motor"),
    new Question("How many connections of Star and Delta?", ["2 connections", "3 connections", "4 connections", "5 connections"], "3 connections"),
    new Question("6 pole motor = how many RPM?", ["600 RPM", "1200 RPM", "1800 RPM", "3000 RPM"], "1200 RPM"),
    new Question("4 pole motor = how many RPM?", ["600 RPM", "900 RPM", "1200 RPM", "1800 RPM"], "1800 RPM"),
    new Question("2 pole motor = how many RPM?", ["600 RPM", "1200 RPM", "1800 RPM", "3600 RPM"], "3600 RPM"),
    new Question("5HP motor = how many AMP?", ["10 Amps", "15 Amps", "20 Amps", "25 Amps"], "20 Amps"),
    new Question("What is a transformer measured in?", ["Watts", "Volts", "Amperes", "Volt-Amperes (VA)"], "Volt-Amperes (VA)"),
    new Question("What is the full form of RCCB?", ["Residual Current Circuit Breaker", "Residual Current Control Box", "Rapid Circuit Control Breaker", "Reactive Current Circuit Breaker"], "Residual Current Circuit Breaker"),
    new Question("What is the full form of AC and DC?", ["Alternating Current and Direct Current", "Automatic Current and Direct Current", "Alternating Charge and Direct Charge", "Alternating Circuit and Direct Circuit"], "Alternating Current and Direct Current"),
    new Question("10HP motor = how many KW?", ["5.5 kW", "7.5 kW", "10 kW", "12 kW"], "7.5 kW"),
    new Question("5 hp motor = how many contactors?", ["1 Contactor", "2 Contactors", "3 Contactors", "4 Contactors"], "1 Contactor"),
    new Question("How many overloads in {MN2(4.5-7.5)} L&T?", ["1 Overload", "2 Overloads", "3 Overloads", "4 Overloads"], "2 Overloads"),
    new Question("4 pole motor = how many coils?", ["2 Coils", "3 Coils", "4 Coils", "6 Coils"], "6 Coils"),
    new Question("2 pole (2900 RPM) = how many coils?", ["2 Coils", "3 Coils", "4 Coils", "6 Coils"], "2 Coils"),
    new Question("6 pole (960 RPM) = how many coils?", ["2 Coils", "3 Coils", "4 Coils", "6 Coils"], "6 Coils"),
];

const quiz = new Quiz(questions);
