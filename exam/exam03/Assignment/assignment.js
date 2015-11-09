// put your javascript code here
var animal_template;
$(document).ready(function(){
	//add breadcrumb
	$(".breadcrumb").html("<li><a href='#'>Animal</a></li>")
	
	//instantiate the template
	var source = $("#animal_classification").html();
	animal_template = Handlebars.compile(source);
	
	var content = animal_template(animals);
	$("#content").html(content);
	
	//after above template is instantiated, js can be added
	$(".zoo_class_image").click(function(){
		var source = $("#class_of_animal").html();
		animal_template = Handlebars.compile(source);

		var content = animal_template(animals.class[parseInt($(this).attr("id"))]);
		var class_index = parseInt($(this).attr("id"))
		$("#content").html(content);
		
		//after second level of template instantiated, js added 
		$(".zoo_animal_image").click(function(){
			var source = $("#individual_animal").html();
			animal_template = Handlebars.compile(source);

			var content = animal_template(animals.class[class_index].animals[parseInt($(this).attr("id"))]);
			$("#content").html(content);
			
			$("#animal_class").text(animals.class[class_index].name);
		})
		
		
	})
	
	
}
);
