#!/usr/bin/env node
const fs = require('fs');
const program = require('commander');

program
  .version('1.0.0')
  .usage('-f <file>')
  .option('-f, --file [file]', "the cookies file")
  .version('1.0.0', '-v, --version')

program.on('--help', function(){
  console.log('');
  console.log('Examples:');
  console.log('  $ cookies2json -f cookies.txt');
});

program.parse(process.argv);

if (!program.file) {
  program.outputHelp();
  process.exit(1);
}

const file = fs.readFileSync(program.file, {encoding: 'utf-8'});

function run(str) {
  var arrayOfLines = str.split("\n"); 
  console.log(arrayOfLines);
  var i = 0;
  var arrObjects = [];
  for (i=0; i<arrayOfLines.length; i++){
    var kuka = arrayOfLines[i].split("\t"); 
    var cook = new Object();	
    cook.domain = kuka[0];
    cook.expirationDate = parseInt(kuka[4]);

    if (kuka[1] == "FALSE") cook.httpOnly = false;  
    if (kuka[1] == "TRUE") cook.httpOnly = true;  

    cook.name = kuka[5];
    cook.path = kuka[2];

    if (kuka[3] == "FALSE") cook.secure = false;  
    if (kuka[3] == "TRUE") cook.secure = true; 


    cook.value = kuka[6];  


    if (cook.domain !== '') {
      arrObjects[i] = cook;		
    }
  }

  return JSON.stringify(arrObjects, null, 2);
}

// run(file)

console.log(run(file));




