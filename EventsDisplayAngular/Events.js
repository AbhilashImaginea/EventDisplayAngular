(function () {
    var myEventsApp = angular.module("myEventsApp", []);
    myEventsApp.controller("myEventsController", function () {
        this.events = oEventsData.Events;
        this.isGalleryView = true;
        this.setGalleryView = function (value) {
            this.isGalleryView = value;
        };
        this.isHomeView = true;
        this.setHomeView = function (value) {
            this.isHomeView = value;
        };
        this.isOverlayView = false;
        this.setOverlayView = function (value) {
            this.isOverlayView = value;
        };  
        this.currentEvent = 1;
        this.setCurrentEvent = function (value) {
            this.currentEvent = value;
        };
        this.currentOverlay = 1;
        this.setCurrentOverlay = function (value) {
            this.currentOverlay = value;
        };
    });
    myEventsApp.directive("eventHomepage", function () {
        return {
            restrict: "E",
            templateUrl: "event-homePage.html"
        };
    });
    myEventsApp.directive("eventDescription", function () {
        return {
            restrict: "E",
            templateUrl: "event-description.html"
        };
    });
})();