$(document).ready(function () {
    var url = "/menuData/side";
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'menu_Id' },
            { name: 'menu_Name' },
            { name: 'parent_Id' },
            { name: 'menu_Url' }
        ],
        id: 'menu_Id',
        url: url
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function (response) {
            records = dataAdapter.getRecordsHierarchy('menu_Id', 'parent_Id', 'items', [{ name: 'menu_Name', map: 'label' },
            { name: 'menu_Url', map: 'value' }, { name: 'parent_Id', map: 'parentId' }]);
            $("#jqxMenu").jqxMenu({
                source: records,
                width: '100%',
                height: '100%',
                mode: 'vertical'
            });
            $("#jqxMenu").css('visibility', 'visible');
            $("#jqxMenu").on('itemclick', function (event) {
                console.log(event);
                location.href = $(event.args).attr('item-value');
            });
        }
    });
    dataAdapter.dataBind();

});
