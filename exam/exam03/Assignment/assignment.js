// put your javascript code here
var animal_template;
$(document).ready(function(){
	var source = $("#animal_classification").html();
	animal_template = Handlebars.compile(source);
	
	var content = animal_template(animals);
	$("#content").html(content);
	
}
)