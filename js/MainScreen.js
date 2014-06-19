/**
 * Sopen
 * 
 * @package     Membership
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author     
 * @copyright   
 * @version     $Id:  $
 *
 */
Ext.ns('Tine.Publisher');

Tine.Publisher.Application = Ext.extend(Tine.Addressbook.Application, {
    addressbookPlugin: null,
    
	init: function(){
		Tine.Tinebase.appMgr.on('initall',this.onInitAll,this);
	},
	
	onInitAll: function(){
		this.addressbookPlugin = new Tine.Publisher.AddressbookPlugin();
		Tine.Tinebase.appMgr.get('Addressbook').registerPlugin(new Tine.Publisher.AddressbookPlugin());
		this.registerPlugin(this.addressbookPlugin);
	},
    /**
     * Get translated application title of the calendar application
     * 
     * @return {String}
     */
    getTitle: function() {
        return this.i18n.ngettext('Bücher', 'Bücher', 1);
    }
});

Tine.Publisher.MainScreen = Ext.extend(Tine.widgets.MainScreen, {
    activeContentType: 'Publisher',
    westPanelXType: 'tine.publisher.treepanel',
    mainPanel: null,
    bookPanel: null,
    publisherPanel: null,
    brevetPanel: null,
    brevetAssociationExtPanel: null,
    bookEmbedded: true,
    
    initComponent: function(){
		Tine.Publisher.MainScreen.superclass.initComponent.call(this);
	},
    show: function() {
	    if(this.fireEvent("beforeshow", this) !== false){
	    	this.showWestPanel();
	        this.showCenterPanel();
	        this.showNorthPanel();
	        this.fireEvent('show', this);
	    }
	    return this;
	},
	getCenterPanel: function(activeContentType){
		
		switch(activeContentType){
		case 'Book':
			if(!this.publisherPanel){
				this.publisherPanel = new Tine.Publisher.BookGridPanel({
					app: this.app,
					plugins:[]
				});
			}
			this.mainPanel = this.publisherPanel;
			break;
			
		default:
			if(!this.bookPanel){
				this.bookPanel = new Tine.Publisher.BookGridPanel({
					app: this.app,
					plugins:[]
				});
			}
			this.mainPanel = this.bookPanel;
			break;
		}
		return this.mainPanel;
	},
	setBookEmbedded: function(bookEmbedded){
		if( this.bookEmbedded !== bookEmbedded){
			delete this.bookPanel;
		}
		this.bookEmbedded = bookEmbedded;
	},
	getNorthPanel: function(){
		if(this.activeContentType == 'Book'){
			try{
				return this.mainPanel.getGrid().getActionToolbar();	
			}catch(e){
				
			}
			
		}
		return this.mainPanel.getActionToolbar();
	}
});

Tine.Publisher.FilterPanel = function(config) {
    Ext.apply(this, config);
    Tine.Publisher.FilterPanel.superclass.constructor.call(this);
};

Ext.extend(Tine.Publisher.FilterPanel, Tine.widgets.persistentfilter.PickerPanel, {
	suppressEvents:false,
    filter: [{field: 'model', operator: 'equals', value: 'Publisher_Model_BookFilter'}],
    onFilterChange: function(){
	}
});

Tine.Publisher.TreePanel = Ext.extend(Ext.tree.TreePanel, {
	rootVisible:false,
	useArrows:true,
    initComponent: function() {
        this.root = {
            id: 'root',
            leaf: false,
            expanded: true,
            children: [{
                text: this.app.i18n._('Bücher'),
                id : 'bookContainer',
                contentType: 'Book',
                leaf:true
            }]
        };
        
    	Tine.Publisher.TreePanel.superclass.initComponent.call(this);
        this.on('click', function(node) {
            if (node.attributes.contentType !== undefined) {
                this.app.getMainScreen().activeContentType = node.attributes.contentType;
                if(node.attributes.id == 'bookPublisherContainer'){
                	 this.app.getMainScreen().setBookEmbedded(true);
                }else{
                	this.app.getMainScreen().setBookEmbedded(false);
                }
                this.app.getMainScreen().show();
            }
        }, this);
	},
	splitViewToggle: function(){
		alert('split it');
	}
});
Ext.reg('tine.publisher.treepanel',Tine.Publisher.TreePanel);

