$(document).ready(function(){

var topics = ["Rafa Nadal", "Roger Federer", "Novak Djokovic", "Chritiano Ronaldo", "Lionel Messi", "Neymar", "Zlatan Ibrahimović", "Gareth Bale", "Arjen Robben", "Paul Pogba"];


	function renderButtons() {

        $("#playerButtons").empty();

        for (var i = 0; i < topics.length; i++) {
			var a = $("<button>");
			a.addClass("btn btn-primary newButton");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);
			$("#playerButtons").append(a);
        }
    };



	$("#add-player").on("click", function(event) {

			event.preventDefault();
			var player = $("#topic").val().trim();

			if (player == ""){
		      return false;
		    }

			topics.push(player);
			renderButtons();
			return false;
	});

			renderButtons();

	function displayPlayer(){

	  		$("#playerLounge").empty();
	        
	        var category = $(this).attr("data-name");
	        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=dc6zaTOxFJmzC&limit=10";

	        $.ajax({
	            url: queryURL,
	            method: "GET"
	        })

	        .done(function(response) {

				var results = response.data;

					for (var i = 0; i < results.length; i++) {
						var gifDiv = $("<div class='item'>");
						var rating = results[i].rating;
						var p = $("<p>").text("Rating: " + rating);

						var gifImage = $("<img>");
						gifImage.attr("src", results[i].images.fixed_height.url);
			   			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
			            gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); 
			            gifImage.attr("data-animate", results[i].images.fixed_height_small.url)
			            gifImage.attr("data-state", "still"); 
			            gifImage.attr("alt", topics[i] + " Gif")
			            gifImage.addClass("image");

            			gifDiv.append(gifImage);
						gifDiv.prepend(p);
						gifDiv.prepend(gifImage);
						$("#playerLounge").prepend(gifDiv);
					}

	        });
	}


	$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
    });


	$(document).on("click", ".newButton", displayPlayer);

});
