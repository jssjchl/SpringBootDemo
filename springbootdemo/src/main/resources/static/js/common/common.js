var common = {};

common.mobileMaxWidth = 980; // 모바일 최대 width 사이즈

$(function() {
	// localization
	setLang(lang);
	
	// init alert
	$('#alertMsg').jqxWindow({theme : theme, title : i18n('message'), width : '300px', height : '150px', isModal : true, draggable : false, resizable : false, autoOpen: false, animationType:'none', zIndex: 9999
		, okButton: $('#alertOk')
		, initContent: function () {
            $('#alertOk').jqxButton({ template: 'primary', width: '65px' });
            $('#alertOk').focus();
        }	
	});
	
	// init confirm 
	$('#confirmMsg').jqxWindow({theme : theme, title : i18n('confirm'), width : '300px', height : '150px', isModal : true, draggable : false, resizable : false, autoOpen: false, animationType:'none', zIndex: 9999
		, okButton:$('#confirmOk')
		, cancelButton:$('#confirmCancel')
		, initContent: function () {
            $('#confirmOk').jqxButton({ template: 'primary', width: '65px' });
            $('#confirmCancel').jqxButton({ width: '65px' });
            $('#confirmCancel').focus();
        }	
	});
	
	// init scroll alert
	$('#scrollAlertMsg').jqxWindow({theme : theme, title : i18n('message'), width : '25%', height : '300px', isModal : true, draggable : false, resizable : false, autoOpen: false, animationType:'none', zIndex: 9999
		, okButton: $('#scrollAlertOk')
		, initContent: function () {
            $('#scrollAlertOk').jqxButton({ template: 'primary', width: '65px' });
            $('#scrollAlertOk').focus();
        }	
	});
	
	// init confirm 
	$('#columnChooser').jqxWindow({theme : theme, title : i18n('column_chooser'), width : '300px', height : '400px', isModal : true, resizable : false, autoOpen: false, animationType:'none', zIndex: 9999
		, okButton:$('#columnChooserOk')
		, cancelButton:$('#columnChooserCancel')
		, initContent: function () {
            $('#columnChooserOk').jqxButton({ template: 'primary', width: '65px' });
            $('#columnChooserCancel').jqxButton({ width: '65px' });
            $('#columnChooserCancel').focus();
        }	
	});
	
	// loader
	$("#jqxLoader").jqxLoader({ theme: theme, width: 100, height: 60, imagePosition: 'top', isModal: true });
	$("#jqxLoader").css('z-index', 99999);
	$("#jqxLoaderModal").css('z-index', 99998);
	
});

function getPagingDataAdapter(searchParams, url, dataKey) {
	var source 		= {};
	source.data 	= searchParams;
	source.datatype = 'json';
	source.url 		= url;
	source.root 	= dataKey;
	source.cache 	= false;
	source.beforeprocessing = function(data) {		
		source.totalrecords = data.totalCount;
	}
	source.formatData = function(data) {
		// filter
		if ( data.filterGroups != undefined && data.filterGroups.length > 0 ) {
			var filterData = {};
			$.each(data.filterGroups, function(idx, obj) {    
				data['filterGroups[' + idx + '].field'] = obj.field;
			    $.each(obj.filters, function(filterIdx, filterObj) {
			        data['filterGroups[' + idx + '].filters[' + filterIdx + '].value'] = filterObj.value;
			    });
			});
			delete data.filterGroups;
		}
	}
	return new $.jqx.dataAdapter(source);
}

function downloadExcel(searchParams, url) {
	$('#jqxLoader').jqxLoader('open');
	$.fileDownload(url + '/excel', {
		httpMethod: 'GET'
		, data: searchParams
		, successCallback: function() {
			$('#jqxLoader').jqxLoader('close');
		}
		, failCallback: function() {
			alertMsg(i18n('device.file_download'), i18n('device.msg.file_download_fail'));
			$('#jqxLoader').jqxLoader('close');
		}
	});
}

function getPopupXY(width, height) {
	var popupX = ($(window).width() / 2) - (300 / 2); // - width	 
	if ( width != null ) {
		popupX = ($(window).width() / 2) - (width / 2); // - width
	}	
	var popupY = ($(window).height() / 2) - (150 / 2); // - height
	if ( height != null ) {
		popupY = ($(window).height() / 2) - (height / 2); // - height
	}
	return { x : popupX, y : popupY }
}

function alertMsg(title, message, callback) {
	$('#alertTitle').removeClass('error');
	$('#alertBody').html(message);
	$('#alertMsg').jqxWindow('setTitle', title);
	$('#alertMsg').jqxWindow({position: getPopupXY()});
	$('#alertMsg').jqxWindow('open');
	$('#alertMsg').unbind('close').on('close', function (event) {
		if (callback) {
			callback(event.args.dialogResult.OK);
		}
    });
}

function errorMsg(title, message) {
	$('#alertTitle').addClass('error');
	$('#alertBody').text(message);
	$('#alertMsg').jqxWindow('setTitle', title);
	$('#alertMsg').jqxWindow({position: getPopupXY()});
	$('#alertMsg').jqxWindow('open');
}

function confirmMsg(title, message, callback) {
	$('#confirmBody').text(message);
	$('#confirmMsg').jqxWindow('setTitle', title);
	$('#confirmMsg').jqxWindow({position: getPopupXY()});
	$('#confirmMsg').jqxWindow('open');
	$('#confirmMsg').unbind('close').on('close', function (event) {
		callback(event.args.dialogResult.OK);
    });
}

function scrollAlertMsg(title, message) {
	$('#scrollAlertTitle').removeClass('error');
	$('#scrollAlertBody').text(message);
	$('#scrollAlertMsg').jqxWindow('setTitle', title);
	$('#scrollAlertMsg').jqxWindow('open');
}

function openColumnChooser(savedColumns, choosableColumns, callback) {
	$('#columnChooserBody').html('<div id="columnChooserList"></div>');
	$('#columnChooserList').jqxListBox({ source: choosableColumns, width: '100%', height: '100%', checkboxes:true });
	
	// 11개 이상이면 스크롤 이벤트 생성
	if ( choosableColumns.length >= 11 ) {
		
		var lastScroll = 0;
		$('#columnChooserList').on('mousewheel', function(event) {
			var nowScroll = $('#verticalScrollBarcolumnChooserList').val();
			if (nowScroll < lastScroll || nowScroll == 0 ){
				$('#verticalScrollBarcolumnChooserList').val(nowScroll+7);
			}
			else {
				$('#verticalScrollBarcolumnChooserList').val(nowScroll-7);
			}
			lastScroll = $('#verticalScrollBarcolumnChooserList').val();
		})
		
		// 스크롤바 상단 빈공간 클릭 이벤트
		$('#jqxScrollAreaUpverticalScrollBarcolumnChooserList').on('click', function(){
			var nowScroll = $('#verticalScrollBarcolumnChooserList').val();
			$('#verticalScrollBarcolumnChooserList').val(nowScroll-20);
		})
		
		// 스크롤바 하단 빈공간 클릭 이벤트
		$('#jqxScrollAreaDownverticalScrollBarcolumnChooserList').on('click', function(){
			var nowScroll = $('#verticalScrollBarcolumnChooserList').val();
			$('#verticalScrollBarcolumnChooserList').val(nowScroll+20);
		})
	}
	
	$(savedColumns).each(function(i, o) {
		$('#columnChooserList').jqxListBox('uncheckItem', o); 
	});
	
	$('#columnChooser').jqxWindow({position: getPopupXY(null, 400)});
	$('#columnChooser').jqxWindow('open');
	$('#columnChooser').unbind('close').on('close', function (event) {
		var items = $('#columnChooserList').jqxListBox('getItems');
		var uncheckedItems = [];
		$.each(items, function(i, o){ if ( o.checked == false ) { uncheckedItems.push(o.value); } });
		callback(event.args.dialogResult.OK, uncheckedItems.join(','));
    });
}

function showMenuPopup(title, url, width, height) {
	$('#menuPopup').jqxWindow({theme : theme, title : '<strong>' + title + '</strong>', width : width, height : height, isModal : true, draggable : true, resizable : false, autoOpen: false, position: 'center'});
	$('#menuPopupBody').html('');

	goAjaxLoad('#menuPopupBody', url, null, function(result) {
		if ( result.status == 403 ) {
			errorMsg(i18n('menu.access.permission.error'), i18n('menu.access.error.msg'));
			return;
		}
		
		$('#menuPopup').jqxWindow('open');
	});
}

function goAjaxLoad(target, url, param, callback) {
	var fullUrl = url;
	
	if ( param != null && param.replace(/\s/g, '').length != 0 ) {
		fullUrl = fullUrl + '?' + param;
	}
	
	if ( callback != null ) {
		$(target).load(fullUrl, function(response, status, xhr) {
			if ( xhr != null && xhr.responseText != null && xhr.responseText.indexOf('loginForm') > 0 ) {
				window.location.href = '/logout';
			}
			callback(xhr);	
		});
	}
	else {
		$(target).load(fullUrl, function(response, status, xhr) {
			if ( xhr != null && xhr.responseText != null && xhr.responseText.indexOf('loginForm') > 0 ) {
				window.location.href = '/logout';
			}
			if ( status == 403 ) {
				errorMsg(i18n('menu.access.permission.error'), i18n('menu.access.error.msg'));
				return;
			}
		});	
	}
}


function goAjaxGetWithoutLoader(url, param, callback) {
	var data = goAjaxMethod('GET', url, param, callback != null, callback, false); //비동기 사용
	return data;
}

function goAjaxPostWithoutLoader(url, param, callback) {
	var data = goAjaxMethod('POST', url, param, callback != null, callback, false); //비동기 사용
	return data;
}

function goAjaxGet(url, param, callback) {
	var data = goAjaxMethod('GET', url, param, callback != null, callback, true); //비동기 사용
	return data;
}

function goAjaxPost(url, param, callback) {
	var data = goAjaxMethod('POST', url, param, callback != null, callback, true); //비동기 사용
	return data;
}

function goAjaxPostForm(url, param, callback) {
	var formData = new FormData();
	makeFormData(formData, param);
	var data = goAjaxMethod('POST', url, param, callback != null, callback, true, formData); //비동기 사용
	return data;
}

function makeFormData(formData, jsonData, parentKey, parentType) {
	$.each(jsonData, function(k, o) {
		var key = k;
		if ( parentKey != null ) {
			if ( parentType == 'Array' ) {
				key = parentKey + '[' + k + ']';
			}
			else if ( parentType == 'Object' ) {
				key = parentKey + '.' + k;
			}
		}
		
		if ( o != null && o.constructor == Array ) {
			makeFormData(formData, o, key, 'Array');
		}
		else if ( o != null && o.constructor == Object ){
			makeFormData(formData, o, key, 'Object');
		}
		else {
			formData.append(key, o);
		}
	});
}

function makeObjectQueryStrData(resultArr, jsonData, parentKey, parentType) {
	$.each(jsonData, function(k, o) {
		var key = k;
		if ( parentKey != null ) {
			if ( parentType == 'Array' ) {
				key = parentKey + '[' + k + ']';
			}
			else if ( parentType == 'Object' ) {
				key = parentKey + '.' + k;
			}
		}
		
		if ( o != null && o.constructor == Array ) {
			makeObjectQueryStrData(resultArr, o, key, 'Array');
		}
		else if ( o != null && o.constructor == Object ){
			makeObjectQueryStrData(resultArr, o, key, 'Object');
		}
		else {
			resultArr.push(encodeURIComponent(key)+'='+encodeURIComponent(o));
		}
	});
}

function goAjaxMethod(method, url, param, async, callback, useLoader, formData) {
	
	var response 		= null;
	var ajaxOption 		= {};
	ajaxOption.url 		= ctx + url;
	ajaxOption.type 	= method;
	
	if ( formData != null ) {
		ajaxOption.processData = false;
		ajaxOption.contentType = false;
	}
	else {
		ajaxOption.dataType = 'json';	
	}
	
	ajaxOption.async = async;

	ajaxOption.beforeSend = function() {
		// start progress 
		if ( useLoader == true ) {
			$('#jqxLoader').jqxLoader('open');
		}
	} 
	ajaxOption.complete = function() {
		// end progress 
		if ( useLoader == true ) {
			$('#jqxLoader').jqxLoader('close');
		}
	}

	if ( method == 'GET' ) {
		if ( param != null ) {
			if ( param instanceof Object ) {
				var paramArr = [];
				makeObjectQueryStrData(paramArr, param);
				param = paramArr.join('&');
			}
			ajaxOption.data = param;	
		}
	}
	else {
		
		if ( formData != null ) {
			ajaxOption.data = formData;
		}
		else {
			ajaxOption.contentType 	= 'application/json; charset=UTF-8';
			ajaxOption.data = JSON.stringify(param);
		}
			
	}
	
	if (callback != null) {
		$.ajax(ajaxOption).done(callback).fail(function(data) {
			if ( data.responseText != null && data.responseText.indexOf('loginForm') > 0 ) {
				window.location.href = '/logout';
			}
		});
	}
	else {
		$.ajax(ajaxOption).done(function(data) {
			response = data;
		}).fail(function(data) {
			if ( data != null && xhr.data.indexOf('loginForm') > 0 ) {
				window.location.href = '/logout';
			}
		});	

		return response;
	}
}

function objectToQueryString(json) {
    return Object.keys(json).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    }).join('&');
}

function getCode(groupCd, useAll) {
	var result = goAjaxGet('/common/code/' + groupCd);
	
	if ( useAll == null || useAll == true ) {
		result.data.unshift({code: '', value: i18n('all')});
	}
	return result.data;
}

function getWindowOption(width, height, zIndex) {
	var windowOption = {
		theme: window_theme
		, width: width
		, height: height
		, zIndex: zIndex
		, isModal: true
		, autoOpen: false
		, draggable: false
		, resizable: false
		, animationType: 'none'
	}
	
	return windowOption;
}

function dateValidate(fromDate, toDate) {
	if ( moment(toDate).diff(moment(fromDate)) >= 0  ) {
		return true;
	}
	else {
		return false;
	}
}

var MENU_SIZE = {};
var columnrenderer = function(value) {
    return '<div style="text-align: center; margin-top: 9px;">' + value + '</div>';
}

var columnleftrenderer = function(value) {
    return '<div style="text-align: left; margin-top: 9px;">' + value + '</div>';
}

var columnrightrenderer = function(value) {
    return '<div style="text-align: right; margin-top: 9px;">' + value + '</div>';
}

var defaultCellsRenderer = function(row, column, value) {
	if ( value == null || value == '' ) {
		return '<div style="display: table; width: 100%; height: 100%;"><div style="vertical-align: middle; text-align: center; display: table-cell">-</div></div>';
	}
	else {
		return '<div style="display: table; width: 100%; height: 100%;"><div style="vertical-align: middle; text-align: center; display: table-cell">' + value + '</div></div>';
	}
}

var detailCellsRenderer = function(row, column, value) {
	if (column == 'property') {	
		return '<div style="text-align: center; margin-top: 9px;">'+value+'</div>';
	}
	else { 
		if ( value == null || value == '' ) {
			return '<div style="text-align: left; margin-top: 9px; margin-left:9px;">-</div>';
		}
		else {
			return '<div style="text-align: left; margin-top: 9px; margin-left:9px;">' + value + '</div>';
		}
	}

}

var rightAlignCellsRenderer = function(row, column, value) {
	if ( value == null || value == '' ) {
		return '<div style="text-align: center; margin-top: 9px;">-</div>';
	}
	else {
		return '<div style="margin-top: 9px;">' + value + '</div>';
	}
}

var tooltipRenderer = function(element) {
	$(element).jqxTooltip({position: 'mouse', content: $(element).text() });
}

var convertByteToImage = function(imageData, width, height) {
	if ( width == null || width == '' ) {
		var width = '100%';
	}
	if ( height == null || height == '' ) {
		var height = '100%';
	}
	var imageDataHtml = '<img width="'+width+'" height="'+height+'" src="data:image/gif;base64,'+ imageData +'" alt="image"/>';
	return imageDataHtml;
}

function setLang(locale) {
	jQuery.i18n.properties({
	    name: 'messages'    
	    , path: '/properties/'
	    , mode: 'map'
    	, language: locale
	    , encoding: 'UTF-8'
	    , cache: true
	});
}

function i18n(key) {
	return jQuery.i18n.prop(key);
}

function getCookie(cname) {
	var name = cname + '=';
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

function isRightClick(event) {
    var rightclick;
    if (!event) var event = window.event;
    if (event.which) rightclick = (event.which == 3);
    else if (event.button) rightclick = (event.button == 2);
    return rightclick;
}

function getSelectedList(method, $grid) {
    var resultList = [];
    var selectedRowIndexs = $grid.jqxGrid('getselectedrowindexes');

    $.each(selectedRowIndexs, function(index, value) {
        var data = $grid.jqxGrid(method, value);
		if ( data != undefined ) {
			resultList.push(data);
		}
    });
    return resultList;
}

function getTreeByKey(key, target, $tree) {
	return $tree.jqxTree('getItems').filter(function(object) {
	    return object[key] == target;
	});
}

function setBlankValue(data) {
	return data === undefined ? '' : data;
}

function openGridColumnChooserPopup(viewId, gridId, userId) {
	var param = {'userId':userId, 'viewId':viewId, 'gridId':gridId};
	var gridObj = $(gridId).jqxGrid('getInstance');
	var choosableColumns = [];
	$(gridObj.columns.records).each(function(i, o) {
		if ( o.datafield != null && o.columntype != 'checkbox' && o.classname != 'hidden' && o.hideable == true ) {
			choosableColumns.push({label:o.text, value:o.datafield, checked:true });
		} 
	});
	goAjaxGet('/grid/filter', param, function(response) {
		var savedColumns = [];
		if ( response.data != null ) {
			savedColumns = response.data.columnList.split(',');
		}
		
		openColumnChooser(savedColumns, choosableColumns, function(isOk, selectedColumns) {
			if ( isOk && choosableColumns != '' ) {
				var $grid = $(gridId);
				$grid.jqxGrid('beginupdate');
				$(gridObj.columns.records).each(function(i, o) {
					$grid.jqxGrid('showcolumn', o.datafield);
				});
				$grid.jqxGrid('endupdate');
				param.columnList = selectedColumns;
				goAjaxPost('/grid/filter/save', param, function() {
					setGridColumnChoose(gridId, selectedColumns);
					$(gridId).trigger('filter-sync');
				});
			}
		});
	});
}

function initGridColumnChoose(viewId, gridId, userId) {
	var param = {'userId':userId, 'viewId':viewId, 'gridId':gridId};
	goAjaxGet('/grid/filter', param, function(response) {
		if ( response.data != null ) {
			setGridColumnChoose(gridId, response.data.columnList);
		}
	});
}

function setGridColumnChoose(gridId, choosableColumns) {
	var columns = choosableColumns.split(',');
	var gridObj = $(gridId).jqxGrid('getInstance');
	$(gridObj.columns.records).each(function(i, o) {
		if ( o.classname == 'hidden' ) {
			$(gridId).jqxGrid('hidecolumn', o.datafield);
		}
	});
	$(columns).each(function(i, oneColumn) {
		$(gridId).jqxGrid('hidecolumn', oneColumn);
	});
	changedGridColumnSize(gridId);
}

function changedGridColumnSize(gridId) {
	var gridObj = $(gridId).jqxGrid('getInstance');
	var tableWidth = $(gridId).width();
	var columnsHeaderWidth = $(gridObj.columnsheader).width();
	if ( tableWidth > columnsHeaderWidth ) {
		$(gridObj.columns.records).each(function(i, o) {
			if ( o.classname != 'hidden' ) {
				var beforeWidth = o.hasOwnProperty('_percentagewidth') ? o._percentagewidth : o.width;
				$(gridId).jqxGrid('setcolumnproperty', o.datafield, 'beforewidth', beforeWidth);
				$(gridId).jqxGrid('setcolumnproperty', o.datafield, 'width', 'auto');
			}
		});
	}else {
		$(gridObj.columns.records).each(function(i, o) {
			if ( o.classname != 'hidden' ) {
				if ( o.hasOwnProperty('beforewidth') ) {
					$(gridId).jqxGrid('setcolumnproperty', o.datafield, 'width', o.beforewidth);	
				}
			}
		});
		$(gridId).jqxGrid('render');
	}
}


function setGridExcelFilter(gridId) {
	$(gridId).jqxGrid({filterable: true, filtermode: 'excel'/*, showfilterrow: true, showsortmenuitems: false*/});
	$(gridId).jqxGrid({ columnmenuopening: function (menu, datafield, height) {
		var dataAdapter = $(gridId).jqxGrid('source');
		var filterInfo 	= $(gridId).jqxGrid('getfilterinformation');
		
		var filterGroups = [];
		if ( filterInfo.length > 0 ) {
			$.each(filterInfo, function(i, o) {
				var oneGroup = {field : o.datafield, filters:o.filter.getfilters()};
				filterGroups.push(oneGroup);
			});
		} 
		var response = goAjaxGet(dataAdapter._source.url, $.extend({'filterGroups': filterGroups, 'filterItem':datafield}, dataAdapter._source.data));
		
		var menuItems = ['(Select All)'];
		$(response.data).each(function(i, o){menuItems.push(o[datafield]);});
		var $menuListObj = $(menu).find('div.filter.jqx-listbox');
		$menuListObj.jqxListBox({'source':menuItems});
		
		$.each(filterInfo, function(i, o) {
			if ( o.datafield == datafield ) {
				$.each(o.filter.getfilters(), function(i, o) {
					
					$menuListObj.jqxListBox('checkItem', o.value ); 
				});
				return false;
			}
		});
		
		//$menuListObj.jqxListBox('checkItem', item ); 
	}}); 
	
	$(gridId).on('filter', function() {
		if ( $(gridId).data('isCustomClearFilter') != true ) {
			$(gridId).jqxGrid('updatebounddata');
		}
	}); 
	
	$(gridId).on("bindingcomplete", function () {
		$(gridId).data('isCustomClearFilter', null);
	});
	
}

function clearGridFilter(gridId) {
	try {
		$(gridId).data('isCustomClearFilter', true);
		$(gridId).jqxGrid('clearfilters', false);
	} catch (e) { 
	}
}

function convertGridToListBox(gridId, listBoxId) {
	var gridObj = $(gridId).jqxGrid('getInstance');
	$(gridId).data('targetListBoxId', listBoxId);
	$(gridId).on('bindingcomplete', function() {
		if ( gridObj.source.loadedData == null ) { return; }
		
		var result 	= [];
		var columns = gridObj.columns.records;
		var rows 	= gridObj.source.loadedData.data;
		$(rows).each(function(i, oneRow) {
			var resultRow = {};
			$(columns).each(function(i, o) {
				if ( o.hidden != true ) {
					if ( o.datafield != null && o.columntype != 'checkbox' && o.classname != 'hidden' && o.hideable == true ) {
						resultRow[o.text] = oneRow[o.datafield] == null ? '-' : oneRow[o.datafield];
					}
				}
			});
			result.push(resultRow);
		});
	
		$(listBoxId).jqxListBox({
			source: $(listBoxId).jqxListBox('source').concat(result)
			, renderer: function(index, label, value) {
				var htmlArr = ['<table class="listBoxTable"><tbody>']; 
				
				$.each(this.items[index].originalItem, function(k, v) {
					htmlArr.push('<tr><td class="title">'+k+'</td><td>'+v+'</td></tr>');
				});
				
				htmlArr.push('</tbody></table>');
			    return htmlArr.join('');
			}	
		});
		$(listBoxId).data('pageNum', gridObj.getpaginginformation().pagenum);
		$(listBoxId).data('pageSize', gridObj.getpaginginformation().pagesize);
	});
	
	$(gridId).on('filter-sync', function() {
		var gridObj = $(gridId).jqxGrid('getInstance');
		var listBoxId = $(gridId).data('targetListBoxId');
		var pageNum = $(listBoxId).data('pageNum');
		var pageSize = $(listBoxId).data('pageSize');
		var url = gridObj.source._source.url;
		
		var paramData = gridObj.source._source.data;
		if ( paramData == null ) { paramData = {}; }
		paramData.recordstartindex = 0;
		paramData.pagesize = (pageNum + 1) * pageSize;
		
		goAjaxGet(url, paramData , function(response) {
			
			// 표시해야할 컬럼 추출
			var columns = gridObj.columns.records;
			var showColumns = {};
			$.each(columns, function(i, o){
				if ( o.hidden != true ) {
					if ( o.datafield != null && o.columntype != 'checkbox' && o.classname != 'hidden' && o.hideable == true ) {
						showColumns[o.text] = o.datafield;
					}
				}
			});
			
			var result 	= [];
			$.each(response.data, function(i, o) {
				var resultRow = {};
				$.each(showColumns, function(key, obj) {
					resultRow[key] = o[obj] == (undefined||null) ? '-' : o[obj];
				});
				result.push(resultRow);
			});
			
			$(listBoxId).jqxListBox({source: result});
		});
		
	});
	
	$(listBoxId).on('valueChanged', function (event) {
		var scrollMax = $(this).jqxListBox('vScrollInstance').max;
		var currentValue = parseInt(event.currentValue);
	    if ( currentValue >= scrollMax ) {
			$(gridId).jqxGrid('gotonextpage');
	    }
	});
	
}

function setGridScrollbarLargestep(gridId) {
	setTimeout(function() {
		var scrollbarWidth = $(gridId).jqxGrid('getInstance').hScrollInstance._width;
		$(gridId).jqxGrid({ horizontalscrollbarlargestep: scrollbarWidth});
	}, 200);
}

function createEditor(width, height) {
	if ( width == null ) { width = '100%' }
	if ( height == null ) { height = '100%' }
	
	if (tinymce.activeEditor != null ) {
		tinymce.activeEditor.destroy();
	}
	
	tinymce.init({
    	selector: '.editor',
		width: width,
		height: height,
		resize: false,
		autosave_ask_before_unload: false,
		powerpaste_allow_local_images: true,
		plugins: [
		  'advlist autolink lists link code image charmap print preview anchor',
		  'searchreplace visualblocks code fullscreen',
		  'insertdatetime media table paste imagetools wordcount help'
		],
		toolbar: 'code undo redo  | cut copy paste | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | formatselect  fontselect fontsizeselect | bullist numlist | | table image media charmap emoticons pagebreak print preview | fullscreen ',
		file_picker_types: 'image',
		file_picker_callback: function (cb, value, meta) {
			var input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');
	
			input.onchange = function () {
				var file = this.files[0];
				
				var reader = new FileReader();
				reader.onload = function () {
					var id = 'blobid' + (new Date()).getTime();
					var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
					var base64 = reader.result.split(',')[1];
					var blobInfo = blobCache.create(id, file, base64);
					blobCache.add(blobInfo);
				
					cb(blobInfo.blobUri(), { title: file.name });
				};
				reader.readAsDataURL(file);
			};
			
			input.click();
		},
		content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
    });
}

// IE
String.prototype.startsWith = function(str) {
	if (this.length < str.length) { return false; }
	return this.indexOf(str) == 0;
}
