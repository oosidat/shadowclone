
function getVersion(versionId) {
  return Versions.findOne({_id: versionId});
}

Template.editResource.helpers({
  getResource: function() {
    return Resources.findOne();
  },
  getHeadVersion: function() {
    return getVersion(this.head);
  },
  getContent: function() {
    var head = getVersion(this.head);
    if(head) {
      return head.content;
    } else {
      return;
    }
  }
});

Template.editResource.events({
  'submit form': function (event, template) {
    event.preventDefault();

    let name = event.target.resourceName.value;
    let currentHead = event.target.resourceHead.value;
    let text = event.target.resourceContent.value;
    let rId = event.target.resourceId.value;

    let versionId = Versions.insert({
      content: text,
      parent: currentHead
    });

    Resources.update({
      _id: rId,
    }, {
      $set: {
        name: name,
        head: versionId
      }
    });

    let newUrl = '/resources/' + rId + '/edit/' + versionId;
    FlowRouter.go(newUrl);
  }
});
