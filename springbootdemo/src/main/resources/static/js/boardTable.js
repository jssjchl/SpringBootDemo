
$(document).ready(function () {
    initComponent();
});
function initComponent() {
    var url = "/boardList";
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'boardId', type: 'int' },
            { name: 'title', type: 'String' },
            { name: 'fileId', type: 'int' },
            { name: 'fileName', type: 'String' },
            { name: 'register', type: 'String' },
        ],
        id: 'boardId',
        url: url
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        downloadComplete: function (data, status, xhr) { },
        loadComplete: function (data) { },
        loadError: function (xhr, status, error) { }
    });
    var rownumber = 0;

    var downloadLinkrenderer = function (row, column, value) {
        var s = "<div style='text-align:center; margin-top:10px;'>"
        if (value) {
            s += value + " <a href='/fileDownload/" + $('#grid').jqxGrid('getrowdata', row).fileId + "'><i class='fa fa-download' aria-hidden='true'></i></a>";
        }
        s += "</div>";
        return s;
    };
    var detailPagerenderer = function (row, column, value) {
        var s = "<div style='margin-top:15px;'>"
        if (value) {
            s += "<a style='text-decoration:none' href='/detail/" + $('#grid').jqxGrid('getrowdata', row).boardId + "'>" + value + "</a>";
        }
        s += "</div>";
        return s;

    };
    var noRenderer = function (row, column, value) {
        return "<div style='margin:4px;'>" + (value + 1) + "</div>";
    };

    $("#grid").jqxGrid(
        {
            width: "100%",
            source: dataAdapter,
            pageable: true,
            autoheight: true,
            sortable: true,
            altrows: true,
            enabletooltips: true,
            editable: false,
            filterable: true,
            showtoolbar: true,

            selectionmode: 'multiplecellsadvanced',
            rendertoolbar: function (toolbar) {
                var me = this;
                var rownumber = 1;

                var container = $("<div style='margin: 5px;'></div>");
                toolbar.append(container);
                container.append('<input id="regist" align ="right" type="button" value="Regist" />');
                $("#regist").jqxButton();
                $("#regist").on('click', function () {
                    location.href = "/regist"
                });
            },
            columns: [
                { text: 'No', datafield: '', columntype: 'number', width: 150, cellsrenderer: noRenderer },
                { text: 'Title', datafield: 'title',  width: 350, cellsrenderer: detailPagerenderer },
                { text: 'Attached File', datafield: 'fileName', width: 350, cellsrenderer: downloadLinkrenderer },
                { text: 'Register', datafield: 'register', cellsalign: 'right' }
            ],
        });
}
