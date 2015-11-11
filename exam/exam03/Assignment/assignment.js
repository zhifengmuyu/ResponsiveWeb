// put your javascript code here
var animal_template;

//function called when 2nd breadcrumb clicked
function loadClassAnimal(class_index){
		var source = $("#class_of_animal").html();
		animal_template = Handlebars.compile(source);

		//check whether function is called from breadcrumbs or from clicking the image.
		if(typeof(class_index) != "number")//if it is called from image, class_index need to be extracted from id attribute
			class_index = parseInt($(this).attr("id"));
			
		var content = animal_template(animals.class[class_index]);
		$("#content").html(content);
		
		//no breadcrumb needed it is already there
		$("#animal_class").text(animals.class[class_index].name);
		
		//after second level of template instantiated, js added 
		$(".zoo_animal_image").click(function(){
			var source = $("#individual_animal").html();
			animal_template = Handlebars.compile(source);

			species_index = parseInt($(this).attr("id"));
			var content = animal_template(animals.class[class_index].animals[species_index]);
			$("#content").html(content);
		
			//sub breadcrumb automatically built
			$("#animal_class").text(animals.class[class_index].name);
			$("#animal_class").attr("onclick", "loadClassAnimal(" + class_index + ")");
			$("#animal_species").text(animals.class[class_index].animals[species_index].name);
		})
	}

function loadZooAnimals(){
	//add breadcrumb
	$(".breadcrumb").html("<li><a href='#'>Animal</a></li>")
	
	//instantiate the template
	var source = $("#animal_classification").html();
	animal_template = Handlebars.compile(source);
	
	var content = animal_template(animals);
	$("#content").html(content);
	
	//after above template is instantiated, js can be added
	$(".zoo_class_image").click(loadClassAnimal)

}

$(document).ready(loadZooAnimals);
