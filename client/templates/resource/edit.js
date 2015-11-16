
function getVersion(versionId) {
  return Versions.findOne({_id: versionId});
}

function getResourceById() {
  return Resources.findOne(FlowRouter.getParam('rId'));
}

function getBranchName() {
  return FlowRouter.getParam('branchName');
}

Template.editResource.helpers({
  getResource: function() {
    return getResourceById();
  },
  getBranch: function() {
    let branchName = getBranchName();
    let resource = getResourceById();
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
    let rId = event.target.resourceId.value;
    let branchName = getBranchName();

    let text = event.target.resourceContent.value;
    let set = {};

    if (event.target.submitted === 'Save Edit') {
      console.log('submitting...');

      let versionId = Versions.insert({
        content: text,
        parent: currentVersion,
        created: new Date(),
      });

      set['heads.' + branchName] = versionId;
      Resources.update({_id: rId,}, {$set: set});
      currentVersion = versionId;

    } else if (event.target.submitted === 'Use') {
      console.log('branching/using...');

      let newBranchName = event.target.branchName.value;

      set['heads.' + newBranchName] = currentVersion;
      Resources.update({_id: rId,}, {$set: set});
      branchName = newBranchName;

    } else if (event.target.submitted === 'Consume') {
      console.log('consuming...');

      let consumeName = event.target.consumeName.value;

      let resource = {
        name: consumeName,
        heads: {
          master: currentVersion
        },
        upstream: {
          id: rId,
          branch: branchName
        }
      };

      rId = Resources.insert(resource);
      branchName = 'master';

    }

    let params = {rId: rId, vId: currentVersion, branchName: branchName};
    let newUrl = FlowRouter.path('resourceVersionEdit', params);
    FlowRouter.go(newUrl);
  }
});
