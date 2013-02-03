<?php
class BootstrapGridView extends CWidget {
	const MAX_ITEMS_PER_LAYOUT_ROW = 4;
	public $columns;
	public $rows;
	private $layoutRowCount;
	private $rowCount;
	
	public function init(){
		if (($this->rowCount = count($this->rows)) % self::MAX_ITEMS_PER_LAYOUT_ROW !== 0)
			$this->layoutRowCount = ceil($this->rowCount / self::MAX_ITEMS_PER_LAYOUT_ROW);
		else
			$this->layoutRowCount = floor($this->rowCount / self::MAX_ITEMS_PER_LAYOUT_ROW);
	}
	
	public function run(){
		$itemCount = 0;$j = 0;
		for ($i = 0;$i < $this->layoutRowCount;$i++, $itemCount = 0){
			echo '<div class="row-fluid"><ul class="thumbnails">';
			for(;$itemCount < self::MAX_ITEMS_PER_LAYOUT_ROW && $j < $this->rowCount;$j++,$itemCount++){
				$row = $this->rows[$j];
				echo '<li class="span3"><div class="thumbnail">'.
					 '<img src="/images/avatar_male/avatar_128.png"/>'.
						'<div class="caption">'.
                    	'<h3>Thumbnail label</h3>'.
                    	'<p>Cras justo odio, dapibus ac facilisis in, egestas eget quam.'.
                    			 'Donec id elit non mi porta gravida at eget metus. Nullam'.
                    			 'id dolor id nibh ultricies vehicula ut id elit.</p>'.
                    	'<p><a href="#" class="btn btn-primary">Action</a> <a href="#" class="btn">Action</a></p></div>'.
					'</li>';	
			}
			echo '</ul></div>';
		}
	}
}