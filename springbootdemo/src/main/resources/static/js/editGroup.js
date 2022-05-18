$(document).ready(function () {
    initData();
});

function initData() {
    var url = "/groupData";
    var source =
    {
        datatype: "json",
        datafields: [
            { name: 'group_Id' },
            { name: 'group_Name' },
            { name: 'parent_Group_Id' }
        ],
        id: 'group_Id',
        url: url
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function (response) {
            var records = dataAdapter.getRecordsHierarchy('group_Id', 'parent_Group_Id', 'items', [{ name: 'group_Name', map: 'label' },
            { name: 'parent_Group_Id', map: 'parentId' }, { name: 'group_Id', map: 'id' }]);
            console.log(response);
            initComponent(records);
        }
    });
    dataAdapter.dataBind();
}
function initComponent(records) {
    var layout = [{
        type: 'layoutGroup',
        orientation: 'horizontal',
        items: [{
            type: 'layoutGroup',
            width: "30%",
            alignment: 'left',
            items: [{
                type: 'documentGroup',
                height: 780,
                minHeight: 200,
                items: [{
                    type: 'documentPanel',
                    title: 'Group',
                    contentContainer: 'groupTree',
                    initContent: function () {
                        $('#jqxGroupTree').jqxTree({ source: records, allowDrop: false, allowDrag: false });
                        $('#jqxGroupTree').jqxTree('selectItem', $("#jqxGroupTree").find('li:first')[0]);
                        $('#jqxGroupTree').jqxTree('expandItem', $('#jqxGroupTree').jqxTree('selectedItem'));
                    }
                }]
            }]
        }, {
            type: 'documentGroup',
            width: "70%",
            minWidth: 200,
            items: [{
                type: 'documentPanel',
                title: 'Group Edit Form',
                contentContainer: 'editGroupForm',
                initContent: function () {
                    var item = $('#jqxGroupTree').jqxTree('getSelectedItem');
                    $('#groupForm').jqxForm({
                        template: [
                            {
                                bind: 'parent_Group_Name'
                                , name: 'parent_Group_Name'
                                , type: 'text'
                                , label: 'Parent Group Name'
                                , labelWidth: '80px'
                                , width: '250px'
                            },
                            {
                                bind: 'group_Name'
                                , name: 'group_Name'
                                , type: 'text'
                                , label: 'Group Name'
                                , labelWidth: '128px'
                                , width: '250px'
                            },
                            {
                                bind: 'parent_Group_Id'
                                , type: 'blank'
                            },
                            {
                                bind: 'group_Id'
                                , type: 'blank'
                            },
                            {
                                columns: [
                                    {
                                        bind: 'add'
                                        , name: 'add'
                                        , type: 'button'
                                        , text: 'ADD'
                                        , width: '75px'
                                        , height: '30px'
                                    },
                                    {
                                        bind: 'edit'
                                        , name: 'edit'
                                        , type: 'button'
                                        , text: 'Edit'
                                        , width: '75px'
                                        , height: '30px'
                                    },
                                    {
                                        bind: 'save'
                                        , name: 'save'
                                        , type: 'button'
                                        , text: 'Save'
                                        , width: '75px'
                                        , height: '30px'
                                    },
                                    {
                                        bind: 'delete'
                                        , name: 'delete'
                                        , type: 'button'
                                        , text: 'Delete'
                                        , width: '75px'
                                        , height: '30px'
                                    },
                                    {
                                        bind: 'cancel'
                                        , name: 'cancel'
                                        , type: 'button'
                                        , text: 'Cancel'
                                        , width: '75px'
                                        , height: '30px'
                                    }
                                ]
                            }
                        ],
                        value: {
                            group_Name: item.label,
                        }
                    });
                    $('#groupForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: true });
                    $('#groupForm').jqxForm('getComponentByName', 'parent_Group_Name').jqxInput({ disabled: true });
                    $('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput({ disabled: true });
                }
            }]
        }]
    }];
    $('#jqxLayout').jqxLayout({ width: 1530, height: 780, layout: layout });
    initEvent();
}

function initEvent() {
    var selectData = null;
    var status = null;

    $('#jqxGroupTree').on('itemClick', function (event) {
        var args = event.args;
        var item = $('#jqxGroupTree').jqxTree('getItem', args.element);
        console.log(item);
        selectData = {
            group_Name: item.label
            , group_Id: item.id
            , parent_Group_Id: item.parentId
            , parent_Group_Name: '/'
        };
        console.log(selectData);
        if ($('#jqxGroupTree').jqxTree('getItem', item.parentElement)) {
            selectData['parent_Group_Name'] = $('#jqxGroupTree').jqxTree('getItem', item.parentElement).label;
        }
        $('#groupForm').jqxForm('val', selectData);
    });

    $('#groupForm').jqxForm('getComponentByName', 'add').on('click', function () {
        status = 'add';
        $('#groupForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: true });
        $('#groupForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: true });
        $('#groupForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: false });
        $('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput({ disabled: false });

        $('#jqxGroupTree').jqxTree({ disabled: true });
        var selectedItem = $('#jqxGroupTree').jqxTree('selectedItem');
        var setData = {
            group_Name: null
            , group_Id: null
            , parent_Group_Id: selectedItem.id
            , parent_Group_Name: selectedItem.label
        };
        console.log(setData);
        $('#groupForm').jqxForm('val', setData);
    });

    $('#groupForm').jqxForm('getComponentByName', 'save').on('click', function () {
        var selectedItem = $('#jqxGroupTree').jqxTree('selectedItem');
        var groupName = $('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput('val');
        var addData = {
            group_Name: groupName
            , group_Id: selectedItem.id
            , parent_Group_Id: selectedItem.id
        };
        var url = null;
        if (status == 'add') {
            url = "/addGroup";
        }
        else {
            url = "/updateGroup";
            addData['parent_Group_Id'] = selectedItem.parentId;
        }
        console.log(addData);
        if (selectedItem != null) {
            $.ajax({
                url: url
                , type: "POST"
                , data: addData
                , cache: false
                , success: function (response) {

                    console.log(response);
                    console.log("success");
                    location.reload();
                }
            });
            $('#jqxGroupTree').jqxTree('render');
        }
    });

    $('#groupForm').jqxForm('getComponentByName', 'edit').on('click', function () {
        status = 'edit';
        $('#groupForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: false });
        $('#groupForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: true });
        $('#groupForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: true });
        $('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput({ disabled: false });
    });

    $('#groupForm').jqxForm('getComponentByName', 'delete').on('click', function () {
        var selectedItem = $('#jqxGroupTree').jqxTree('selectedItem');
        console.log(selectedItem);
        var deleteData = {
            group_Id: selectedItem.id
        };
        if (selectedItem != null && selectedItem.parentElement != null) {
            $.ajax({
                url: "/deleteGroup"
                , type: "DELETE"
                , data: deleteData
                , cache: false
                , success: function (response) {
                    console.log("success");
                    location.reload();
                }
            });
            $('#jqxGroupTree').jqxTree('render');
        }
        else {
            alert("선택되지않았거나 부모 노드가 있거나 없습니다.");
        }
    });

    $('#groupForm').jqxForm('getComponentByName', 'cancel').on('click', function () {
        $('#groupForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: false });
        $('#groupForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: false });
        $('#groupForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: true });
        $('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput({ disabled: true });
        $('#jqxGroupTree').jqxTree({ disabled: false });
        $('#groupForm').jqxForm('val', selectData);
    });
}