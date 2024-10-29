<h1> Loops </h1>

<?php
$i = 1;
while ($i < 6) {
    echo '<label>' . $i . '</label><br>';
    $i++;

}

echo '<br/>';

$a = 1;
do {
    echo '<label>' . $a . '</label><br>';
    $a++;
}
while ($a < 6);

echo '<br/>';
$colors = array("red", "green", "blue", "yellow");

foreach ($colors as $color) {
    echo '<label>' . $color . '</label><br>';
}



?>