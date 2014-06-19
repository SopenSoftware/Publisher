<?php
/**
 * Sopen 1.1
 * 
 * @package     Publisher
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Hans-Jürgen Hartl <hhartl@sopen.de>
 * @copyright   Copyright (c) 2010 Sopen GmbH <www.sopen.de>
 * @version     $Id:  $
 *
 */

/**
 * class for Publisher initialization
 * 
 * @package     Setup
 */
class Publisher_Setup_Initialize extends Setup_Initialize{
	    /**
     * Override method: Setup needs additional initialisation
     * 
     * @see tine20/Setup/Setup_Initialize#_initialize($_application)
     */
    public function _initialize(Tinebase_Model_Application $_application, $_options = null){
    	 parent::_initialize($_application, $_options);
    }
}