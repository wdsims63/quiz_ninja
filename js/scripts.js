(function () {
    "use strict";
    var quiz = {
        "name": "Super Hero Name Quiz",
        "description": "How many super heroes can you name?",
        "promptPhrase": "What is the real name of ",
        "questions": [
            { "question": "Superman", "answer": "Clarke Kent", "asked": false },
            { "question": "Batman", "answer": "Bruce Wayne", "asked": false },
            { "question": "Wonder Woman", "answer": "Dianna Prince", "asked": false  },
            { "question": "Flash", "answer": "Barry Allen", "asked": false },
            { "question": "The Arrow", "answer": "Oliver Queen", "asked": false },
            { "question": "Green Lantern", "answer": "Hal Jordan", "asked": false }
        ]
    };

    //// dom references ////
    var $question = document.getElementById("question");
    var $score = document.getElementById("score");
    var $feedback = document.getElementById("feedback");
    var $start = document.getElementById("start");
    var $form = document.getElementById("answer");
    var $hiScore = document.getElementById("hiScore");
    var $timer = document.getElementById("timer");

    // Function Definitions
    
    // AJAX function
    // gets the question JSON file using ajax
    function getQuiz() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var quiz = JSON.parse(xhr.responseText);
                new Game(quiz);
            }
        };
        xhr.open("GET", "https://s3.amazonaws.com/sitepoint-book-content/jsninja/quiz.json", true);
        xhr.overrideMimeType("application/json");
        xhr.send();
        update($question, "Waiting for questions...");
    }

    /// view function ///
    function update(element, content, klass) {
        var p = element.firstChild || document.createElement("p");
        p.textContent = content;
        element.appendChild(p);
        if (klass) {
            p.className = klass;
        }
    }
   
    function hideElement(el) {
        //console.log(el);
        el.style.display = "none";
    }

    function showElement(el) {
        el.style.display = "block";
        //console.log("Element to show: " + el);
    }
    
    // Event Listeners
    $start.addEventListener('click', getQuiz, false);
    
     // hide the form at the start of the game
    hideElement($form);
    
    //Random Function
    function random(a, b, callback) {
        if (b === undefined) {
            // if only one argument is supplied, assume lower limit is 1
            b = a;
            a = 1;
        }
        var result = Math.floor((b - a + 1) * Math.random()) + a;
        if (typeof callback === "function") {
            result = callback(result);
        }
        return result;
    }
    
    // Create a Game constructor instead of using the play function
    function Game(quiz) {
        this.questions = quiz.questions;
        this.promptPhrase = quiz.question;
        this.score = 0; //initialize score
        update($score, this.score);
        //initialize timer and set up an interval that counts down
        this.time = 20;
        update($timer, this.time);
        this.interval = window.setInterval(this.countDown.bind(this), 1000);
        //hide button and show form
        hideElement($start);
        showElement($form);
        //add event listener to form for when an answer is chosen
        $form.addEventListener('click', function (event) {
            event.preventDefault();
            this.check(event.target.value);
        }.bind(this), false);
        this.chooseQuestion();
    }
    
    // Method definitions
    Game.prototype.chooseQuestion = function () {
        console.log("chooseQuestion() called");
        var questions = this.questions.filter(function (question) {
            return question.asked === false;
        });
        // set the current question
        this.question = questions[random(questions.length) - 1];
        this.ask(this.question);
    };
    
    Game.prototype.ask = function (question) {
        console.log("ask() called");
        var quiz = this;
        // set the question.asked property to true so it's not asked again
        question.asked = true;
        update($question, this.promptPhrase + question.question + "?");
        //clear the previous options
        $form.innerHTML = "";
        //create an array to put the different option in and a button variable
        var options = [], button;
        var option1 = chooseOption();
        options.push(option1.answer);
        var option2 = chooseOption();
        options.push(option2.answer);
        //add the actual answer at a random place in the options array
        options.splice(random(0, 2), 0, question.answer);
        //loop through each option and display it as a button
        options.forEach(function (name) {
            button = document.createElement("button");
            button.value = name;
            button.textContent = name;
            $form.appendChild(button);
        });

        //choose an option from all the possible answers but without chosing the same option twice
        //The option is the entire question.
        function chooseOption() {
            var option = quiz.questions[random(quiz.questions.length) - 1];
            //check to see if the option chosen is the current question or already one of the options, if it is then recursively call this function until it isn't
            if (option === question || options.indexOf(option.answer) !== -1) {
                return chooseOption();
            }
            return option;
        }
    };
        
    Game.prototype.check = function (answer) {
        console.log("check() called");
        console.log("You chose " + answer);
        if (answer === this.question.answer) {
            update($feedback, "Correct!", "correct");
            //increase score by 1
            this.score++;
            update($score, this.score);
        } else {
            update($feedback, "Wrong!", "wrong");
        }
        this.chooseQuestion();
    };
    
    Game.prototype.countDown = function () {
        // this is called every second and descreases the time
        // decrease time by 1
        this.time--;
        // update the time displayed
        update($timer, this.time);
        //the game is over if the timer has reached 0
        if (this.time <= 0) {
            this.gameOver();
        }
    };
        
    Game.prototype.gameOver = function () {
        console.log("gameOver() invoked");
        this.hiScore();
        // inform the player that the game has finished and tell them how many points they have scored
        update($question, "Game Over, you scored " + this.score + " points.");
        // stop the countdown interval
        window.clearInterval(this.interval);
        hideElement($form);
        showElement($start);
    };
    
    Game.prototype.hiScore = function () {
        if (window.localStorage) {
            // the value held in localStorage is initally null so make it 0
            var hi = localStorage.getItem("hiScore") || 0;
            console.log("Current Hi Score: " + hi);
            // check if the hi-score has been beaten and display a message if it has
            if (this.score > hi || hi === 0) {
                localStorage.setItem("hiScore", this.score);
                console.log("Updated Hi Score.");
            }
            return localStorage.getItem("hiScore");
            update($hiScore, hi);
        }
    };
}());