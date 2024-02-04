document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calculate").addEventListener("click", calculateBMI);
});

function calculateBMI() {
    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    if (isInputValid(age, weight, height)) {
        const bmi = calculateBMIValue(weight, height);
        displayBMIResult(bmi, gender, age, height);
    } else {
        alert("Please enter valid age, weight, and height values.");
    }
}

function isInputValid(age, weight, height) {
    return !isNaN(age) && age > 0 && !isNaN(weight) && weight > 0 && !isNaN(height) && height > 0;
}

function calculateBMIValue(weight, height) {
    return (weight / Math.pow(height / 100, 2)).toFixed(2);
}

function displayBMIResult(bmi, gender, age, height) {
    const bmiInfo = getBMIInfo(bmi, gender);
    const standardWeight = calculateStandardWeight(height, gender);

    document.getElementById("bmiResult").textContent = `Your BMI: ${bmi}`;
    document.getElementById("bmiInfo").textContent = `BMI Category: ${bmiInfo}`;
    document.getElementById("standardWeight").textContent = age <= 18 
        ? `Recommended Standard Weight for Age: Not applicable for individuals under 18`
        : `Recommended Standard Weight for Age: ${standardWeight} kg`;

    document.querySelector(".result").style.display = "block";
}

function getBMIInfo(bmi, gender) {
    const categories = gender === "male" 
        ? { underweight: 18.5, normal: 24.9, overweight: 29.9 }
        : { underweight: 18.5, normal: 23.9, overweight: 28.9 };

    if (bmi < categories.underweight) return "Underweight";
    if (bmi <= categories.normal) return "Normal weight";
    if (bmi <= categories.overweight) return "Overweight";
    return "Obese";
}

function calculateStandardWeight(height, gender) {
    const factor = gender === "male" ? 22 : 21;
    return (factor * Math.pow(height / 100, 2)).toFixed(2);
}