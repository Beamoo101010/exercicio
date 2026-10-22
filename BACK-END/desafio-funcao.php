<?
$produto = [
    "nome" => "Hamburguer",
    "preço" => 25,
];

$quantidade = 3

    echo "======== PEDIDO ========\n";

      function MostrarPedido($item,$quantidade){
        echo  "Nome: " . $item["nome"] . "\n";
        echo  "Preço: R$  " . number_format($item["preço"],2,) . "\n";
        echo  "Quantidade:$quantidade\n\n";
      }    

function CalcularSubtotal($item,$quantidade){
    return $preço("preço") * $quantidade;
}

function CalcularDesconto($valor,$porcentagem){
    return $valor * ($porcentagem / 100);
}
    

$subtotal = CalcularSubtotal(25,3){
    echo $subtotal;
}    
$desconto = CalcularDesconto(75,10){
    echo $desconto;
}
?>