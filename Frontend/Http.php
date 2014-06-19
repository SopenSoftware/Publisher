<?php


/**
 * This class handles all Http requests for the Publisher application
 *
 * @package     Publisher
 * @subpackage  Frontend
 */
class Publisher_Frontend_Http extends Tinebase_Frontend_Http_Abstract
{
    protected $_applicationName = 'Publisher';
    
    /**
     * Returns all JS files which must be included for this app
     *
     * @return array Array of filenames
     */
    public function getJsFilesToInclude()
    {
        return array(
        	'Publisher/js/Models.js',
            'Publisher/js/Backend.js',
        	'Publisher/js/MainScreen.js',
            'Publisher/js/AddressbookPlugin.js',
            'Publisher/js/BookEditRecord.js',
        	'Publisher/js/BookGridPanel.js',
            'Publisher/js/Renderer.js'
        );
    }
    
    public function getCssFilesToInclude()
    {
        return array(
            'Publisher/css/Publisher.css'
        );
    }
}
