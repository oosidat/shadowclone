Meteor.publish('allResources', function() {
  return Resources.find({});
});

Meteor.publish('oneResource', function(rId) {
  return Resources.find({_id: rId});
});

Meteor.publish('allVersions', function() {
  return Versions.find({});
});

Meteor.publish('oneVersion', function(vId) {
  var version = Versions.find({_id: vId});
  if(version) {
    return version;
  }

  return this.ready();
});

Meteor.publish('parentVersions', function(vId) {
  let current = Versions.find({_id: vId});
  let parents = [];
  if(current.parent) {
    return Versions.find({_id: current.parent});
  }
});

Meteor.publish('resourceVersion', function(vId) {
  return Versions.find({_id: vId});
});
