<?php
$baseUrl = Yii::app()->request->baseUrl;
$bootstrapBase = $baseUrl.'/assets/bootstrap';
$backboneBase = $baseUrl.'/assets/backbone';

$pageTitle = CHtml::encode($this->pageTitle);
$startDate  = '2013';
$endDate = '2013';
$projectName = Yii::app()->name.' project'; 

?>

<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="language" content="en" />
  <!-- bootstrap CSS framework -->
   <link href="<?php echo $bootstrapBase?>/css/bootstrap.min.css" rel="stylesheet" media="screen">
  <!-- for print -->
  <!-- <link href="<?php echo $baseUrl?>css/print.css" rel="stylesheet" media="print"> -->
  <!-- for mobile -->
  <!-- <link href="<?php echo $baseUrl?>css/print.css" rel="stylesheet" media="handheld">-->
  <!--[if lt IE 8]>
  <link rel="stylesheet" type="text/css" href="<?php $baseUrl; ?>/css/ie.css" media="screen, projection" />
  <![endif]-->
  <link href="/css/main.css" rel="stylesheet" >
  <?php if (isset($this->clips['styles'])) echo $this->clips['styles'];?>
  <!-- libs -->
  <script src="/assets/jquery/jquery-1.9.1.min.js"></script>
  <script src="<?php echo $bootstrapBase?>/js/bootstrap.min.js"></script>
  <script src="<?php echo $backboneBase?>/underscore.js"></script>
  <script src="<?php echo $backboneBase?>/backbone-dev.1.0.0.js"></script>
  <script src="/assets/backbone-extensions/backboneObject.js"></script>
  <!--<script src="/assets/less/less.js" type="text/javascript"></script>  -->
  <script src="/assets/jquery.cookies.2.2.0.min.js" type="text/javascript"></script>
  <?php if (isset($this->clips['libs'])) echo $this->clips['libs'];?>
  
  <script src="/js/Const.js" type="text/javascript"></script>
  <!-- widgets -->
  <script src="/js/views/Alert.js" type="text/javascript"></script>
  <script src="/js/views/Popup.js" type="text/javascript"></script>
  <?php if (isset($this->clips['widgets'])) echo $this->clips['widgets'];?>
  <!-- models -->
  <?php if (isset($this->clips['models'])) echo $this->clips['models'];?>
  <!-- views -->
  <?php if (isset($this->clips['views'])) echo $this->clips['views'];?>
  <!-- routers -->
  <?php if (isset($this->clips['routers'])) echo $this->clips['routers'];?>
  <!-- behaviours -->
  <script src="/js/behaviours/behaviour.js" type="text/javascript"></script>
  <?php if (isset($this->clips['behaviours'])) echo $this->clips['behaviours'];?>
  
  <script src="/js/application/Application.js" type="text/javascript"></script>
  <script src="/js/application/MVCApplication.js" type="text/javascript"></script>
  <script src="/js/main.js" type="text/javascript"></script>
  <?php if (isset($this->clips['script'])) echo $this->clips['script'];?>
  <script type="text/javascript">
	  $(document).ready(function(){
			app = MVCApplication.getInstance();
			app.start();
	   });
  </script>
  <?php if (isset($this->clips['templates'])) echo $this->clips['templates'];?>
  <title><?php echo $pageTitle; ?></title>
</head>

<body>
	<?php include Yii::getPathOfAlias('application.views.layouts.tabpanel').".php";?>
<div class="<?php echo isset($this->clips['containerCssClass'])? $this->clips['containerCssClass']:'container'?>">
  <?php echo $content ?>
</div>
<div class="<?php echo isset($this->clips['containerCssClass'])? $this->clips['containerCssClass']:'container'?>"><footer>
	<hr/>
  	<p>&copy; <?php echo $projectName?>, <?php echo $endDate?></p>
</footer></div>
</body>
</html>
