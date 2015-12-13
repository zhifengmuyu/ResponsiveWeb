Websites = new Mongo.Collection("websites");
Comments = new Mongo.Collection("comments");

Websites.allow({
	insert:function(userId, doc){
		if(Meteor.user())
		{
			if(doc.createdBy === userId)
				return true;
		}
		return false;
	}
})

Comments.allow({
	insert:function(userId, doc){
		if(Meteor.user())
		{
			if(doc.createdBy === userId)
				return true;
		}
		return false;
	}
})