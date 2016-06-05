

function Item(name) {
    this.name = name;
}

controller = {
    watch: function (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // prevent the form from being submitted 
            this.add(form.name.value);
        }.bind(this), false); // binding this to the controller instead of the form
    },
    add: function (name) {
        var item = new Item(name);
        view.render(item);
    }
}

view = {
    render: function (item) {
        var list = document.getElementById("list");
        var li = document.createElement("li");
        li.textContent = item.name;
        list.appendChild(li);
    }
}

controller.watch(document.getElementById('input'));