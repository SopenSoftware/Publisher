Ext.ns('Tine.Publisher');

Tine.Publisher.BookEditDialog = Ext.extend(Tine.widgets.dialog.EditDialog, {
	
	/**
	 * @private
	 */
	windowNamePrefix: 'BookEditWindow_',
	appName: 'Publisher',
	recordClass: Tine.Publisher.Model.Book,
	recordProxy: Tine.Publisher.bookBackend,
	loadRecord: false,
	evalGrants: false,
	getFormItems: function(){
		return Tine.Publisher.getBookEditPanel();
	}
});

Tine.Publisher.BookEditDialog.openWindow = function (config) {
    var id = (config.record && config.record.id) ? config.record.id : 0;
    var window = Tine.WindowFactory.getWindow({
        width: 760,
        height: 530,
        name: Tine.Publisher.BookEditDialog.prototype.windowNamePrefix + id,
        contentPanelConstructor: 'Tine.Publisher.BookEditDialog',
        contentPanelConstructorConfig: config
    });
    return window;
};

Tine.Publisher.BookEditRecord = Ext.extend(Tine.widgets.dialog.DependentEditForm, {
	id: 'sopen-book-edit-record-form',
	className: 'Tine.Publisher.BookEditRecord',
	key: 'BookEditRecord',
	recordArray: Tine.Publisher.Model.BookArray,
	recordClass: Tine.Publisher.Model.Book,
    recordProxy: Tine.Publisher.bookBackend,
    
    parentRecordClass: Tine.Addressbook.Model.Contact,
    parentRelation: {
		fkey: 'author_contact_id',
		references: 'id'
	},
    useGrid: true,
    useChildPanels:false,
    splitViewToggle: true,
    gridPanelClass: Tine.Publisher.BookGridPanelNested,
	formFieldPrefix: 'book_',
	formPanelToolbarId: 'publisher-edit-dialog-panel-toolbar',
	initComponent: function(){
		this.app = Tine.Tinebase.appMgr.get('Publisher');
		this.gridPanelClass = Tine.Publisher.BookGridPanelNested;
		this.recordProxy = Tine.Publisher.bookBackend;
		this.parentRecordClass = Tine.Addressbook.Model.Contact;
		this.parentRelation = {
			fkey: 'author_contact_id',
			references: 'id'
		};
		Tine.Publisher.BookEditRecord.superclass.initComponent.call(this);
		// register parent action events
		// this record events are handled by parent class
    	this.on('beforeaddrecord', this.onBeforeAddRecord, this);
    	this.on('addrecord', this.onAddRecord, this);
      	this.registerGridEvent('addparentrecord',this.onAddPublisher, this);
    	this.registerGridEvent('editparentrecord',this.onEditPublisher, this);		
	},
	initChildPanels: function(){
	},
	onBeforeAddRecord: function(record){
		Tine.Publisher.BookEditRecord.superclass.onBeforeAddRecord.call(this);
	},
	onAddRecord: function(record){
	},
	exchangeEvents: function(observable){
		return true;
	},
	getFormContents: function(){
		return Tine.Publisher.getBookEditDialogPanel(this.getComponents());
	}
});

Tine.Publisher.getBookEditRecordAsTab = function(){
	return new Tine.Publisher.BookEditRecord(
		{
			title: 'Bücher',
			withFilterToolbar: false,
			useGrid:true,
			disabled: true,
			closable:true,
			getRecordChooserItems: function(){
				return [];
			}
		}
	);
};

Tine.Publisher.getBookEditRecordPanel = function(){
	return new Tine.Publisher.BookEditRecord(
		{
			title: ' ',
			header: true,
			bodyStyle:'padding:0',
			withFilterToolbar:true,
			useGrid:true
		}
	);
};

Tine.Publisher.getBookEditDialogPanel = function(components){
	var editPanel = Tine.Publisher.getBookEditPanelEmbedded();
	/*var tabPanelItems = [
	    editPanel
	];*/

	/*if(components.childPanels.PublisherEditRecord){
		tabPanelItems.push(components.childPanels.PublisherEditRecord);
	}*/
	
	var editDialogPanel = {
		xtype:'panel',
		layout:'fit',
		id: 'book-edit-dialog-panel',
		items: [
		{
		    xtype:'panel',
			layout:'fit',
			cls: 'tw-editdialog',
			border:false,
			items:[/*{
			    xtype: 'tabpanel',
			    id: 'book-edit-dialog-childpanel-container',
			    border: false,
			    plain:true,
			    layoutOnTabChange: true,
			    border:false,
			    activeTab: 0,
			    items: tabPanelItems
			}*/
			       editPanel]
		}]}; 
	
	
	var contentPanelItems = [{
 	   xtype:'panel',
	   region:'center',
	   header:false,
	   border:false,
	   frame:true,
	   layout:'fit',
	   items:[editDialogPanel]
   }];
	
	if(components.grid.useGrid){
		var gridWrapperItem = {
    	   xtype:'panel',
    	   id:'book-edit-dialog-grid-container',
    	   region:'north',
    	   height:180,
    	   header:false,
    	   border:false,
    	   split:true,
    	   collapsible:true,
    	   collapseMode:'mini',
    	   collapsed:true,
    	   layout:'fit',
    	   items:[components.grid.grid]
		};
		contentPanelItems.push(gridWrapperItem);
	}
	
	return [{
		xtype:'panel',
		layout:'fit',
		id: 'book-main-content-panel',
		items: [{
	  	   xtype:'panel',
	  	   header: false,
	  	   border:false,
	 	   layout:'border',
	 	   items: contentPanelItems
	    }]
	}];
};

Tine.Publisher.getBookEditPanel = function(){
	/*return {
		xtype: 'panel',
		id: 'Publisher-edit-dialog-panel',
		title: 'Buch',
		border: false,
		frame: true,
		cls: 'tw-editdialog',
		layout:'fit',
		autoScroll: true,
		defferedRender:true,
		defaults: {
		    xtype: 'fieldset',
		    // -> never do this: kills IE
		    //autoHeight: 'auto',
		    layout:'box',
		    disabledClass: 'x-item-disabled-view',
		    defaultType: 'textfield'
		},
		items:[
		           
		]};
		
		*/
		return {
			id: 'Publisher-edit-dialog-panel',
			title: 'Buch',
			border: false,
			frame: true,
			cls: 'tw-editdialog',
			layout:'border',
			defferedRender:true,
			items:[{
				xtype:'panel',
				region:'center',
				layout:'fit',
				autoScroll: true,
				border:false,
				width: 710,
				height:510,
			    items: Tine.Publisher.getBookFormItems() 
			}]};
}

Tine.Publisher.getBookEditPanelEmbedded = function(){
	return {
		xtype: 'panel',
		id: 'publisher-edit-dialog-panel',
		title: 'Bücher',
		border: false,
		//frame: true,
		layout:'border',
		items:[ 
			/*{
				xtype: 'panel',
				id: 'publisher-edit-dialog-panel-toolbar',
				height: 26,
				layout:'fit',
				region:'north',
				tbar: new Ext.Toolbar()
			},*/{
				xtype: 'panel',
				region:'center',
				border: false,
				frame: true,
				cls: 'tw-editdialog',
				layout:'border',
				defferedRender:true,
				tbar: new Ext.Toolbar({id:'publisher-edit-dialog-panel-toolbar-tb',height:26}),
				items:[{
					xtype:'panel',
					region:'center',
					layout:'fit',
					autoScroll: true,
					border:false,
					width: 710,
					height:510,
				    items: Tine.Publisher.getBookFormItems() 
				}]}
		]
	};
}

Tine.Publisher.getBookFormItems = function(){
	return [
		{title:'',layout:'fit',checkboxToggle:false,border:false,items:[
	{
	    xtype: 'panel',
	    layout: 'fit',
	    style: {
	        position: 'absolute',
	        width: '300px',
	        height: '400px',
	        left: '620px',
	        top: Ext.isGecko ? '10px' : '23px',
	        'z-index': 100
	    },
	    items: [new Ext.ux.form.ImageField({
	    	id:'book_jpegphoto',
	        name: 'jpegphoto',
	        width: 100,
	        height: 148,
	        ratiomode: 1,
	        imageField:true
	    })]
	},
	{xtype:'columnform',items:[[
	       {xtype: 'hidden',id:'book_id',name:'id'}
		],[
			new Tine.Tinebase.widgets.form.RecordPickerComboBox({
				tpl: Tine.Publisher.getContactPickerTemplate(),
				disabledClass: 'x-item-disabled-view',
				fieldLabel: 'Autor',
			    id:'book_author_contact_id',
			    name:'author_contact_id',
			    disabled: false,
			    onAddEditable: true,
			    onEditEditable: false,
			    blurOnSelect: true,
			    recordClass: Tine.Addressbook.Model.Contact,
			    width: 200,
			    allowBlank:false
			}),
			{
				fieldLabel: 'Autor Pseudonym',
			  	disabledClass: 'x-item-disabled-view',
				width: 200,
				id: 'book_pseudonym',
				name: 'pseudonym'
			},
			new Tine.Tinebase.widgets.form.RecordPickerComboBox({
				tpl: Tine.Publisher.getContactPickerTemplate(),
				itemSelector: 'div.search-item',
				disabledClass: 'x-item-disabled-view',
				width: 200,
				fieldLabel: 'Lektor',
			    id:'book_lector_contact_id',
			    name:'lector_contact_id',
			    disabled: false,
			    onAddEditable: true,
			    onEditEditable: true,
			    blurOnSelect: true,
			    recordClass: Tine.Addressbook.Model.Contact,
			    width: 200,
			    allowBlank:true
			})
		],[
			{
				xtype: 'textarea',
				fieldLabel: 'Buchtitel',
				disabledClass: 'x-item-disabled-view',
				id:'book_title',
				name:'title',
				width: 600,
				height: 40
			}
		],[		
			{
				fieldLabel: 'ISBN',
			  	disabledClass: 'x-item-disabled-view',
				width: 200,
				id: 'book_isbn',
				name: 'isbn'
			},{
			    fieldLabel: 'Genre',
			    disabledClass: 'x-item-disabled-view',
			    context: 'book_genre_id',
				xtype: 'sogenericstatefield',
				width:200,
				id:'book_genre_id',
			    name:'genre_id',
				allowBlank:true
			},{
			    fieldLabel: 'Format',
			    disabledClass: 'x-item-disabled-view',
			    context: 'book_format_id',
				xtype: 'sogenericstatefield',
				width:200,
				id:'book_format_id',
			    name:'format_id',
				allowBlank:true
			}
		],[			
			{
			   	xtype: 'datefield',
				disabledClass: 'x-item-disabled-view',
				fieldLabel: 'Erscheinungsdatum', 
				id:'book_publish_date',
				name:'publish_date',
			    width: 100
			},{
				xtype: 'monetarynumfield',
				fieldLabel: 'Ladenpreis',
			  	disabledClass: 'x-item-disabled-view',
				width: 100,
				id: 'book_store_price',
				name: 'store_price'
			},{
				fieldLabel: 'Aktuelle Auflage',
			  	disabledClass: 'x-item-disabled-view',
				width: 100,
				id: 'book_actual_edition',
				name: 'actual_edition'
			},{
				fieldLabel: 'Höhe Auflage',
			  	disabledClass: 'x-item-disabled-view',
				width: 150,
				id: 'book_actual_edition_amount',
				name: 'actual_edition_amount'
			},{
				fieldLabel: 'Umfang',
			  	disabledClass: 'x-item-disabled-view',
				width: 150,
				id: 'book_range',
				name: 'range'
			}
		],[
			{
				xtype: 'textarea',
				fieldLabel: 'Honorar',
				disabledClass: 'x-item-disabled-view',
				id:'book_charge',
				name:'charge',
				width: 720,
				height: 40
			}
		],[
			{
				xtype: 'textarea',
				fieldLabel: 'Bemerkung',
				disabledClass: 'x-item-disabled-view',
				id:'book_comment',
				name:'comment',
				width: 300,
				height: 200
			},
			{
				xtype: 'textarea',
				fieldLabel: 'Klappentext',
				disabledClass: 'x-item-disabled-view',
				id:'book_cover_abstract',
				name:'cover_abstract',
				width: 420,
				height: 200
			}
		]
		]}]}
	];
};

Tine.Publisher.getContactPickerTemplate = function(){
	return new Ext.XTemplate(
	        '<tpl for="."><div class="search-item">',
	        '<table cellspacing="0" cellpadding="2" border="0" style="font-size: 11px;" width="100%">',
	            '<tr>',
	                '<td width="30%"><b>{[this.encode(values.n_fileas)]}</b><br/>{[this.encode(values.org_name)]}</td>',
	                '<td width="25%">{[this.encode(values.adr_one_street)]}<br/>',
	                    '{[this.encode(values.adr_one_postalcode)]} {[this.encode(values.adr_one_locality)]}</td>',
	                '<td width="25%">{[this.encode(values.tel_work)]}<br/>{[this.encode(values.tel_cell)]}</td>',
	                '<td width="20%">',
	                    '<img width="45px" height="39px" src="{jpegphoto}" />',
	                '</td>',
	            '</tr>',
	        '</table>',
	    '</div></tpl>',
	    {
	        encode: function(value) {
	             if (value) {
	                return Ext.util.Format.htmlEncode(value);
	            } else {
	                return '';
	            }
	        }
	    });
};
