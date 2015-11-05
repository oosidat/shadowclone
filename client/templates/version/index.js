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

Template.versionDetail.helpers({
  isReady: function(sub) {
    if(sub) {
      return FlowRouter.subsReady(sub);
    } else {
      return FlowRouter.subsReady();
    }
  },
  getVersion: function() {
    return Versions.findOne({_id: FlowRouter.getParam('vId')});
  },
  getParents: function() {
    return Versions.find({_id: {$nin: [FlowRouter.getParam('vId')]}});
  }
});
