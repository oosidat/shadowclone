Template.createResource.events({
  'submit form': function () {
    event.preventDefault();
    let name = event.target.resourceName.value;
    let text = event.target.resourceText.value;

    Resources.insert({
      name: name,
      text: text
    });

    event.target.resourceName.value = '';
    event.target.resourceText.value = '';
  }
});

Template.resource.helpers({
  getResource: function() {
    return Resources.findOne();
  }
});

Template.resourceList.helpers({
  resources: function() {
    return Resources.find({},{sort:{'submittedOn':-1}});
  }
});
