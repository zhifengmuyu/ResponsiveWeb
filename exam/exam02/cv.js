        var index = 0;
		//show detail info when mouse hover over leftmenu
		$(".cv_subitem").hover(function(){
			$("#mainViewer").html($(this).html());
			index = Number($(this).attr("id").slice(-2));
		});

		//initial view when page load
		$("#mainViewer").html($(".cv_subitem")[0].innerHTML);
		
		//Navigate when per clicking position in main view.
		$("#mainViewer").click(function(event){
			if(event.offsetX < $(this).width()*0.3){ // going forware
			    index = index<=0 ? 0 : (index-1);
			}else{ //going backward
				index = index >= ($(".cv_subitem").length - 1) ? index : index+1;
			}
			//show the new one
			$("#mainViewer").html($(".cv_subitem")[index].innerHTML);
		})
		