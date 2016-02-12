(function() {
  require(["jquery", "backbone", "coffee/src/main", "common/js/spec_helpers/ajax_helpers", "jasmine-stealth", "jquery.cookie"], function($, Backbone, main, AjaxHelpers) {
    describe("CMS", function() {
      return it("should initialize URL", function() {
        return expect(window.CMS.URL).toBeDefined();
      });
    });
    describe("main helper", function() {
      beforeEach(function() {
        this.previousAjaxSettings = $.extend(true, {}, $.ajaxSettings);
        spyOn($, "cookie");
        $.cookie.when("csrftoken").thenReturn("stubCSRFToken");
        return main();
      });
      afterEach(function() {
        return $.ajaxSettings = this.previousAjaxSettings;
      });
      it("turn on Backbone emulateHTTP", function() {
        return expect(Backbone.emulateHTTP).toBeTruthy();
      });
      return it("setup AJAX CSRF token", function() {
        return expect($.ajaxSettings.headers["X-CSRFToken"]).toEqual("stubCSRFToken");
      });
    });
    return describe("AJAX Errors", function() {
      beforeEach(function() {
        return appendSetFixtures(sandbox({
          id: "page-notification"
        }));
      });
      it("successful AJAX request does not pop an error notification", function() {
        var server;
        server = AjaxHelpers.server(this, [200, {}, '']);
        expect($("#page-notification")).toBeEmpty();
        $.ajax("/test");
        expect($("#page-notification")).toBeEmpty();
        server.respond();
        return expect($("#page-notification")).toBeEmpty();
      });
      it("AJAX request with error should pop an error notification", function() {
        var server;
        server = AjaxHelpers.server(this, [500, {}, '']);
        $.ajax("/test");
        server.respond();
        expect($("#page-notification")).not.toBeEmpty();
        return expect($("#page-notification")).toContain('div.wrapper-notification-error');
      });
      return it("can override AJAX request with error so it does not pop an error notification", function() {
        var server;
        server = AjaxHelpers.server(this, [500, {}, '']);
        $.ajax({
          url: "/test",
          notifyOnError: false
        });
        server.respond();
        return expect($("#page-notification")).toBeEmpty();
      });
    });
  });

}).call(this);
