Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

if (Meteor.isClient) {
	Router.configure({
		layoutTemplate: 'AppLayout'
	});
	
	Router.route('/',function(){
        console.log("test");
		this.render('navigator', {to: 'nav'});
		this.render('web_sites', {to: 'main'});
		});

	Router.route('/detail/:_id',function(){
		this.render('navigator', {to: 'nav'});
		this.render('one_website',
		{	to: 'main',
			data: function(){ 
										return {title: Websites.findOne({_id:this.params._id}).title,
										  description: Websites.findOne({_id:this.params._id}).description,
										  website_id: this.params._id,
										  comments: Comments.find({website: this.params._id})
										 };
                                    }
                }          )
	});

	/////
	// template helpers 
//                                                  description: Websites:findOne({_id:this.params._id}),
	/////

	// helper function that returns all available websites
	Template.website_list.helpers({
		websites:function(){
			return Websites.find({},{sort:{total:-1, createdOn:-1}});
		},
		isEven:function(index){
			if(index%2 == 0)
				return true;
			else
				return false;
		}
	});
       
    //configure user login ui
    Accounts.ui.config({passwordSignupFields: 'USERNAME_AND_EMAIL'});

	/////
	// template events 
	/////
	Template.web_sites.events({
		"submit .js-search-website":function(event){
			var keys = event.target.keyword.value;

			alert(keys);
			var res = Websites.find({$or:[{title: new RegExp(keys,"i")}, {description: new RegExp(keys, "i")}]});
			
		    console.log(res.count());
			return false;
		}
	});
	
	Template.website_item.events({
		"click .js-upvote":function(event){
			// example of how you can access the id for the website in the database
			// (this is the data context for the template)
			var website_id = this._id;
			console.log("Up voting website with id "+website_id);
			// put the code in here to add a vote to a website!
			var newvote = 1 + Websites.findOne({_id:website_id}).upvote;
			var newtotal = 1 + Websites.findOne({_id:website_id}).total;

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
				console.log(Comments);
			if(Meteor.user()){
				Comments.insert({website: event.target.website_id.value,
						comment: event.target.comment.value,
						commentBy: Meteor.user().username,
						commentOn: new Date()});
				console.log("this is " + event.target.website_id.value);
			}
			return false;
		}
	});
	
	Template.website_form.events({
		"click .js-toggle-website-form":function(event){
			$("#website_form").modal('show');
		}, 
		"submit .js-save-website-form":function(event){

			// here is an example of how to get the url out of the form:
			var url = event.target.url.value;
			Meteor.call('getWebDetail', url, function(error,result){
					//  put your website saving code in here!
					var url = event.target.url.value;
					var title = event.target.title.value;
					var desc = result;
					var user = Meteor.user()._id;
					//console.log(result);
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
				});
			$("#website_form").modal('hide');
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

  
  Meteor.methods({
  getWebDetail: function (url) {
	var result = HTTP.get(url);
	if (result.statusCode < 300 || result.statusCode == 304){
		var title = result.content.split(/<title>|<\/title>/);
		console.log(title[1]);
		return title[1];//result.content;
	}
	else
	    return "No Description";


  },
});

}
