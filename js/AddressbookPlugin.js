Ext.ns('Tine.Publisher');

Tine.Publisher.AddressbookPlugin = Ext.extend(Tine.Tinebase.AppPlugin, {
	pluginName: 'PublisherAddressbookPlugin',
	contactEditDialog: null,
	bookEditDialog: null,
	
	getEditDialogMainTabs: function(contactEditDialog, navigate){
		this.navigate = navigate;
		this.registerContactEventListeners(contactEditDialog);
		this.contactEditDialog = contactEditDialog;
		this.bookEditDialog = Tine.Publisher.getBookEditRecordAsTab(true);
		return [this.bookEditDialog];
	},
	
	registerContactEventListeners: function(contactEditDialog){
		contactEditDialog.on('loadcontact',this.onLoadContact,this);
	},
	
	onLoadContact: function(contact){
		//this.contactEditDialog.un('loadcontact',this.onLoadContact,this);
		this.bookEditDialog.onLoadParent(contact);
		return true;
	},
	
	onUpdateContact: function(contact){
		this.bookEditDialog.save(contact);
		return true;
	},
	
	onCancelContactEditDialog: function(){
		this.unsetPublisherEditDialog();
		return true;
	},
	onSaveAndCloseContactDialog: function(){
		this.onSaveContact();
		this.unsetPublisherEditDialog();
		return true;
	},
	unsetPublisherEditDialog: function(){
		this.bookEditDialog = null;
	}
});