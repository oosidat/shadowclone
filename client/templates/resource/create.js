Template.createResource.events({
  'submit form': function () {
    event.preventDefault();
    let name = event.target.resourceName.value;
    let text = event.target.resourceText.value;

    let versionId = Versions.insert({
      content: text,
      created: new Date(),
      parent: null,
    });

    let resource = {
      name: name,
      heads: {
        master: versionId
      },
      upstream: null
    };

    let resourceId = Resources.insert(resource);

    event.target.resourceName.value = '';
    event.target.resourceText.value = '';
  }
});
