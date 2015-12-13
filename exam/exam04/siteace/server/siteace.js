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
