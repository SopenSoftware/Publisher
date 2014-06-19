<?php 
class Publisher_Model_BookFilter extends Tinebase_Model_Filter_FilterGroup implements Tinebase_Model_Filter_AclFilter
{
    /**
     * @var string application of this filter group
     */
    protected $_applicationName = 'Publisher';
    
    protected $_className = 'Publisher_Model_BookFilter';
    
    /**
     * @var array filter model fieldName => definition
     */
    protected $_filterModel = array(
    	'id'          => array('filter' => 'Tinebase_Model_Filter_Id'),
    	'title' => array('filter' => 'Tinebase_Model_Filter_Text'),
    	'comment' => array('filter' => 'Tinebase_Model_Filter_Text'),
    	'cover_abstract' => array('filter' => 'Tinebase_Model_Filter_Text'),
    	'isbn' => array('filter' => 'Tinebase_Model_Filter_Text'),
    	'pseudonym' => array('filter' => 'Tinebase_Model_Filter_Text'),
    	'author_contact_id' => array('filter' => 'Tinebase_Model_Filter_ForeignId', 
            'options' => array(
                'filtergroup'       => 'Addressbook_Model_ContactFilter', 
                'controller'        => 'Addressbook_Controller_Contact'
            )
        ),
       'query' 		=> array('filter' => 'Publisher_Model_BookQueryFilter'),
    );
}
?>