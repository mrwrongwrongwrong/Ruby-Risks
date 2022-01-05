<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<style>
  table, th, td {
    border: 5px inset #3D348B;
    border-collapse: collapse;
    padding: 10px;
    background-color: #7678ED;
    box-shadow: 0 10px 10px rgba(0,0,0,0.2);
    font-size: 0px;
    line-height: 1;
  }
  .corner {
    background-color: #ECC30B;
  }

  .free_slot {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    visibility: hidden;
    background-color: #7678ED;
  }
  .piece1 {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid white;
    box-shadow: 1px 2px 1px 2px rgba(74, 75, 75, 1);
    background:linear-gradient(rgba(255, 255, 255, 1), rgba(216, 210, 216, 1));
  }
</style>
<div class="container">
    <?php include $base."header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        </ul>
        <?php include $base."leftMenuGame.php"; ?>
    </nav>
    <article>
        <h1 id="gameName">Ruby Risks</h1>
        <h3 id="groupName">By Team RedScarf (Yue Zhou)</h3>
        <h3>Instructions:</h3>
        <div id="gameDesc" class="jumbotron">
          <ol>
            <li>Add players by name. At this step, you can add an AI player by clicking on the AI player button.</li>
            <li>The number of boxes is twice the number of players. The total number of rubies is ten times of the number of players.</li>
            <li>Click on the Start Game on the right top corner.</li>
            <li>When it is your turn, click on a box and ask for a number of rubies.</li>
            <li>If the number that you guess is less than or equal to the actual number, you receive the number of rubies that you guessed. If the number that you guess is larger than the actual number, you get no rubies.</li>
            <li>Play the game until all the boxes are empty. The winner is the player with the largest number of rubies.</li>
          </ol>
        </div>
	<!--<div id="scoreArea", class="jumbotron">-->
	<?php 
	    //include $base."getScore.php";
	    /*
	    * arg1: gameName, should be the same as the dir name 
	    * arg2: if your score is sortable, pass 1 if higher score is better, 0
	    *       if smaller score is better. Otherwise no need to pass variable
	    *       
	    */
	    // TODO: uncomment this in real use
	    // getScore($gameName, $orderFlag);
	?>
	<!--</div>-->
        <h3>Settings</h3>
        <form id="gameSettings" class="well">
        </form>
        <iframe src="games/ruby_game/ruby.html" class="game" width="1200" height="800" hidden></iframe>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">

    newWindowBtn(1400,800,"games/ruby_game/ruby.html", []);
</script>
</body>
</html>
