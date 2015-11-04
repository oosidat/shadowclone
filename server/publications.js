Meteor.publish('allResources', function() {
  return Resources.find({});
})

Meteor.publish('oneResource', function(rId) {
  return Resources.find({_id: rId});
})
