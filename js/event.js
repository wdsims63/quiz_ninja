var $ul = document.getElementById("list");
var $list_item = document.querySelector('#list li');

$ul.addEventListener("click", function (event) {
    console.log("Clicked on ul");
}, false);

$list_item.addEventListener("click", function (event) {
    console.log("Clicked on li");
    event.stopPropagation();
}, false);


var once = document.getElementById("once");
var click = document.getElementById("click");

click.addEventListener("mousedown", function () { console.log("down"); });
click.addEventListener("click", function () { console.log("click"); });
click.addEventListener("mouseup",function () { console.log("up"); });

var dblClick = document.getElementById("dblclick");

dblClick.addEventListener("dblclick", highlight);

function highlight(event) {
    event.target.classList.toggle("highlight");
}

var mouse = document.getElementById("mouse");
mouse.addEventListener("mouseover", highlight);
mouse.addEventListener("mouseout", highlight);

addEventListener("keydown", highlight);
addEventListener("keyup", function stop(event) {
    var date = new Date();
    console.log("You stopped pressing the key on " + date);
});

addEventListener("keypress", function (event) {
    console.log("You pressed the " + String.fromCharCode(event.charCode) + " character"); 
});

function remove(event) {
    console.log("Enjoy this while it lasts!");
    once.style.backgroundColor = "pink";

    once.removeEventListener("click", remove);
}

once.addEventListener("click", remove);




function doSomething() {
    //console.log("Something Happened!");
    //console.log(event.type);
    //console.log(event.target);
    console.log(event.which);
}

function doCoords() {
    console.log("Screen: (" + event.screenX + ",", + event.screenY + "), page: (" + event.pageX + "," + event.pageY + "), client: (" + event.clientX + "," + event.clientY + ")");
}

//addEventListener("click",doSomething);