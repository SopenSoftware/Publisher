<?php
class Publisher_Backend_Book extends Tinebase_Backend_Sql_Abstract
{
    /**
     * Table name without prefix
     *
     * @var string
     */
    protected $_tableName = 'publisher_book';
    
    /**
     * Model name
     *
     * @var string
     */
    protected $_modelName = 'Publisher_Model_Book';

    /**
     * if modlog is active, we add 'is_deleted = 0' to select object in _getSelect()
     *
     * @var boolean
     */
    protected $_modlogActive = false;
    
    /**
     * get the basic select object to fetch records from the database
     *  
     * @param array|string|Zend_Db_Expr $_cols columns to get, * per default
     * @param boolean $_getDeleted get deleted records (if modlog is active)
     * @return Zend_Db_Select
     * 
     * @todo    move visibility='displayed' check to book filter
     */
    protected function _getSelect($_cols = '*', $_getDeleted = FALSE)
    {        
        $select = parent::_getSelect($_cols, $_getDeleted);
        
        if ($_cols == '*' || array_key_exists('jpegphoto', (array)$_cols)) {
            $select->joinLeft(
                /* table  */ array('image' => $this->_tablePrefix . 'publisher_book_image'), 
                /* on     */ $this->_db->quoteIdentifier('image.book_id') . ' = ' . $this->_db->quoteIdentifier($this->_tableName . '.id'),
                /* select */ array('jpegphoto' => 'IF(ISNULL('. $this->_db->quoteIdentifier('image.image') .'), 0, 1)')
            );
        }
        Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ . ' ' . print_r($select->assemble(), TRUE));
        return $select;
    }
    
    public function search(Tinebase_Model_Filter_FilterGroup $_filter = NULL, Tinebase_Model_Pagination $_pagination = NULL, $_onlyIds = FALSE){
        $recordSet = parent::search($_filter,$_pagination,$_onlyIds);
    	if( ($recordSet instanceof Tinebase_Record_RecordSet) && ($recordSet->count()>0)){
    		$it = $recordSet->getIterator();
    		foreach($it as $key => $record){
				$this->appendDependentRecords($record);				
    		}
    	}
    	Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ . ' ' . print_r($recordSet->toArray(), TRUE));
    	return $recordSet;
    }
    
    /**
     * Append books by foreign key (record embedding)
     * 
     * @param Tinebase_Record_Abstract $record
     * @return void
     */
    protected function appendDependentRecords($record){
		if($record->__get('author_contact_id')){
    		$this->appendForeignRecordToRecord($record, 'author_contact_id', 'author_contact_id', 'id', Addressbook_Backend_Factory::factory(Addressbook_Backend_Factory::SQL));
    	}
        if($record->__get('lector_contact_id')){
    		$this->appendForeignRecordToRecord($record, 'lector_contact_id', 'lector_contact_id', 'id', Addressbook_Backend_Factory::factory(Addressbook_Backend_Factory::SQL));
    	}    	
    }
    /**
     * Get Donator record by id (with embedded dependent books)
     * 
     * @param int $id
     */
    public function get($id, $_getDeleted = FALSE){
    	$record = parent::get($id, $_getDeleted);
    	$this->appendDependentRecords($record);
    	return $record;
    }
    
    /**
     * Creates new entry
     *
     * @param   Tinebase_Record_Interface $_record
     * @return  Tinebase_Record_Interface
     * @throws  Tinebase_Exception_InvalidArgument
     * @throws  Tinebase_Exception_UnexpectedValue
     * 
     * @todo    remove autoincremental ids later
     */
    public function create(Tinebase_Record_Interface $_record) 
    {
        $book = parent::create($_record);
        if (! empty($_record->jpegphoto)) {
            $book->jpegphoto = $this->_saveImage($book->getId(), $_record->jpegphoto);
        }
        
        Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ . ' ' . print_r($book, TRUE));
        
        return $book;
    }
    
    /**
     * Updates existing entry
     *
     * @param Tinebase_Record_Interface $_record
     * @throws Tinebase_Exception_Record_Validation|Tinebase_Exception_InvalidArgument
     * @return Tinebase_Record_Interface Record|NULL
     */
    public function update(Tinebase_Record_Interface $_record) 
    {
        $book = parent::update($_record);
        
        if (isset($_record->jpegphoto)) {
            $book->jpegphoto = $this->_saveImage($book->getId(), $_record->jpegphoto);
        }
          Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ . ' ' . print_r($book, TRUE));
        return $book;
    }
    
    /**
     * returns book image
     *
     * @param int $bookId
     * @return blob
     */
    public function getImage($bookId)
    {
        $select = $this->_db->select()
            ->from($this->_tablePrefix . 'publisher_book_image', array('image'))
            ->where($this->_db->quoteIdentifier('book_id'). ' = ?', $bookId);
        $imageData = $this->_db->fetchOne($select, 'image');
        
        return $imageData ? base64_decode($imageData) : '';
    }
    
    /**
     * saves image to db
     *
     * @param  int $bookId
     * @param  blob $imageData
     * @return blob
     */
    public function _saveImage($bookId, $imageData)
    {
    	$this->_db->delete(
        	$this->_tablePrefix . 'publisher_book_image',
            array(
            	$this->_db->quoteInto($this->_db->quoteIdentifier('book_id') . ' = ?', $bookId)
        	)
        );
        if (! empty($imageData)) {
            $this->_db->insert($this->_tablePrefix . 'publisher_book_image', array(
                'book_id'    => $bookId,
                'image'         => base64_encode($imageData)
            ));
        }
        
        return $imageData;
    }
}
?>