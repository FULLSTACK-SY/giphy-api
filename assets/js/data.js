      // Initial array of animals
      var animals = ["dog", "cat", "rabbit", "monkey"];

      // Function for dumping the JSON content for each button into the div
      function displayanimalInfo() {

        var animal = $(this).attr("data-name")
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NdFcLdUar2YeY8VS2IuLi5Glr2kXmpnq&q="+animal+"&limit=10&offset=0&rating=PG&lang=en";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

           // storing the data from the AJAX request in the results variable
          var results = response.data;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {
            // Creating and storing a div tag
            var animalDiv = $("<div class=col-lg-4 col-md-6 col-sm-6 col-12>");
            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            // Creating and storing an image tag
             var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            var defaultAnimatedSrc = results[i].images.fixed_height.url;
            var staticSrc = results[i].images.fixed_height_still.url;
            // console.log(results[i].images.fixed_height.url);
            animalImage.attr("src", staticSrc);
            animalImage.addClass("netGiphy");
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", staticSrc);
            animalImage.attr("data-animate", defaultAnimatedSrc);
            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(animalImage);
            animalDiv.append(p);
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            //  $("#images").prepend(animalImage);
           $("#images").prepend(animalDiv);
         }
       });

      }

      // Function for displaying animal data
      function renderButtons() {
        // Deleting the buttons prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {
          // Then dynamically generating buttons for each animal in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          a.addClass("btn btn-primary btn-sm active")
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
        // Adding the animal from the textbox to our array
        animals.push(animal);
        console.log(animals);
        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // Function for displaying the animal info
      // Using $(document).on instead of $(".animal").on to add event listeners to dynamically generated elements
      $(document).on("click", ".animal", displayanimalInfo);
      // Calling the renderButtons function to display the initial buttons
      renderButtons();
      //Click event on gifs with class of "netGiphy" executes pausePlayGifs function
      $(document).on("click", ".netGiphy", pausePlayGifs);
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function pausePlayGifs() {
          var state = $(this).attr("data-state");
          if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      }
