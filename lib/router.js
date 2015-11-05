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

FlowRouter.route( '/resources/:rId', {
  subscriptions: function(params, queryParams) {
    this.register('resources', Meteor.subscribe('oneResource', params.rId));
    this.register('versions', Meteor.subscribe('resourceVersions', params.rId));
  },
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'resource'});
  },
  name: 'resource'
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

FlowRouter.route( '/resources/:rId/edit', {
  subscriptions: function(params, queryParams) {
    this.register('resources', Meteor.subscribe('oneResource', params.rId));
    this.register('versions', Meteor.subscribe('resourceVersions', params.rId));
  },
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'editResource'});
  },
  name: 'resourceEdit'
});

FlowRouter.route( '/resources/:rId/use', {
  subscriptions: function(params, queryParams) {
    this.register('resources', Meteor.subscribe('oneResource', params.rId));
    this.register('versions', Meteor.subscribe('resourceVersions', params.rId));
  },
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'useResource'});
  },
  name: 'resourceUse'
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
