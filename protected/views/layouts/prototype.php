<?php
$baseUrl = Yii::app()->request->baseUrl;
$bootstrapBase = $baseUrl.'/assets/bootstrap';
$pageTitle = $projectName = CHtml::encode($this->pageTitle);
$startDate  = '2013';
$endDate = '2013';
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
  <style>
  	body {
  		padding-top: 60px;
  	}
  </style>
  <?php if (isset($this->clips['styles'])) echo $this->clips['styles'];?>
  <script src="http://code.jquery.com/jquery-latest.js"></script>
  <script src="<?php echo $bootstrapBase?>/js/bootstrap.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function(){
      $('.nav a').click(function(){
        $.load('index.php/' + $(this).attr('href'), function(responseText){
          $('.container').prepend(responseText);
        });
      })
    });
  </script>
  <?php if (isset($this->clips['script'])) echo $this->clips['script'];?>
  <title><?php echo $pageTitle; ?></title>
</head>

<body>
<div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#"><?php echo $projectName ?></a>
          <div class="nav-collapse collapse">
            <?php echo $this->widget('TopPanel', array(
					'tabs' => array
					(
						'main' => array('title' => 'Main', 'url' => 'site/index'),
						'you' => array('title' => 'You', 'url' => 'users/me'),
						'team' => array('title' => 'Team', 'url' => 'users/team'), 
						'contacts' => array('title' => 'Contacts', 'url' => 'site/contacts')
					)
				));?>
            <form class="navbar-form pull-right">
              <input class="span2" type="text" placeholder="Email">
              <input class="span2" type="password" placeholder="password">
              <button type="submit" class="btn">Sign-in</button>
            </form>
          </div><!--/.nav-collapse -->
        </div>
      </div>
</div>


<div class="container">
  <?php echo $content ?>
<hr/>
<footer>
  	<p>&copy; Scrum project, <?php echo $endDate?></p>
</footer>
</div>

</body>
</html>
