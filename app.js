$(document).ready(function () {
    var topics = ["pokemon", "terrace_house", "ryan_gosling", "gudetama", "jellygummy"];

    var apiKey = "Vri37h5oUMjGDBMdYDRIanCtBdvfAb6E";

    // Function for displaying buttons
    function renderButtons() {

        // // Delete the content inside the topic-button div prior to adding new gifs
        // // (this is necessary otherwise you will have repeat buttons)
        // $("#topic-view").empty();


        // Loop through the array of topics, then generate buttons for each topic in the array
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.text(topics[i]);
            btn.attr("data-name", topics[i]);
            $(".buttons").append(btn);

            // //set tag name into url for each topic
            // var customURL = "https://api.giphy.com/v1/gifs/search?q=" + topic[1] + "&api_key=" + apiKey + "&limit10";


        };
    };
    renderButtons();



    // // Function for dumping the JSON content for each button into the div
    $("button").on("click", function () {


        var topic = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit10";

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);
            // $("#topic-view").text(JSON.stringify(response));
            // });

            //sets a variable that that it retrieves from the object images to be saved 
            var results = response.data;

            //a for look that prepends our gifs to the #images
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div>")

                //stores the img div be saved into the variable gifImage
                var gifImage = $("<img>");

                //this sets the imageUrl into the src and then gif image into alt
                gifImage.attr("src", results[i].images.fixed_height.url);
                gifImage.attr("alt", "image");

                //this attaches the catImage to the top in the images id
                gifDiv.prepend(gifImage);
                $("#images").prepend(gifDiv);

            }


        });
    });

    $(".gif").on("click", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var s = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            var gifImage = $("<img>");
            gifImage("src", $(this).attr("data-still"));
        }
        else (state === "animate") {
            var gifImage = $("<img>");
            gifImage("src", $(this).attr("data-animate"));
        }
    });
});


