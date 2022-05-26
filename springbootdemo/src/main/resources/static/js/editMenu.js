$(document).ready(function () {
    initData();
});

function initData() {
    var url = "/menuData/tree";
    var data = [
                { 
                    "parentid": 0,
                    "menu_Name": "dsadsad",
                    "menu_Url": "/"
                }
        ]
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
            var records = dataAdapter.getRecordsHierarchy('menu_Id', 'parent_Id', 'items', [{ name: 'menu_Name', map: 'label' },
            { name: 'menu_Url', map: 'value' }, { name: 'parent_Id', map: 'parentId' }, { name: 'menu_Id', map: 'id' }]);

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
                    title: 'Menu',
                    contentContainer: 'menuTree',
                     initContent: function () {
                    $('#jqxMenuTree').jqxTree({ source: records, allowDrop: false, allowDrag: false });
                    $('#jqxMenuTree').jqxTree('selectItem', $("#jqxMenuTree").find('li:first')[0]);
                    $('#jqxMenuTree').jqxTree('expandItem', $('#jqxMenuTree').jqxTree('selectedItem'));
                    }
                }]
            }]
        }, {
            type: 'documentGroup',
            width: "70%",
            minWidth: 200,
            items: [{
                type: 'documentPanel',
                title: 'Menu Edit Form',
                contentContainer: 'editMenuForm',
                initContent: function () {
	                    var item = $('#jqxMenuTree').jqxTree('getSelectedItem');
                    $('#menuForm').jqxForm({
                        template: 
	                        [{
                                bind: 'parent_Menu' , name: 'parent_Menu', type: 'text', label: 'Parent Menu', labelWidth: '80px', width: '250px'}
                             ,{ bind: 'menu_Name', name: 'menu_Name', type: 'text', label: 'Menu Name', labelWidth: '80px', width: '250px'}
                             ,{ bind: 'menu_Url', name: 'menu_Url', type: 'text', label: 'Menu URL', labelWidth: '80px', width: '250px'}
                             ,{ bind: 'parent_Id', type: 'blank'}
                             ,{ bind: 'menu_Id', type: 'blank'}
                             ,{ 
								columns: 
								[{
                                        bind: 'add', name: 'add', type: 'button', text: 'ADD', width: '75px', height: '30px'}
                                     ,{ bind: 'edit', name: 'edit', type: 'button', text: 'Edit', width: '75px', height: '30px'}
                                     ,{ bind: 'save' , name: 'save', type: 'button', text: 'Save', width: '75px', height: '30px'}
                                     ,{ bind: 'delete', name: 'delete', type: 'button', text: 'Delete', width: '75px', height: '30px'}
                                     ,{ bind: 'cancel', name: 'cancel', type: 'button', text: 'Cancel', width: '75px', height: '30px'
                               }]
                       		}],
                        value: {
                            menu_Url: item.parentElement,
                            menu_Name: item.label,
                            menu_Url: item.value
                        }
                    });
                    $('#menuForm').jqxForm('hideComponent', 'save');
                    $('#menuForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: true });
                    $('#menuForm').jqxForm('getComponentByName', 'parent_Menu').jqxInput({ disabled: true });
                    $('#menuForm').jqxForm('getComponentByName', 'menu_Name').jqxInput({ disabled: true });
                    $('#menuForm').jqxForm('getComponentByName', 'menu_Url').jqxInput({ disabled: true });
                }
            }]
        }]
    }];
    $('#jqxLayout').jqxLayout({ width: 1530, height: 780, layout: layout });
    initEvent();
}

function postData(url, data){
	$.ajax({
        url: url
        , type: "POST"
        , data: data
        , cache: false
        , success: function (response) {
            console.log("success");
            location.reload();
        }
    });
    $('#jqxMenuTree').jqxTree('render');
}

function selectedTreeItem(){
	var item = $('#jqxMenuTree').jqxTree('getSelectedItem');
	var parentItem = $('#jqxMenuTree').jqxTree('getItem', item.parentElement);
	var selectData = {
            menu_Name: item.label
            , menu_Url: item.value
            , menu_Id: item.id
            , parent_Id: item.parent_Id
            , parent_Menu: '/'
        };
    $('#menuForm').jqxForm('val', selectData);
    changeButtonStatus('SELECT');
}

function initEvent() {
    $('#jqxMenuTree').on('itemClick', selectedTreeItem);
    $('#menuForm').jqxForm('getComponentByName', 'add').on('click', addGroup);
    $('#menuForm').jqxForm('getComponentByName', 'edit').on('click', editGroup);
    $('#menuForm').jqxForm('getComponentByName', 'save').on('click', saveGroup );
    $('#menuForm').jqxForm('getComponentByName', 'delete').on('click', deleteGroup);
    $('#menuForm').jqxForm('getComponentByName', 'cancel').on('click', cancel);        
}
function addGroup() {
	$('#mode').val('ADD');
    changeButtonStatus('ADD');
    $('#jqxMenuTree').jqxTree({ disabled: true });
    var selectedItem = $('#jqxMenuTree').jqxTree('getSelectedItem');
    var setData = {
        menu_Name: null
        , menu_Id: null
        , menu_Url: null
        , parent_Id: selectedItem.id
        , parent_Menu: selectedItem.label
    };
    console.log(setData);
    $('#menuForm').jqxForm('val', setData);
}
function editGroup() {
	$('#mode').val('EDIT');
	changeButtonStatus('EDIT');
}

function saveGroup() {
	var selectedItem = $('#jqxMenuTree').jqxTree('getSelectedItem');
	if ( selectedItem != null ) {
		var mode 		= $('#mode').val();
        var menuName 	= $('#menuForm').jqxForm('getComponentByName', 'menu_Name').jqxInput('val');
        var url = $('#menuForm').jqxForm('getComponentByName', 'menu_Url').jqxInput('val');
        var addData 	= {
             menu_Name: menuName
           , menu_Url: url
           , menu_Id: selectedItem.id
           , parent_Id: selectedItem.id
        };
        var url = mode == 'ADD'? '/addMenu' : '/updateMenu';
        
        if(url =='/updateMenu'){
			addData['parent_Id']= selectedItem.parentId;
		}
        postData(url, addData);
    }
}
function deleteGroup() {
		var selectedItem = $('#jqxMenuTree').jqxTree('getSelectedItem');
        var deleteData   = {
            menu_Id: selectedItem.id
        };
        if (selectedItem != null && selectedItem.parentElement != null) {
            postData('/deleteMenu', deleteData);
        }
        else {
            alert("선택되지않았거나 부모 노드가 있거나 없습니다.");
        }
}
function cancel(){
	changeButtonStatus('CANCEL');
	selectedTreeItem();
}

function changeButtonStatus(mode) {
	switch (mode) {
		case 'SELECT':
			$('#menuForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: false });
			$('#menuForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: false });
		    $('#menuForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: true });
		   	$('#menuForm').jqxForm('getComponentByName', 'cancel').jqxButton({ disabled: true });
		   	$('#menuForm').jqxForm('getComponentByName', 'menu_Name').jqxInput({ disabled: true });
			$('#menuForm').jqxForm('getComponentByName', 'menu_Url').jqxInput({ disabled: true });

			break;
		case 'ADD':
			$('#menuForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: true });
    		$('#menuForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: true });
	    	$('#menuForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: false });
	    	$('#menuForm').jqxForm('getComponentByName', 'menu_Name').jqxInput({ disabled: false });
		    $('#menuForm').jqxForm('getComponentByName', 'menu_Url').jqxInput({ disabled: false });
    	   	$('#menuForm').jqxForm('getComponentByName', 'cancel').jqxButton({ disabled: false });
			break;
		case 'EDIT':
			$('#menuForm').jqxForm('getComponentByName', 'save').jqxButton({ disabled: false });
		    $('#menuForm').jqxForm('getComponentByName', 'add').jqxButton({ disabled: true });
		    $('#menuForm').jqxForm('getComponentByName', 'edit').jqxButton({ disabled: true });
		    $('#menuForm').jqxForm('getComponentByName', 'menu_Name').jqxInput({ disabled: false });
		    $('#menuForm').jqxForm('getComponentByName', 'menu_Url').jqxInput({ disabled: false });
    	   	$('#menuForm').jqxForm('getComponentByName', 'cancel').jqxButton({ disabled: false });
			break;
		case 'CANCEL' :
	    	$('#jqxMenuTree').jqxTree({ disabled: false });
			break;
		}
}


