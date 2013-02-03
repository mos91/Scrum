<?php
class TopPanel extends CTabView {
	public function init(){
		
	}
	
	public function run(){
		$this->renderHeader();
	}
	
	public function renderHeader(){
		echo "<ul class=\"nav\">\n";
		foreach($this->tabs as $id=>$tab)
		{
			$title=isset($tab['title'])?$tab['title']:'undefined';
			$active=$id===$this->activeTab?' class="active"' : '';
			$url=isset($tab['url'])?$tab['url']:"#{$id}";
			echo "<li{$active}><a href=\"{$url}\">{$title}</a></li>\n";
		}
		echo "</ul>\n";
	}
} 