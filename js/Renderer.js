Ext.namespace('Tine.Publisher');
Ext.namespace('Tine.Publisher.renderer');

Tine.Publisher.renderer.contactRenderer =  function(_recordData) {
	if(!_recordData){
		return null;
	}
	_record = new Tine.Addressbook.Model.Contact(_recordData,_recordData.id);
	if(typeof(_record) === 'object' && !Ext.isEmpty(_record)){
		try{
			// focus organisation -> true
			return _record.getTitle(true);
		}catch(e){
			return "";
		}
	}
};

Tine.Publisher.renderer.brevetAssocExtRenderer =  function(_recordData) {
	if(!_recordData){
		return null;
	}
	_record = new Tine.Publisher.Model.BrevetAssociationExt(_recordData,_recordData.id);
	if(typeof(_record) === 'object' && !Ext.isEmpty(_record)){
		try{
			return _record.getTitle();
		}catch(e){
			return "";
		}
	}
};

Tine.Publisher.renderer.brevetRenderer =  function(_recordData) {
	if(!_recordData){
		return null;
	}
	_record = new Tine.Publisher.Model.Brevet(_recordData,_recordData.id);
	if(typeof(_record) === 'object' && !Ext.isEmpty(_record)){
		try{
			return _record.getTitle();
		}catch(e){
			return "";
		}
	}
};

Tine.Publisher.renderer.publisherNumberRenderer =  function(_recordData) {
	if(!_recordData){
		return null;
	}
	_record = new Tine.Publisher.Model.Brevet(_recordData,_recordData.id);
	if(typeof(_record) === 'object' && !Ext.isEmpty(_record)){
		try{
			return _record.get('publisher_nr');
		}catch(e){
			return "";
		}
	}
};

Tine.Publisher.renderer.bookContactRenderer =  function(_recordData) {
	if(!_recordData){
		return null;
	}
	_record = new Tine.Publisher.Model.Book(_recordData,_recordData.id);
	if(typeof(_record) === 'object' && !Ext.isEmpty(_record)){
		try{
			var contact = _record.get('contact_id');
			var contactRec = new Tine.Addressbook.Model.Contact(contact);
			return contactRec.getTitle();
		}catch(e){
			return "";
		}
	}
};

Tine.Publisher.renderer.brevetKind = function(v){
	switch(v){
	case 'DIVER':
		return 'Taucher';
	case 'DIVINGTEACHER':
		return 'Tauchlehrer';
	}
}

Tine.Publisher.renderer.dtStatus = function(v){
	switch(v){
	case 'IDEOLOGIC':
		return 'ideell';
	case 'COMMERCIAL':
		return 'kommerziell';
	case 'NOVALUE':
		return '';		
	}
}


