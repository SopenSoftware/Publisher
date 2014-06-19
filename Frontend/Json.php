<?php
class Publisher_Frontend_Json extends Tinebase_Frontend_Json_Abstract{
    protected $_controller = NULL;

    protected $_config = NULL;
    protected $_userTimezone = null;
    protected $_serverTimezone = null;
    
    /**
     * the constructor
     *
     */
    public function __construct()
    {
        $this->_applicationName = 'Publisher';
        $this->_controller = Publisher_Controller_Book::getInstance();
    }
    
    public function getBook($id){
    	if(!$id ) {
            $obj = $this->_controller->getEmptyBook();
        } else {
            $obj = $this->_controller->get($id);
        }
       // $objData = $obj->toArray();
        $objData = $this->_recordToJson($obj);
        return $objData;
    }
    
    public function searchBooks($filter,$paging){
    	return $this->_search($filter,$paging,$this->_controller,'Publisher_Model_BookFilter');
    }
    
    public function deleteBooks($ids){
    }
    
    public function saveBook($recordData){
    	return $this->_save($recordData, $this->_controller, 'Book');
    }
    
    /**
     * returns a image link
     * 
     * @param  Addressbook_Model_Contact|array
     * @return string
     */
    protected function _getImageLink($book)
    {
    	if ((array_key_exists('jpegphoto',$book) && $book['jpegphoto']) || ($book->jpegphoto)) {
            $link =  'index.php?method=Tinebase.getImage&application=Publisher&location=&id=' . $book['id'] . '&width=100&height=148&ratiomode=1';
        } else {
            $link = CSopen::instance()->getTineImagesURL().'/empty_photo.png';
        }
        return $link;
    }
    
    /**
     * returns record prepared for json transport
     *
     * @param Tinebase_Record_Interface $_record
     * @return array record data
     */
    protected function _recordToJson($_record)
    {
    	$result = parent::_recordToJson($_record);
    	$result['jpegphoto'] = $this->_getImageLink($_record);
    	return $result;
    }
    
    /**
     * returns multiple records prepared for json transport
     *
     * @param Tinebase_Record_RecordSet $_records Tinebase_Record_Abstract
     * @param Tinebase_Model_Filter_FilterGroup
     * @return array data
     */
    protected function _multipleRecordsToJson(Tinebase_Record_RecordSet $_records, $_filter=NULL)
    {
        $result = parent::_multipleRecordsToJson($_records, $_filter);
        
        foreach ($result as &$book) {
      	    $book['jpegphoto'] = $this->_getImageLink($book);
        }
        
        return $result;
    }
}

?>