FlowRouter.route( '/', {
  subscriptions: function(params, queryParams) {
    this.register('resources', Meteor.subscribe('allResources'));
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
  },
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'resource'});
  },
  name: 'resource'
});

FlowRouter.route( '/resources/create', {
  action: function() {
    BlazeLayout.render('applicationLayout', {main: 'createResource'});
  },
  name: 'createresource'
});
