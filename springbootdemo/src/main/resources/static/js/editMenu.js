$(document).ready(function () {
    initComponent();
});

function initComponent() {
    var url = "/menuData";
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'menu_Id' },
            { name: 'menu_Name' },
            { name: 'parent_Id' },
            { name: 'value' }
        ],
        id: 'menu_Id',
        url: url
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
            var records = dataAdapter.getRecordsHierarchy('menu_Id', 'parent_Id', 'items', [{ name: 'menu_Name', map: 'label' }]);
            console.log(records);
            $('#jqxMenuTree').jqxTree({ source: records, width: '100%' });
        }
    });
    dataAdapter.dataBind();
    var layout = [{
        type: 'layoutGroup',
        orientation: 'horizontal',
        items: [{
            type: 'layoutGroup',
            width: 500,
            alignment: 'left',
            items: [{
                type: 'documentGroup',
                height: 780,
                minHeight: 200,
                items: [{
                    type: 'documentPanel',
                    title: 'Menu',
                    contentContainer: 'menuTree'
                }]
            }]
        }, {
            type: 'documentGroup',
            width: 1030,
            minWidth: 200,
            items: [{
                type: 'documentPanel',
                title: 'Menu Edit Form',
                contentContainer: 'editMenuForm',
                initContent: function () {
                    var item = $('#jqxMenuTree').jqxTree('getSelectedItem');
                    menu_Name = item.label;
                    console.log(item.label);
                    $('#menuForm').jqxForm({
                        template: [
                            {
                                bind: 'parent_Menu'
                                , name: 'parent_Menu'
                                , type: 'text'
                                , label: 'Parent Menu'
                                , labelWidth: '80px'
                                , width: '250px'
                            },
                            {
                                bind: 'menu_Name'
                                , name: 'menu_Name'
                                , type: 'text'
                                , label: 'Menu Name'
                                , labelWidth: '80px'
                                , width: '250px'
                            },
                            {
                                bind: 'parent_Id'
                                , name: 'parent_Id'
                                , type: 'text'
                                , label: 'Menu URL'
                                , labelWidth: '80px'
                                , width: '250px'
                            },
                            {
                                columns: [
                                    {
                                        bind: 'add'
                                        , name: 'add'
                                        , type: 'button'
                                        , text: 'ADD'
                                        , width: '150px'
                                        , height: '30px'
                                        , rowHeight: '40px'
                                        , columnWidth: '50%'
                                        , align: 'right'
                                    },
                                    {
                                        bind: 'edit'
                                        , name: 'edit'
                                        , type: 'button'
                                        , text: 'Edit'
                                        , width: '150px'
                                        , height: '30px'
                                        , rowHeight: '40px'
                                        , columnWidth: '50%'
                                    }
                                ],

                            }
                        ]
                    });
                }
            }]
        }]
    }];
    $('#jqxLayout').jqxLayout({ width: 1530, height: 780, layout: layout });
    initEvent();
}

function initEvent() {

    $('#jqxMenuTree').on('itemClick', function (event) {
        var args = event.args;
        var item = $('#jqxMenuTree').jqxTree('getItem', args.element);
        var selectData = {
            menu_Name: item.label
            , menu_Url: item.value
            , menu_Id: item.id
            , parent_Id: item.parentId
            , parent_Menu: '/'
        };

        if ($('#jqxMenuTree').jqxTree('getItem', item.parentElement)) {
            selectData['parent_Menu'] = $('#jqxMenuTree').jqxTree('getItem', item.parentElement).label;
        }
        console.log(selectData);
    });

    $('#menuForm').jqxForm('getComponentByName', 'add').on('click', function () {
        var menuName = $('#menuForm').jqxForm('getComponentByName', 'menu_Name');
        var selectedItem = $('#jqxMenuTree').jqxTree('selectedItem');
        if (selectedItem != null) {
            $('#jqxMenuTree').jqxTree('addTo', { label: menuName }, selectedItem.element, false);
            $('#jqxMenuTree').jqxTree('render');
        }
    });

}