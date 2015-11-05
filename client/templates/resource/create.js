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
