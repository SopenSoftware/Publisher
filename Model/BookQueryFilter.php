<?php
class Publisher_Model_BookQueryFilter extends Tinebase_Model_Filter_Abstract
{
    protected $_operators = array(
        'contains','equals'
    );
    
    public function appendFilterSql($_select, $_backend){
        if($this->_value){
        	$filterData = array(
            	array('field' => 'title',   'operator' => 'contains', 'value' => $this->_value),
            	array('field' => 'comment', 'operator' => 'contains', 'value' => $this->_value),
            	array('field' => 'isbn', 'operator' => 'contains', 'value' => $this->_value),
            	array('field' => 'pseudonym', 'operator' => 'contains', 'value' => $this->_value)
        	);
        	
	    	$filter = new Publisher_Model_BookFilter($filterData, 'OR');
	    	
	    	$contactFilter = new Addressbook_Model_ContactFilter(array(
	            array('field' => 'query',   'operator' => 'contains', 'value' => $this->_value),
	        ));
	        $contactIds = Addressbook_Controller_Contact::getInstance()->search($contactFilter, NULL, FALSE, TRUE);
	        
	        $filter->addFilter(new Tinebase_Model_Filter_Id('author_contact_id', 'in', $contactIds));
	        
	       	Tinebase_Backend_Sql_Filter_FilterGroup::appendFilters($_select, $filter, $_backend);
    	}
    }
}
?>