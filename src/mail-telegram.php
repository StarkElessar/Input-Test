<?php

/* https://api.telegram.org/bot1949041891:AAFbo0s6FibP-1UQqh4WZT-cT-eat31Dtbs/getUpdates,
где, XXXXXXXXXXXXXXXXXXXXXXX - токен вашего бота, полученный ранее */
$token          = "1949041891:AAFbo0s6FibP-1UQqh4WZT-cT-eat31Dtbs";
$chat_id        = "-547856900";

$phone          = $_POST['user_phone'];

$arr = array(
  'Телефон: ' => $phone
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: index.html');
} else {
  echo "Error";
}
?>