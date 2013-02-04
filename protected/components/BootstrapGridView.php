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
                    	'<h3>'.$row[1].'</h3>'.
                    	'<p>'.$row[2].'</p>'.
                    	'<p>'.$row[3].'</p>'.
                    	'<p><a href="#" class="btn btn-primary">Profile</a></p></div>'.
					'</li>';	
			}
			echo '</ul></div>';
		}
	}
}