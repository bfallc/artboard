<?php
// PUT data comes in on the stdin stream
//$putdata = fopen("php://input", "r");
//fclose($putdata);// Get the data from the arduiono http post
$putdata = file_get_contents("php://input");

//---------------

//start new domDoc
$document=new domDocument('1.0', 'UTF-8');

//load the html page
$document->loadHTMLFile("index.html");
//not sure of this line
$document->formatOutput=true;

//from the doc, get the tag named "header"
// -> item( 0) specifies which tag, zero is first
//$parent = $document->getElementsByTagName('header')->item( 2);

//get the tag by css id instead
$parent = $document->getElementById('content2');

// Remove the child element from the tag  
$parent->removeChild($parent->firstChild);

//change the put data into DOMtext data
$newText = new DOMText($putdata);
//add the text as the child of the tag
$parent->appendChild($newText);

//These statements get returned to the arduino 
//as part of the http response
echo "Recorded bytes: ".$document->saveHTMLFile('index.html')."\r\n";
echo $putdata;?> 