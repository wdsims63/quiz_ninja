var $form = document.forms.hero;
var i;

//Hero Form Scripts
function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    
    var hero = {}; // create an empty object
    
    hero.name = $form.name.value; // create a name property based on the input field's value
    hero.realName = $form.realName.value; 
    hero.powers = [];
    for (i = 0; i < $form.powers.length; i++) {
        if ($form.powers[i].checked) {
            hero.powers.push($form.powers[i].value);
        }
    }
    for (i = 0; i < $form.heroType.length; i++) {
        if ($form.heroType[i].checked) {
            hero.type = $form.heroType[i].value;
            break;
        }
    }
    hero.age = $form.age.value;
    hero.city = $form.city.value;
    hero.origin = $form.origin.value;
    
    alert(JSON.stringify(hero)); // convert object to JSON string and display an alert dialog
}

function validateInline(event) {
    // get the first letter of the name input field
    var firstLetter = $form.name.value[0];
    // get a reference to the label for the name input field
    var label = document.querySelector("label[for='name']");
    if (firstLetter.toUpperCase() === "X") {
        label.classList.add("error");
        label.textContent = "Your name is not allowed to start with X!";
    } else {
        // the error hasn't happened or has been fixed
        label.classList.remove("error");
        label.textContent = "Name:";
    }
}

$form.addEventListener('submit', makeHero, false);
$form.name.addEventListener("blue", validateInline, false);