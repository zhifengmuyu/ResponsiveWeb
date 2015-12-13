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
	},
	update:function(userId, doc){
		if(Meteor.user())
		{
				return true;
		}
		return false;
	}
})

Comments.allow({
	insert:function(userId, doc){
		if(Meteor.user())
		{
			if(doc.commentBy === Meteor.user().username)
				return true;
		}
		return false;
	}
})