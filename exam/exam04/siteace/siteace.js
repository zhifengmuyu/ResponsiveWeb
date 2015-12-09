Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

if (Meteor.isClient) {

	Router.configure({
		layoutTemplate: 'AppLayout'
	});
	
	Router.route('/',function(){
		this.render('navigator', {to: 'nav'});
		this.render('web_sites', {to: 'main'});
		});

	Router.route('/detail/:_id',function(){
		this.render('navigator', {to: 'nav'});
		this.render('one_website',
		{	to: 'main',
			data:function(){ return Websites.findOne({_id:this.params._id});}})
	});

	/////
	// template helpers 
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({},{sort:{total:-1, createdOn:-1}});

			//return Websites.aggregate(    [        $project: {            sum: { $add: [ "$upvote", "$downvote"] }        },        $sort: {            sum: -1        }    ]);

		}
	});

    //configure user login ui
    Accounts.ui.config({passwordSignupFields: 'USERNAME_AND_EMAIL'});

	/////
	// template events 
	/////

	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
			var newvote = 1 + Websites.findOne({_id:website_id}).upvote;
			var newtotal = 1 + Websites.findOne({_id:website_id}).total;

            console.log(newtotal);
			if(Meteor.user()){
				Websites.update({_id:website_id},{$set:{upvote:newvote}});
				Websites.update({_id:website_id},{$set:{total:newtotal}});
			}
			else
				alert("To Vote, You need to login first!");
			return false;// prevent the button from reloading the page
		}, 
		"click .js-downvote":function(event){

			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Down voting website with id "+website_id);

			// put the code in here to remove a vote from a website!
			var newvote = 1 + Websites.findOne({_id:website_id}).downvote;
			var newtotal = - 1 + Websites.findOne({_id:website_id}).total;

                        console.log(newtotal);
			if(Meteor.user()){
				Websites.update({_id:website_id},{$set:{downvote:newvote}});
				Websites.update({_id:website_id},{$set:{total:newtotal}});
			}
			else
				alert("To Vote, You need to login first!");
			return false;// prevent the button from reloading the page
		}
	});

	Template.one_website.events({
		"submit .js-add-comments":function(event){
			if(Meteor.user()){
				alert(event.target.website_id.value);
//				Website.insert({website:
	//							comments: event.target.comments.value,
		//						commentBy: Meteor.user()._id,
			//					commentOn: new Date()});
			}
		}
	});
	
	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").toggle('slow');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			console.log("The url they entered is: "+url);
			
			//  put your website saving code in here!
			var url = event.target.url.value;
			var title = event.target.title.value;
			var desc = event.target.description.value;
			var user = Meteor.user()._id;

			if(Meteor.user()) {
				Websites.insert({
				title:title,
				url:url,
				description:desc,
				createdOn:new Date(),
				createdBy:user,
				upvote:Number(0),
				downvote:Number(0),
				total:Number(0)
        	                })
			}

			return false;// stop the form submit from reloading the page

		}
	});
}


if (Meteor.isServer) {
	// start up function that creates entries in the Websites databases.
  Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
    	console.log("No websites yet. Creating starter data.");
    	  Websites.insert({
    		title:"Goldsmiths Computing Department", 
    		url:"http://www.gold.ac.uk/computing/", 
    		description:"This is where this course was developed.", 
    		createdOn:new Date(),
		upvote:Number(0),
		downvote:Number(0),
		total:Number(0)
    	});
    	 Websites.insert({
    		title:"University of London", 
    		url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
    		description:"University of London International Programme.", 
    		createdOn:new Date(),
		upvote:Number(0),
		downvote:Number(0),
		total:Number(0)
    	});
    	 Websites.insert({
    		title:"Coursera", 
    		url:"http://www.coursera.org", 
    		description:"Universal access to the world’s best education.", 
    		createdOn:new Date(),
		upvote:Number(0),
		downvote:Number(0),
		total:Number(0)
    	});
    	Websites.insert({
    		title:"Google", 
    		url:"http://www.google.com", 
    		description:"Popular search engine.", 
    		createdOn:new Date(),
		upvote:Number(0),
		downvote:Number(0),
		total:Number(0)

    	});
    }
  });

//test
//  	var result = HTTP.get("http://www.baidu.com",{headers:{Access-Control-Allow-Origin: "http://www.baidu.com"}},function(error, result){
//		/if(!error)  console.log(result.content);
//        });

}
