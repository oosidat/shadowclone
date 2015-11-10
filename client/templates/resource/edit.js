
function getVersion(versionId) {
  return Versions.findOne({_id: versionId});
}

Template.editResource.helpers({
  getResource: function() {
    return Resources.findOne(FlowRouter.getParam('rId'));
  },
  getBranch: function() {
    let branchName = FlowRouter.getParam('branchName');
    let resource = Resources.findOne(FlowRouter.getParam('rId'));
    let branch;
    if(branchName) {
      branch = {
        name: branchName,
        version: resource.heads[branchName]
      };
    } else {
      branch = {
        name: 'master',
        version: resource.heads.master
      };
    }
    return branch;
  },
  getVersion: function() {
    let vId = FlowRouter.getParam('vId');
    return getVersion(vId);
  }
});

Template.editResource.events({
  'submit form': function (event, template) {

    event.preventDefault();
    let currentVersion = event.target.resourceVersion.value;
    let text = event.target.resourceContent.value;
    let rId = event.target.resourceId.value;
    let branchName = FlowRouter.getParam('branchName');

    if (event.target.submitted === 'Save Edit') {
      console.log('submitting...');

      let set = {};
      let versionId = Versions.insert({
        content: text,
        parent: currentVersion,
        created: new Date(),
      });

      set['heads.' + branchName] = versionId;

      Resources.update({_id: rId,}, {$set: set});

      let params = {rId: rId, vId: versionId, branchName: newBranchName};
      let newUrl = FlowRouter.path('resourceVersionEdit', params);

      FlowRouter.go(newUrl);

    } else if (event.target.submitted === 'Use') {
      console.log('branching/using...');

      let set = {};
      let newBranchName = event.target.branchName.value;

      set['heads.' + newBranchName] = currentVersion;

      Resources.update({_id: rId,}, {$set: set});

      let params = {rId: rId, vId: currentVersion, branchName: newBranchName};
      let newUrl = FlowRouter.path('resourceVersionEdit', params);

      FlowRouter.go(newUrl);
    }
  }
});
