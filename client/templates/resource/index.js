Template.createResource.events({
  'submit form': function () {
    event.preventDefault();
    let name = event.target.resourceName.value;
    let text = event.target.resourceText.value;

    let versionId = Versions.insert({
      content: text,
      parent: null
    });

    let resourceId = Resources.insert({
      name: name,
      branch: 'master',
      head: versionId
    });

    event.target.resourceName.value = '';
    event.target.resourceText.value = '';
  }
});

Template.editResource.events({
  'submit form': function () {
    event.preventDefault();
    let name = event.target.resourceName.value;
    let text = event.target.resourceContent.value;
    let rId = event.target.resourceId.value;

    let versionId = Versions.insert({
      content: text,
      resourceId: rId
    });

    Resources.update({
      _id: rId,
    }, {
      $set: {
        name: name,
        lastCommit: versionId
      }
    });
    //
    event.target.resourceName.value = name;
    event.target.resourceContent.value = text;
  }
});

Template.useResource.events({
  'submit form': function() {
    event.preventDefault();
    let name = event.target.resourceName.value;
    let branchName = event.target.usage.value;
    let lastCommit = event.target.lastCommit.value;

    let resourceId = Resources.insert({
      name: name,
      branch: branchName,
      lastCommit: lastCommit
    });


    event.target.usage.value = '';
  }
});

Template.resource.helpers({
  getResource: function() {
    return Resources.findOne();
  },
  getLastVersionContent: function(versionId) {
    let v = Versions.findOne({_id: versionId});
    if (v === undefined) {
      return;
    } else {
      return v.content;
    }
  }
});

Template.useResource.helpers({
  getResource: function() {
    return Resources.findOne();
  }
});

Template.editResource.helpers({
  getResource: function() {
    return Resources.findOne();
  },
  getLastVersionContent: function(versionId) {
    let v = Versions.findOne({_id: versionId});
    if (v === undefined) {
      return;
    } else {
      return v.content;
    }
  }
});

Template.resourceList.helpers({
  resources: function() {
    return Resources.find({},{sort:{'submittedOn':-1}});
  }
});
