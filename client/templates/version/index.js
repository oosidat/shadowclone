Template.versionList.helpers({
  versions: function() {
    return Versions.find({},{sort:{'submittedOn':-1}});
  }
});

Template.version.helpers({
  versions: function() {
    return Versions.find({},{sort:{'submittedOn':-1}});
  }
});
