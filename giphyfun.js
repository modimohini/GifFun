$(document).ready(function() {

    var gif = [
      "Batman", "Marvel", "Puppy", "Cars"
    ];
  
    // function to make buttons and add to page
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < arrayToUse.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
      }
  
    }
  
    $(document).on("click", ".GiphyFun-buttonss", function() {
      $("#gif").empty();
      $(".GiphyFun-buttonss").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=DtwjCPO9OPAzn1oIYM483i3FmU5hQb3H&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class=\"add-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var gifImage = $("<img>");
            gifImage.attr("src", still);
            gifImage.attr("data-still", still);
            gifImage.attr("data-animate", animated);
            gifImage.attr("data-state", "still");
            gifImage.addClass("gif-image");
  
            gifDiv.append(p);
            gifDiv.append(gifImage);
  
            $("#gif").append(gifDiv);
          }
        });
    });
  
    $(document).on("click", ".gif-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-gif").on("click", function(event) {
      event.preventDefault();
      var newGif = $("input").eq(0).val();
  
      if (newGif.length > 2) {
        gif.push(newGif);
      }
  
      populateButtons(gif, "GiphyFun-buttonss", "#GiphyFun-buttonss");
  
    });
  
    populateButtons(gif, "GiphyFun-buttonss", "#GiphyFun-buttonss");
  });
  