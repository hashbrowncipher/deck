'use strict';

let angular = require('angular');
require('./serverGroupAdvancedSettingsDirective.html');

describe('Directive: GCE Group Advanced Settings Selector', function() {

  beforeEach(
    window.module(
      require('./serverGroupAdvancedSettingsSelector.directive.js'),
      require('../../../core/forms/uiSelect.decorator')
    )
  );

  beforeEach(window.inject(function($rootScope, $compile) {
    this.scope = $rootScope.$new();
    this.scope.command = {instanceMetadata: [], tags: [], authScopes: []};
    this.elem = angular.element('<gce-server-group-advanced-settings-selector command="command"></gce-server-group-advanced-settings-selector>');
    this.element = $compile(this.elem)(this.scope);
    this.scope.$digest();
  }));

  it('should correctly add tags to the command', function() {
    expect(this.scope.command.tags.length).toEqual(0);

    this.elem.find('table.tags button').trigger('click');
    this.scope.$apply();
    expect(this.scope.command.tags.length).toEqual(1);

    this.elem.find('table.tags input').val('myTag').trigger('input');
    this.scope.$apply();

    expect(this.scope.command.tags.length).toEqual(1);
    expect(this.scope.command.tags[0].value).toEqual('myTag');
  });

  it('should correctly remove a tag from the command', function() {
    this.scope.command.tags.push({'value': 'myTag1'}, {'value': 'myTag2'});
    this.scope.$apply();

    var removeLinks = this.elem.find('table.tags a');
    expect(removeLinks.length).toEqual(2);

    $(removeLinks[0]).trigger('click');
    this.scope.$apply();

    expect(this.scope.command.tags.length).toEqual(1);
    expect(this.scope.command.tags[0].value).toEqual('myTag2');
  });
});
