var oEvents = {
    bIsGallery: 1,
    display: function (oEvents) {
        $("#eventsDetails").html('');
        if (this.bIsGallery) {
            $.each(oEvents, function (key, value) {
                var oContainer, oOverlayDiv;
                if (key > 4) {
                    oContainer = $("<div class='col-md-3 col-sm-6'></div>");
                } else {
                    oContainer = $("<div class='col-md-4 col-sm-6'></div>");
                }

                oContainer.append("<img src='" + value.Image + "' alt='" + value.Name + "'  class='eventGalleryImages'>");
                oOverlayDiv = $("<div class='overlay' data-value=" + value.ID + "></div>");
                oOverlayDiv.append("<h4>" + value.Name + "</h4>" +
                    "<p>" + value.Time + "</p>" +
                    "<p>" + value.Venue + "</p>");
                oContainer.append(oOverlayDiv);
                $("#eventsDetails").append(oContainer);
            });
        } else {
            var oDetailsDiv, oMainContainer = $("<ul class='list-unstyled'></ul>");
            $.each(oEvents, function (key, value) {
                var oContainer, oOverlayDiv;
                oContainer = $("<li class='eventList' data-value=" + value.ID + "></li>");
                oContainer.append("<div class='col-md-3 col-sm-3 hidden-xs'><img src='" + value.Image +
                    "' alt='" + value.Name + "'  class='eventListImages'></div>");
                oDetailsDiv = $("<div data-value=" + value.ID + "></div>");
                oDetailsDiv.append("<h3>" + value.Name + "</h3>" +
                    "<p>" + value.Time + "</p>" +
                    "<p>" + value.Venue + "</p>");
                oContainer.append(oDetailsDiv);
                oMainContainer.append(oContainer);

            });
            $("#eventsDetails").append(oMainContainer);
        }
    },
    onEventClick: function (target) {
        var arrResults, oEvent, oContainer, oDetailsDiv;
        arrResults = $.grep(oEventsData.Events, function (e) {
            return e.ID === target.attr("data-value");
        });
        if (arrResults.length > 0) {
            oEvent = arrResults[0];
            $("#eventDescription").html('');
            oContainer = $("<div class='col-md-4 col-sm-5'></div>");
            oContainer.append("<img src=" + oEvent.Image + " alt=" + oEvent.Name + ">");
            oDetailsDiv = $("<div class='col-md-6 col-sm-6'>");
            oDetailsDiv.append("<h3>" + oEvent.Name + "</h3>" +
                "<span><strong>What</strong><p>" + oEvent.Description + "</p></span>" +
                "<span><strong>When</strong><p>" + oEvent.Time + "</p></span>" +
                "<span><strong>Where</strong><p>" + oEvent.Venue + "</p></span>");
            $("#eventDescription").append(oContainer);
            $("#eventDescription").append(oDetailsDiv);
            $("#homePage").hide();
            $("#descriptionPage").show();
        }
    },
    search: function () {
        var arrResults, sSearchText = $("#searchText").val().toLowerCase();
        if (sSearchText !== '') {
            arrResults = $.grep(oEventsData.Events, function (e) {
                return e.Name.toLowerCase().indexOf(sSearchText) >= 0;
            });
            if (arrResults.length > 0) {
                oEvents.display(arrResults);
            } else {
                $("#eventsDetails").html("<h3>No events found :(</h3>");
            }
        } else {
            oEvents.display(oEventsData.Events);
        }
    }
};

$(document).ready(function () {
    oEvents.display(oEventsData.Events);

    $(".navbar-brand").click(function () {
        oEvents.display(oEventsData.Events);
        $("#homePage").show();
        $("#descriptionPage").hide();
    });


    $("#galleryButton").click(function () {
        oEvents.bIsGallery = 1;
        oEvents.display(oEventsData.Events);
    });

    $("#listButton").click(function () {
        oEvents.bIsGallery = 0;
        oEvents.display(oEventsData.Events);
    });


    $("#eventsDetails").on("mouseover", ".eventGalleryImages", function (event) {
        $(this).parent().find(".overlay").show();
    });

    $("#eventsDetails").on("mouseleave", ".overlay", function (event) {
        $(".overlay").hide();
    });

    $("#eventsDetails").on("click", ".overlay, .eventList", function (event) {
        oEvents.onEventClick($(this));
    });

    $("#searchButton").click(function () {
        oEvents.search();
    });
});