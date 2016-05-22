function factorize(event) {
    event.preventDefault(); // prevent the form from being submitted
    var number = form.number.value;
    if (Worker) {
        worker = new Worker("link/to/file/factors.js");
        worker.postMessage(number);
        worker.addEventListener('message', function (event) {
            document.getElementById("output").textValue = event.data;
        }, false);
    }
}

self.addEventListener('message', function () {
    var factors = String(factorsOf(Number(event.data)));
    self.postMessage(factors);
    self.close();
}, false);