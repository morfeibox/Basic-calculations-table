
$(document).ready(function () {

$("#out").contextmenu({
        delegate: ".hasmenu",
        menu: [
            {title: "Insert Row", cmd: "Insert Row"},
            {title: "Delete Row", cmd: "Delete Row"},
            {title: "Insert Column", cmd: "Insert Column"},
            {title: "Delete Column", cmd: "Delete Column"}
        ],
        select: function (event, ui) {
            contextMenu(ui);
        }
    });

});