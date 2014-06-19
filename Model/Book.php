<?php

/**
 * class to hold Book data
 *
 * @package     Publisher
 */
class Publisher_Model_Book extends Tinebase_Record_Abstract
{
	/**
	 * key in $_validators/$_properties array for the filed which
	 * represents the identifier
	 *
	 * @var string
	 */
	protected $_identifier = 'id';

	/**
	 * application the record belongs to
	 *
	 * @var string
	 */
	protected $_application = 'Publisher';

	/**
	 * list of zend validator
	 *
	 * this validators get used when validating user generated content with Zend_Input_Filter
	 *
	 * @var array
	 *
	 */
	protected $_validators = array(
        'id'                    => array(Zend_Filter_Input::ALLOW_EMPTY => true, Zend_Filter_Input::DEFAULT_VALUE => NULL),
        'author_contact_id'                  => array(Zend_Filter_Input::ALLOW_EMPTY => false),
    	'lector_contact_id'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'pseudonym'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'publish_date'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true, Zend_Filter_Input::DEFAULT_VALUE => NULL),
  		'store_price'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'charge'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'actual_edition'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'actual_edition_amount'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'isbn'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'title'                  => array(Zend_Filter_Input::ALLOW_EMPTY => false),
    	'genre_id'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'format_id'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'range'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'cover_abstract'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
    	'comment'                  => array(Zend_Filter_Input::ALLOW_EMPTY => true),
	 	'jpegphoto'             => array(Zend_Filter_Input::ALLOW_EMPTY => true)
	);
	protected $_dateFields = array(
	// modlog
	);
	public function setFromArray(array $_data)
	{
		if(empty($_data['publish_date']) || $_data['publish_date']==""){
			unset($_data['publish_date']);
		}
		if(empty($_data['actual_edition']) || $_data['actual_edition']==""){
			unset($_data['actual_edition']);
		}
		if(empty($_data['actual_edition_amount']) || $_data['actual_edition_amount']==""){
			unset($_data['actual_edition_amount']);
		}
		if(empty($_data['lector_contact_id']) || $_data['lector_contact_id']=="" || $_data['lector_contact_id']==0){
			unset($_data['lector_contact_id']);
		}
		parent::setFromArray($_data);
	}

	protected function _setFromJson(array &$_data)
	{
		if(empty($_data['publish_date']) || $_data['publish_date']==""){
			unset($_data['publish_date']);
		}

		if(empty($_data['actual_edition']) || $_data['actual_edition']==""){
			unset($_data['actual_edition']);
		}
		if(empty($_data['actual_edition_amount']) || $_data['actual_edition_amount']==""){
			unset($_data['actual_edition_amount']);
		}
		if(empty($_data['lector_contact_id']) || $_data['lector_contact_id']=="" || $_data['lector_contact_id']==0){
			unset($_data['lector_contact_id']);
		}
		if (isset($_data['jpegphoto'])) {
			if ($_data['jpegphoto'] != '') {
				$imageParams = Tinebase_ImageHelper::parseImageLink($_data['jpegphoto']);
				if ($imageParams['isNewImage']) {
					try {
						$_data['jpegphoto'] = Tinebase_ImageHelper::getImageData($imageParams);
					} catch(Tinebase_Exception_UnexpectedValue $teuv) {
						Tinebase_Core::getLogger()->warn(__METHOD__ . '::' . __LINE__ . ' Could not add contact image: ' . $teuv->getMessage());
						unset($_data['jpegphoto']);
					}
				} else {
					unset($_data['jpegphoto']);
				}
			}
		}
	}
}