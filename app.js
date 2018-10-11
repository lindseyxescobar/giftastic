$(document).ready(function () {
    var topics = ["pokemon", "coffee", "ryan_gosling", "gudetama", "jellygummy"];

    var apiKey = "Vri37h5oUMjGDBMdYDRIanCtBdvfAb6E";

    // Function for displaying buttons
    function renderButtons() {

        // Delete the content inside the topic-button div prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $(".buttons").empty();


        // Loop through the array of topics, then generate buttons for each topic in the array
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.text(topics[i]);
            btn.attr("data-name", topics[i]);
            $(".buttons").append(btn);
        }
    }
    renderButtons();
    //adding button for new topic from input form, new button has correct data-name, but does link into url
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var newTopic = $("#gif-input").val().trim();
        topics.push(newTopic);
        console.log(newTopic);
        var btn = $("<button>");
        btn.text(newTopic);
        btn.attr("data-name", topics[topics.length - 1]);
        $(".buttons").append(btn);
        console.log(topics.toString());
    })

    $(document).on("click", "button", function () {
        // // Function for dumping the JSON content for each button into the div
        // $("button").on("click", function () {

        console.log("button clicked");
        var topic = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit10";
        console.log(topic);

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
                var gifImg = $("<img>");

                //this sets the imageUrl into the src and then gif image into alt
                gifImg.attr("src", results[i].images.fixed_height.url);
                gifImg.attr("alt", "image");

                //this attaches the gifImage to the top in the images id
                gifDiv.prepend(gifImg);
                $("#images").prepend(gifDiv);
            }
        });
    })
});