var $form = document.forms.search;

var $input = $form.searchBox;
var $button = $form.elements[1];

//$input.value = "Search Here";

$input.addEventListener('focus', function () {
    /*if ($input.value === "Search Here") {
        $input.value = "";
    }*/
}, false);

$input.addEventListener('blur', function () {
    /*if ($input.value === "") {
        $input.value = "Search Here";
    }*/
}, false);

function search(event) {
    alert("You searched for: " + $input.value);
    event.preventDefault();
}

$form.addEventListener("submit", search, false);
