// put your javascript code here

/*
 *		This file contains the javascript code for the animals gallery
 */

// All the template variables;
var categories_template;
// Helper variables
var allAnimals = {animals: Array()};

// I am using the same helper function of the example
// a helper function that instantiates a template
// and displays the results in the content div
function showTemplate(template, data, containerId){
	var html    = template(data);
	$(containerId).html(html);
}

// Document ready function;
$(document).ready(function(){

	console.log("my_breakpoint");
	// set all animals without category to a var for easy use:
	for (var i = 0; i < animals_data.category.length; i++) {
		for (var j = 0; j < animals_data.category[i].animals.length; j++) {
			allAnimals.animals.push(animals_data.category[i].animals[j]);
		}
	}

	// compile templates for use
	var source   = $("#categoriesTemplate").html();
	categories_template = Handlebars.compile(source);

	source   = $("#gallery-template").html();
	gallery_template = Handlebars.compile(source);

	source   = $("#animal-template").html();
	animal_template = Handlebars.compile(source);

	// Filter menu for items
	showTemplate(categories_template, animals_data, "#categoryFilterContainer");


	$("#filterMenu").on("click", "a", function(e){
		// set the variables to store the index of the item to show;
		var id = $(this).data('id');
		var dataToShow = "";

		// For performace and not search all the document for active classes I am using find inside my #filterMenu
		$("#filterMenu").find(".active").removeClass("active");
		// Using closest for performace, but it does almost the same as parent, just that it searches for the closest parent with the markup.
		$(this).closest('li').addClass("active");

		
		if (id == -1) {
			dataToShow = animals_data;
		}else{
			var dataToShow = {category: [animals_data.category[id]]};
		}
		// debug ID clicked on console
		console.log("filter Id: " + id);
		// Start the webpage showing all the animals
		showTemplate(gallery_template, dataToShow, "#content");

		$(".photo-thumbnail").on("click", function(e){

			var categoryId = $(this).data("category-id");
			var animasId = $(this).data("animal-id");
			var categoryName = $(this).data("category-name");
			var dataToShow = {category: []}

			for (var i = 0; i < animals_data.category.length; i++) {
				if (animals_data.category[i].name == categoryName) {
					dataToShow.category.push(animals_data.category[i]);
				}
			}
			$(".active").removeClass("active");
			$("#filterMenu").find("a").each(function( index ) {
			  if ($(this).html() == categoryName) {
			  	$(this).closest('li').addClass('active');
			  }
			});;

			console.log("Category ID : " + categoryId );
			console.log("Animals ID : " + animasId );
			console.log("Category Name: " + categoryName);
			console.log(dataToShow);
			showTemplate(animal_template, dataToShow.category[0].animals[animasId], "#content");

			$(".back-button").on("click", function(e){
				$("#all-animals").click();
			})
		});
	});


	$("#all-animals").click();

});

