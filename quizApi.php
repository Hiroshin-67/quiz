<?php
header('Access-Control-Allow-Origin:*');
header('Content-type: application/json');

try{
  $ini = parse_ini_file('../../DB/quizdb.ini');
  $dsn = "mysql:charset=utf8;dbname=".$ini["dbname"].";host=localhost";
    
  $dbusr = $ini["dbusr"];
  $dbpass = $ini["dbpass"];

  // dbに接続
  $db = new PDO($dsn, $dbusr, $dbpass);
  $sql = $db -> prepare("SELECT * FROM selectQuiz;");
  $sql->execute();

}catch(PODException $e){
  die('エラーメッセージ：'.$e->getMessage());
}

$quizData = array();
  while($quiz = $sql->fetch(PDO::FETCH_ASSOC)){
    $quizData[] = array(
      'id'=>$quiz['id'],
      'question'=> $quiz['question'],
      'choices'=>array(
        'A'=> $quiz['choiceA'],
        'B'=>$quiz['choiceB'],
        'C'=>$quiz['choiceC'],
        'D'=>$quiz['choiceD'],
      ),
      'ans'=>$quiz['answer']
    );
  }


echo json_encode($quizData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

?>
