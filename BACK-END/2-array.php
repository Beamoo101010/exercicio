<?

$produtos = [
    "canela",
    "porco",
    "bigode",
    "sandalha",
    "musica",

];

$preços = [10,20,30,40,50];

    for ($i = 0; $i < count($produtos); $i++){
        echo $produtos[$i] . " R$ " . $preços[$i] . "\n";
    }
?>