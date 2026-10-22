<?
$contador = 1;
$cardapio = [
    [
    "nome" => "Tilapia",
    "preço" => 30,
    "categoria" => "Comida",
],
[
    "nome" => "Alcool 70",
    "preço" => 20,
    "categoria" => "Bebida",
],
[
    "nome" => "Bolinho",
    "preço" => 10,
    "categoria" => "Lanche",
],
];



        echo "======== CARDAPIO ========\n\n";
        foreach ($cardapio as $item){
        echo $contador . " - " .  $item["nome"] . "\n";
        echo  "    Categoria: " . $item["categoria"] . "\n";
        echo  "    Preço: R$  " . number_format($item["preço"],2) . "\n\n";
        $contador++;
        }


?>