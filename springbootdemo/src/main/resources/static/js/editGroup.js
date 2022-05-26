$(document).ready(function () {
	initComponent();
    initData();
    initEvent();
});

function initComponent() {
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
                    contentContainer: 'groupTree'
                }]
            }]
        }, {
            type: 'documentGroup',
            width: '70%',
            minWidth: '200',
            items: [{
                type: 'documentPanel',
                title: 'Group Edit Form',
                contentContainer: 'editGroupForm',
                initContent: function () {
                    /**/
                }
            }]
        }]
    }];
    $('#jqxLayout').jqxLayout({ width: 1530, height: 780, layout: layout });
    
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
            { bind: 'parent_Group_Id', type: 'blank' },
            { bind: 'group_Id', type: 'blank' },
            
            { columns: [
                     { type: 'button', bind: 'add', name: 'add', text: 'ADD', width: '75px', height: '30px'}
                    ,{ type: 'button', bind: 'edit', name: 'edit', text: 'Edit', width: '75px', height: '30px'}
                    ,{ type: 'button', bind: 'save', name: 'save',text: 'Save', width: '75px', height: '30px'}
                    ,{ type: 'button', bind: 'delete', name: 'delete', text: 'Delete', width: '75px', height: '30px'}
                    ,{ type: 'button', bind: 'cancel', name: 'cancel', text: 'Cancel', width: '75px', height: '30px'}
                ]
            }
        ]
    });
    $('#groupForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: true });
   	$('#groupForm').jqxForm('getComponentByName', 'cancel').jqxButton({ disabled: true });
}

function initData() {
    var source = {
        datatype: 'json'
        , datafields: [
            { name: 'group_Id' }
            , { name: 'group_Name' }
            , { name: 'parent_Group_Id' }
        ]
        , id: 'group_Id'
        , url: '/groupData'
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function (response) {
			var items = [];
			items.push({ name: 'group_Name', map: 'label'});
			items.push({ name: 'parent_Group_Id', map: 'parentId'});
			items.push({ name: 'group_Id', map: 'id'});
            var records = dataAdapter.getRecordsHierarchy('group_Id', 'parent_Group_Id', 'items', items);
            console.log(response);
            initTreeData(records)
        }
    });
    dataAdapter.dataBind();
}

function initTreeData(records) {
	$('#jqxGroupTree').jqxTree({ source: records, allowDrop: false, allowDrag: false });
    $('#jqxGroupTree').jqxTree('selectItem', $("#jqxGroupTree").find('li:first')[0]);
    $('#jqxGroupTree').jqxTree('expandItem', $('#jqxGroupTree').jqxTree('selectedItem'));
}

function selectedTreeItem() {
	var item = $('#jqxGroupTree').jqxTree('getSelectedItem');
	var parentItem = $('#jqxGroupTree').jqxTree('getItem', item.parentElement);
	var selectData = {
            group_Name: item.label
            , group_Id: item.id
            , parent_Group_Id: item.parentId
            , parent_Group_Name: parentItem != null ? parentItem.label : ''
        };
    $('#groupForm').jqxForm('val', selectData);
    changeButtonStatus('SELECT');
}

function initEvent() {

    $('#jqxGroupTree').on('itemClick', selectedTreeItem);
    $('#groupForm').jqxForm('getComponentByName', 'add').on('click', addGroup);
    $('#groupForm').jqxForm('getComponentByName', 'save').on('click', saveGroup);
    $('#groupForm').jqxForm('getComponentByName', 'edit').on('click', editGroup);
    $('#groupForm').jqxForm('getComponentByName', 'delete').on('click', deleteGroup);

    $('#groupForm').jqxForm('getComponentByName', 'cancel').on('click', cancel);
}

function addGroup() {
	$('#mode').val('ADD');
    changeButtonStatus('ADD');
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
}
function editGroup() {
	$('#mode').val('EDIT');
	changeButtonStatus('EDIT');
}
function deleteGroup() {
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
}
function saveGroup() {
	var selectedItem = $('#jqxGroupTree').jqxTree('selectedItem');
	if ( selectedItem != null ) {
		var mode 		= $('#mode').val();
        var groupName 	= $('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput('val');
        var addData 	= {
            group_Name: groupName
            , group_Id: selectedItem.id
            , parent_Group_Id: selectedItem.id
        };
        console.log(addData);
        
        var url = mode == 'ADD'? '/addGroup' : '/updateGroup';
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
}
function cancel() {
	changeButtonStatus('CANCEL');
	selectedTreeItem();
}

function changeButtonStatus(mode) {
	switch (mode) {
		case 'SELECT' : 
		 	$('#groupForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: false });
			$('#groupForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: false });
		    $('#groupForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: true });
		   	$('#groupForm').jqxForm('getComponentByName', 'cancel').jqxButton({ disabled: true });
		   	$('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput({ disabled: true });
			break;
		case 'CANCEL' :
	    	$('#jqxGroupTree').jqxTree({ disabled: false });
			break;
		case 'ADD' :
			$('#groupForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: true });
    		$('#groupForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: true });
	    	$('#groupForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: false });
	    	$('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput({ disabled: false });
    	   	$('#groupForm').jqxForm('getComponentByName', 'cancel').jqxButton({ disabled: false });

			break;
		case 'EDIT':
			$('#groupForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: false });
		    $('#groupForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: true });
		    $('#groupForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: true });
		    $('#groupForm').jqxForm('getComponentByName', 'group_Name').jqxInput({ disabled: false });
    	   	$('#groupForm').jqxForm('getComponentByName', 'cancel').jqxButton({ disabled: false });

		    break;
	}
}
