Ext.ns('Tine.Publisher','Tine.Publisher.Model');

/**
* sopen publisher models
*/

Tine.Publisher.Model.BookArray = [
   {name: 'id'},				// (pk)
   {name: 'author_contact_id'}, // (fk)
   {name: 'lector_contact_id'}, // (fk)
   {name: 'pseudonym'},
   {name: 'publish_date'},
   {name: 'store_price'}, 
   {name: 'charge'},
   {name: 'actual_edition'},  
   {name: 'actual_edition_amount' },
   {name: 'isbn'},
   {name: 'title'},
   {name: 'genre_id'},
   {name: 'format_id'},
   {name: 'range'},
   {name: 'cover_abstract'},
   {name: 'comment'},
   {name: 'jpegphoto'}
 ];

 /**
 * @type {Tine.Tinebase.data.Record}
 * Contact record definition
 */
 Tine.Publisher.Model.Book = Tine.Tinebase.data.Record.create(Tine.Publisher.Model.BookArray, {
 	appName: 'Publisher',
	modelName: 'Book',
	idProperty: 'id',
	recordName: 'Buch',
	recordsName: 'Bücher',
	containerProperty: null,
	titleProperty: 'title',
	 relations:[{
		name: 'publisher_author_contact',
		model: Tine.Addressbook.Model.Contact,
		fkey: 'author_contact_id',
		embedded:true,
		emissions:[
		    {dest: {
		    	name: 'author_contact_nr'}, 
		    	source: function(contact){
		    		if(typeof(contact) === 'object'){
		    			contact = new Tine.Addressbook.Model.Contact(contact);
		    			return contact.get('id');
		    		}else{
		    			return contact;
		    		}
		    	}
	    	},{dest: {
		    	name: 'author_book_title'}, 
		    	source: function(author, book){
		    		if(typeof(author) === 'object'){
		    			return book.get('title') + ' - Autor: ' + author.getTitle();
		    		}else{
		    			return author;
		    		}
		    	}
		    }
		]
	}]
 });

Tine.Publisher.Model.Book.getDefaultData = function(){
	return {};
};
 
Tine.Publisher.Model.Book.getFilterModel = function() {
    var app = Tine.Tinebase.appMgr.get('Publisher');
    return [
            {label: _('Quick search'),				field: 'query',       operators: ['contains']},
            {label: app.i18n._('Autor Pseudonym'),  field: 'pseudonym' },
            {label: app.i18n._('Buchtitel'),        field: 'title' },
            {label: app.i18n._('ISBN'),        		field: 'isbn' },
            {label: app.i18n._('Bemerkung'),        field: 'comment' },
            {label: app.i18n._('Klappentext'),      field: 'cover_abstract' }
    ];
};