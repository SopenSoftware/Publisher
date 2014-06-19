<?php
class Publisher_Controller_Book extends Tinebase_Controller_Record_Abstract
{
    /**
     * config of courses
     *
     * @var Zend_Config
     */
    protected $_config = NULL;
    
    /**
     * the constructor
     *
     * don't use the constructor. use the singleton
     */
    private function __construct() {
        $this->_applicationName = 'Publisher';
        $this->_backend = new Publisher_Backend_Book();
        $this->_modelName = 'Publisher_Model_Book';
        $this->_currentAccount = Tinebase_Core::getUser();
        $this->_purgeRecords = FALSE;
        $this->_doContainerACLChecks = FALSE;
        $this->_config = isset(Tinebase_Core::getConfig()->publisher) ? Tinebase_Core::getConfig()->publisher : new Zend_Config(array());
    }
    
    private static $_instance = NULL;
    
    /**
     * the singleton pattern
     *
     * @return SoEventManager_Controller_SoEvent
     */
    public static function getInstance()
    {
        if (self::$_instance === NULL) {
            self::$_instance = new self();
        }
        
        return self::$_instance;
    }
    
    /**
     * gets binary contactImage
     *
     * @param int $_contactId
     * @return blob
     */
    public function getImage($bookId) {
        $image = $this->_backend->getImage($bookId);
        return $image;
    }
}
?>