<?php
class BootstrapTabView extends CTabView {
	public $brand;
	public $left;
	public $right;
	
	public function run(){
		$this->renderHeader();
	}
	
	public function renderBrand(){
		if (isset($this->brand['content'])){
			echo '<ul class="nav"><li class="dropdown"><a class="brand dropdown-toggle" data-toggle="dropdown" href="'.$this->brand['url'].'">'.
					$this->brand['title'].'<b class="caret"></b></a>';
			echo '<ul class="dropdown-menu">';
			foreach($this->brand['content'] as $id => $item){
				echo '<li><a href="'.$item['url'].'">'.$item['title'].'</a></li>';
			}
			echo '</ul></li></ul>';
		}
		else {
			$icon = isset($this->brand['icon'])? '<i class="brand-icon '.$this->brand['icon'].' icon-white"></i>' : '';
			echo '<a class="brand" href="'.$this->brand['url'].'">'.$this->brand['title'].' '.$icon.'</a>';
		}
	}
	
	public function renderTabItem($id, $tab){
		$title = isset($tab['title'])?$tab['title']:'undefined';
		$active = $id===$this->activeTab? 'active' : '';
		$url = isset($tab['url'])?$tab['url']:"#{$id}";
		$icon = isset($tab['icon'])? '<i class="'.$tab['icon'].' icon-white"></i>' : '';
		
		if (isset($tab['content'])){
			echo "<li class=\"dropdown {$active}\">".
				"<a href=\"".$url."\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">".$title."<b class=\"caret\"></b></a>".
				"<ul class=\"dropdown-menu\">";
			foreach($tab['content'] as $id => $item){
				echo '<li><a href="'.$item['url'].'">'.$item['title'].'</a></li>';
			}
			echo "</ul></li>"; 	
		}
		else {
			echo "<li class=\"{$active}\"><a href=\"{$url}\">{$icon} {$title}</a></li>\n";
		}
	}
	
	public function renderHeader(){
		echo '<div class="navbar navbar-inverse navbar-fixed-top">';
		echo '<div class="navbar-inner">';
		echo '<div class="container">';
		echo '<div class="nav-collapse collapse">';
		$this->renderBrand();
		echo "<ul id=".$this->id." class=\"nav\">\n";
		foreach($this->left as $id => $tab){
			$this->renderTabItem($id, $tab);
			echo '<li class="divider-vertical"></li>';
		}
		
		echo "</ul>\n";
		echo '<ul class="nav pull-right">';
		foreach($this->right as $id => $tab){
			$this->renderTabItem($id, $tab);
			echo '<li class="divider-vertical"></li>';
		}
		echo "</ul>";
		echo "</div></div></div></div>";
	}
	
	protected function renderBody(){
		return false;
	}
	
	public function registerClientScript(){
		return false;
	} 
} 