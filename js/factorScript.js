var button = document.getElementById("rainbow");
var rainbow = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
function change() {
    document.body.style.background = rainbow[Math.floor(7 * Math.random())];
}
button.addEventListener("click", change);

var form = document.forms[0];
form.addEventListener("submit", factorize, false);
function factorize(event) {
    event.preventDefault(); // prevent the form from being submitted
    var number = Number(form.number.value), factors = String(factorsOf(number));
    document.getElementById("output").innerHTML = factors;
}
function factorsOf(n) {
    var i, max, factors = [];
    if (n < 0) {
        throw new RangeError("Argument Error: Number must be positive");
    }
    if (Math.floor(n) !== n) {
        throw new RangeError("Argument Error: Number must be an integer");
    }
    for (i = 1, max = Math.sqrt(n); i <= max; i++) {
        if (n % i === 0) {
            factors.push(i, n / i);
        }
    }
    return factors.sort(function (a, b) { return a > b; });
}