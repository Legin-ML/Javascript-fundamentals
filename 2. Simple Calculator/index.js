let isAfterEqual = false;
function appendCharacter(char) {
    if(isAfterEqual) {
        clearDisplay();
        isAfterEqual = false;
    }
    document.getElementById("display").value += char;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculateResult() {
    try {
        document.getElementById("display").value = eval(document.getElementById("display").value);
        isAfterEqual = true;
    } catch (error) {
        alert("Invalid Expression");
    }
}