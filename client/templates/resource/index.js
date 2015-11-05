// Template.useResource.events({
//   'submit form': function() {
//     event.preventDefault();
//     let name = event.target.resourceName.value;
//     let branchName = event.target.usage.value;
//     let lastCommit = event.target.lastCommit.value;
//
//     let resourceId = Resources.insert({
//       name: name,
//       branch: branchName,
//       lastCommit: lastCommit
//     });
//
//
//     event.target.usage.value = '';
//   }
// });

// Template.resource.helpers({
//   getResource: function() {
//     return Resources.findOne();
//   },
//   getLastVersionContent: function(versionId) {
//     let v = Versions.findOne({_id: versionId});
//     if (v === undefined) {
//       return;
//     } else {
//       return v.content;
//     }
//   }
// });

// Template.useResource.helpers({
//   getResource: function() {
//     return Resources.findOne();
//   }
// });

Template.resourceList.helpers({
  resources: function() {
    return Resources.find({},{sort:{'submittedOn':-1}});
  }
});
