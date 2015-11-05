
function getVersion(versionId) {
  return Versions.findOne({_id: versionId});
}

Template.editResource.helpers({
  getResource: function() {
    return Resources.findOne();
  },
  getVersion: function() {
    let vId = FlowRouter.getParam('vId');
    return getVersion(vId);
  },
  getContent: function() {
    var head = getVersion(this.head);
    if(head) {
      return head.content;
    } else {
      return;
    }
  },
  isHeadCurrent: function(head, currentVersion) {
    return head === currentVersion;
  }
});

Template.editResource.events({
  'submit form': function (event, template) {

    event.preventDefault();

    let name = event.target.resourceName.value;
    let currentVersion = event.target.resourceVersion.value;
    let text = event.target.resourceContent.value;
    let rId = event.target.resourceId.value;

    if (event.target.submitted === 'Publish') {
      console.log('publishing...');
      Resources.update({
        _id: rId,
      }, {
        $set: {
          head: currentVersion
        }
      });
      FlowRouter.reload();

    } else if (event.target.submitted === 'Submit') {
      console.log('submitting...');
      let versionId = Versions.insert({
        content: text,
        parent: currentVersion,
        created: new Date(),
      });

      let newUrl = '/resources/' + rId + '/edit/' + versionId;
      FlowRouter.go(newUrl);

    } else if (event.target.submitted === 'Branch') {
      console.log('branching...');

      let branchName = event.target.branchName.value;

      let rId = Resources.insert({
        name: name,
        upstream: rId,
        head: currentVersion,
        branch: branchName
      });

      let newUrl = '/resources/' + rId + '/edit/' + currentVersion;
      FlowRouter.go(newUrl);
    }
  }
});
