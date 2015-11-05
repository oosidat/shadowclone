Meteor.publish('allResources', function() {
  return Resources.find({});
});

Meteor.publish('oneResource', function(rId) {
  return Resources.find({_id: rId});
});

Meteor.publish('allVersions', function() {
  return Versions.find({});
});

Meteor.publish('resourceVersion', function(vId) {
  return Versions.find({_id: vId});
});

Meteor.publish('resourceVersions', function(rId) {
  return Versions.find({resourceId: rId});
});
