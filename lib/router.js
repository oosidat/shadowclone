FlowRouter.route( '/', {
  subscriptions: function(params, queryParams) {
    this.register('resources', Meteor.subscribe('allResources'));
    this.register('versions', Meteor.subscribe('allVersions'));
  },
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'home'});
  },
  name: 'home'
});

FlowRouter.route( '/resources', {
  subscriptions: function(params, queryParams) {
    this.register('resources', Meteor.subscribe('allResources'));
  },
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'resourceList'});
  },
  name: 'resources'
});

FlowRouter.route( '/versions/:vId', {
  subscriptions: function(params, queryParams) {
    this.register('version', Meteor.subscribe('oneVersion', params.vId));
    this.register('parentVersions', Meteor.subscribe('parentVersions', params.vId));
  },
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'versionDetail'});
  },
  name: 'versionDetail'
});

FlowRouter.route( '/resources/:rId/edit/:vId', {
  subscriptions: function(params, queryParams) {
    this.register('resources', Meteor.subscribe('oneResource', params.rId));
    this.register('versions', Meteor.subscribe('resourceVersion', params.vId));
  },
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'editResource'});
  },
  name: 'resourceVersionEdit'
});

FlowRouter.route( '/resources/create', {
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'createResource'});
  },
  name: 'createresource'
});


FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('notfound');
  }
};
