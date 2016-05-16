var $form = document.forms.hero;
var i;

//Hero Form Scripts
function submitHero(event) {
    event.preventDefault();
    var form = event.target;
    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", form.action, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 201) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(data);
}

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
    
    //alert(JSON.stringify(hero)); // convert object to JSON string and display an alert dialog
    send(JSON.stringify(hero));
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

function send(hero) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://validate.jsontest.com", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(hero);
}

$form.addEventListener('submit', submitHero, false);
$form.name.addEventListener("blue", validateInline, false);