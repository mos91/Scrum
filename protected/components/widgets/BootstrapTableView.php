<?php
class BootstrapTableView extends CWidget {
	public $columns;
	public $rows;
	
	public function init(){
		
	}
	
	public function run(){
		echo '<table class="table table-striped table-hover"><thead><tr>';
		foreach ($this->columns as $column) echo '<th>'.$column.'</th>';
		echo '</tr></thead><tbody>';
		foreach($this->rows as $row) {
			echo '<tr>';
			foreach($row as $cell){
				echo '<td>'.$cell.'</td>';
			}	
			echo '</tr>';
		}
		echo '</tbody></table>';
	}
}