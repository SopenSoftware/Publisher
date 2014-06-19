Ext.ns('Tine.Publisher');

Tine.Publisher.getBookGridConfig = function(app){
	return {
	    recordClass: Tine.Publisher.Model.Book,
		recordProxy: Tine.Publisher.Model.bookBackend,
		columns: [
		   { id: 'author_contact_id', header: app.i18n._('Autor'), dataIndex: 'author_contact_id',renderer:Tine.Publisher.renderer.contactRenderer, sortable:true  },
		   { id: 'lector_contact_id', header: app.i18n._('Lektor'), dataIndex: 'lector_contact_id',renderer:Tine.Publisher.renderer.contactRenderer, sortable:true  },
		   { id: 'pseudonym', header: app.i18n._('Pseudonym'), dataIndex: 'pseudonym',hidden:false, sortable:true },		               
		   { id: 'title', header: app.i18n._('Buchtitel'), dataIndex: 'title',hidden:false, sortable:true },
		   { id: 'isbn', header: app.i18n._('ISBN'), dataIndex: 'isbn',hidden:false, sortable:true },
		   { id: 'publish_date', header: app.i18n._('Erscheinungsdatum'), dataIndex: 'publish_date',hidden:true, sortable:true,renderer: Tine.Tinebase.common.dateRenderer },
		   { id: 'store_price', header: app.i18n._('Ladenpreis'), dataIndex: 'store_price',hidden:true, sortable:true, renderer:Sopen.Renderer.MonetaryNumFieldRenderer },
           { id: 'genre_id', header: app.i18n._('Genre'), dataIndex: 'genre_id',hidden:true, sortable:true,renderer: Sopen.GenericAttribute.Renderer },
           { id: 'format_id', header: app.i18n._('Format'), dataIndex: 'format_id',hidden:true, sortable:true,renderer: Sopen.GenericAttribute.Renderer },
           { id: 'actual_edition', header: app.i18n._('Aktuelle Auflage'), dataIndex: 'actual_edition',hidden:false, sortable:true },
           { id: 'actual_edition_amount', header: app.i18n._('Auflagenhöhe'), dataIndex: 'actual_edition_amount', hidden:true, sortable:true },
           { id: 'range', header: app.i18n._('Umfang'), dataIndex: 'range',hidden:true, sortable:true },
           { id: 'cover_abstract', header: app.i18n._('Klappentext'), dataIndex: 'cover_abstract',hidden:true, sortable:true },
           { id: 'comment', header: app.i18n._('Bemerkung'), dataIndex: 'comment',hidden:true, sortable:true }
    	],
		actionTexts: {
			addRecord:{
				buttonText: 'Buch hinzufügen',
				buttonTooltip: 'Fügt ein neues Buch hinzu'
			},
			editRecord:{
				buttonText: 'Buch bearbeiten',
				buttonTooltip: 'Öffnet das Formular "Buch" zum Bearbeiten'
			},
			deleteRecord:{
				buttonText: 'Buch löschen',
				buttonTooltip: 'Löscht ausgewählte(s) Bücher(Buch)'
			}
	   }};
};

/**
 * dependent edit form grid panel, to be shown in a dependent edit form
 */
Tine.Publisher.BookGridPanelNested = Ext.extend(Tine.widgets.grid.DependentEditFormGridPanel, {
	id: 'tine-publisher-book-nested-gridpanel',
	stateId: 'tine-publisher-book-nested-gridpanel',
	title: 'Buch',
	titlePrefix: 'Buch ',
    grouping: false,
    withFilterToolbar: true,
    parentRelation:{
		fKeyColumn: 'author_contact_id',
		refColumn: 'id'
	},
	// never, really never forget grid config (gridID especially), 
	// otherwise in nested panels the grid view of the parent grid get's overriden by child
	// -> causes strange effects of course	
	gridConfig: {
		gridID: 'tine-brev-publisher-master-nest-gp',
        loadMask: true
    },	
    recordClass: Tine.Publisher.Model.Book,
    recordProxy: Tine.Publisher.Model.bookBackend,
	initComponent : function() {
		this.id = 'tine-publisher-book-nested-gridpanel';
		this.actionTexts = Tine.Publisher.getBookGridConfig(this.app).actionTexts,
		this.filterModels = Tine.Publisher.Model.Book.getFilterModel();

		Tine.Publisher.BookGridPanelNested.superclass.initComponent.call(this);
	},

	getColumns: function() {
		return Tine.Publisher.getBookGridConfig(this.app).columns;
	}
});
Ext.reg('booknestedgrid', Tine.Publisher.BookGridPanelNested);

/**
 * regular grid panel
 */
Tine.Publisher.BookGridPanel = Ext.extend(Tine.widgets.grid.GridPanel, {
	id: 'tine-publisher-book-gridpanel',
	stateId: 'tine-publisher-book-gridpanel',
    recordClass: Tine.Publisher.Model.Book,
    evalGrants: false,
    // grid specific
    defaultSortInfo: {field: 'author_contact_id', direction: 'DESC'},
    gridConfig: {
        loadMask: true,
        autoExpandColumn: 'title'
    },
    initComponent: function() {
        this.recordProxy = Tine.Publisher.bookBackend;
        
        this.gridConfig.columns = this.getColumns();
        this.initFilterToolbar();
        
        this.plugins = this.plugins || [];
        this.plugins.push(this.filterToolbar);        
        
        Tine.Publisher.BookGridPanel.superclass.initComponent.call(this);
    },
    initFilterToolbar: function() {
		var quickFilter = [new Tine.widgets.grid.FilterToolbarQuickFilterPlugin()];	
		this.filterToolbar = new Tine.widgets.grid.FilterToolbar({
            app: this.app,
            filterModels: Tine.Publisher.Model.Book.getFilterModel(),
            defaultFilter: 'query',
            filters: [{field:'query',operator:'contains',value:''}],
            plugins: quickFilter
        });
    },  
    
	getColumns: function() {
    	return Tine.Publisher.getBookGridConfig(this.app).columns;
	}
});
Ext.reg('bookgrid', Tine.Publisher.BookGridPanel);