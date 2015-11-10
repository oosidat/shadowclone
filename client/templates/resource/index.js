Template.resourceList.helpers({
  resources: function() {
    return Resources.find({},{sort:{'submittedOn':-1}});
  }
});

Template.resourceCompact.helpers({
  getHeads: function(heads) {
    let headList = [];
    for(let key in heads) {
      let val = heads[key];
      headList.push({
        branch: key,
        version: val
      });
    }
    return headList;
  }
});
