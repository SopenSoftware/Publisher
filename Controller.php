<?php
/**
 * Tine 2.0
 * 
 * MAIN controller for addressbook, does event and container handling
 *
 * @package     Publisher
 * @subpackage  Controller
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Lars Kneschke <l.kneschke@metaways.de>
 * @copyright   Copyright (c) 2007-2008 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id: Controller.php 14551 2010-05-28 12:47:00Z f.wiechmann@metaways.de $
 * 
 */

/**
 * main controller for Publisher
 *
 * @package     Publisher
 * @subpackage  Controller
 */
class Publisher_Controller extends Tinebase_Controller_Abstract
{
    /**
     * holds the instance of the singleton
     *
     * @var Publisher_Controller
     */
    private static $_instance = NULL;

    /**
     * constructor (get current user)
     */
    private function __construct() {
        $this->_currentAccount = Tinebase_Core::getUser();
    }
    
    /**
     * don't clone. Use the singleton.
     *
     */
    private function __clone() 
    {        
    }
    
    /**
     * the singleton pattern
     *
     * @return Publisher_Controller
     */
    public static function getInstance() 
    {
        if (self::$_instance === NULL) {
            self::$_instance = new Publisher_Controller;
        }
        
        return self::$_instance;
    }

    /**
     * returns contact image
     * 
     * @param   string $_identifier record identifier
     * @param   string $_location not used, requierd by interface
     * @return  Tinebase_Model_Image
     * @throws  Publisher_Exception_NotFound if no image found
     */
    public function getImage($_identifier, $_location='')
    {
        // get contact to ensure user has read rights
        $image = Publisher_Controller_Book::getInstance()->getImage($_identifier);
        Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ . ' ' . print_r($image, TRUE));
        if (empty($image)) {
            throw new Publisher_Exception_NotFound('Book has no image.');
        }
        $imageInfo = Tinebase_ImageHelper::getImageInfoFromBlob($image);
        
        return new Tinebase_Model_Image($imageInfo + array(
            'id'           => $_identifier,
            'application'  => 'Publisher',
            'data'         => $image
        ));
    }
    
}
