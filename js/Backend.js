Ext.ns('Tine.Publisher');

Tine.Publisher.bookBackend = new Tine.Tinebase.data.RecordProxy({
	   appName: 'Publisher',
	   modelName: 'Book',
	   recordClass: Tine.Publisher.Model.Book
});