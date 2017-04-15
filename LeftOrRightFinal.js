var Greetings = ['Hello, friend!', 'Howdy, partner!', 'Salutations!', 'Hi!', 'Yahallo!', 'Hey!', 'Greetings!', "KAME HAME HAAAI", 'DIE JEDI DOG'];
var Farewells = ['Farewell, ', 'Goodbye, ', 'Sayonara, ', 'See you later, ','Ciao, '];
var google = ['<https://www.google.com/voice/>', '<https://www.google.com/voice/>', 'YOUR ACCOUNT', 
'HELP CENTER', '<https://support.google.com/voice#topic=1707989>', 'HELP FORUM', 
'<https://productforums.google.com/forum/#!forum/voice>', 'To edit your email preferences for text messages,', 
' go to the Email notification settings <https://www.google.com/voice/#voicemailsettings> in your account.',
'To respond to this text message, reply to this email or visit Google Voice.', 'Google Inc.', '1600 Amphitheatre Pkwy', 
'Mountain View CA 94043 USA']; 

function respond(){
  var sheet = SpreadsheetApp.open(DriveApp.getFilesByName("Conversations").next()).getActiveSheet();

  //all text messages to the chat bot will have this in their subject line
  var threads = GmailApp.search("subject:'New text message from ' is:unread in:inbox");
  for(var i = 0; i < threads.length; i++){
  //load the spreadsheet
   
    //load basic variables
    var messages = threads[i].getMessages();
    var message = messages[messages.length-1];//the most recent message
    var str = parseMessage(message.getPlainBody());//
    var command = parseMessage(message.getPlainBody()).toLowerCase()//.toLowerCase() removes case sensitivity
    var range = getHashCell(sheet,parseNum(message.getSubject()),1000,4); //find where the variables are stored
    
    //load sheet storyArcs
    var storyc = range.offset(0,1);
    var namec = range.offset(0,2);

    //Game Response
    var storyArc = range.offset(0,1).getA1Notation();
    if(command.match('storyc')) {
      message.reply(storyc.getValue());
    }
    
    else if(command.match('reset')) {
      message.reply('Game has been reset');
      storyc.setValue(0);
    }
    
    else {
      handleStoryArc(storyc, message, command, storyArc);
    }
    
    threads[i].markRead();
  }
}

function handleStoryArc(storyc, message, command, storyArc){
  if(storyc.getValue() == 0){
    startingArc(message, command, storyArc);
  }
  else if(storyc.getValue() == 1){
    bedroomArc(message, command, storyArc);
  }
  else if(storyc.getValue() == 2){
    paintingArc(message, command, storyArc);
  }
  else if (storyc.getValue() == 3){
    kitchenArc(message, command, storyArc);
  }
  else if (storyc.getValue() == 4){
    diningRoomArc(message,command, storyArc);
  }
  else if (storyc.getValue() == 5){
    livingRoomArc(message,command, storyArc);
  }
}

function startingArc(message, command, storyArc){
  if(command.match("start")) {
    message.reply('Commands: Use, Describe, Look, Explain');
    message.reply("I am in a bedroom. There is a bed to one side, and a desk in the corner."); 
    message.reply("There is an open window on one wall and a door on the other.");
    var sheet = SpreadsheetApp.open(DriveApp.getFilesByName("Conversations").next()).getActiveSheet();
    sheet.getRange(storyArc).setValue(1);
    }
  
  else if(command.match("command")) {
    message.reply('Commands: LOOK, WALK, GO, PICK UP, EXPLAIN, DESCRIBE');
  }
  
  else {
    message.reply("Errr, sorry don't understand.");
  }    
}

function bedroomArc(message, command, storyArc){
    if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('bed')){
        message.reply('it is an unmade bed');
    }
    else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('desk')){
        message.reply('it is a desk with papers all over');
    }
            
    else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('window')){
        message.reply('it is an open window. i can look outside. it looks nice outside, i should go outside');
    }
    else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('door')){
        message.reply('it is a closed door. it is unlocked, so i should use it');
    }
    else if(command.match('use') && command.match('door')) {
        message.reply('i open the door and step into the hallway');
        message.reply('i am standing at the end of a hallway.');
        message.reply('there is a painting on one wall and a door at the end of the hallway');
        var sheet = SpreadsheetApp.open(DriveApp.getFilesByName("Conversations").next()).getActiveSheet();
        sheet.getRange(storyArc).setValue(2);
     }      
     else{ 
      message.reply("Uhm..Could you say something else? I don't quite understand.");
     }
}

function paintingArc(message, command, storyArc){
     if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('painting')){
         message.reply('it is a painting of a forest. it looks nice, and makes me want to go outside');
     }    
     else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('door')){
         message.reply('it is a closed door. it is unlocked, so i should use it');
     }
     else if(command.match('use') && command.match('door')) {
         message.reply('i open the door and step into the kitchen');
         message.reply('i am standing in a kitchen. it is clean and tidy.');
         message.reply('there is a fridge in one corner and a stove in the other corner and the door right by it');
         var sheet = SpreadsheetApp.open(DriveApp.getFilesByName("Conversations").next()).getActiveSheet();
         sheet.getRange(storyArc).setValue(3);
     }
     else {
          message.reply("Uhm..Could you say something else? I don't quite understand.");
     }
}

function kitchenArc(message, command, storyArc){
     if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('fridge')){
         message.reply('it is a fridge. it is cold to the touch');
     }
     else if(command.match('use') && command.match('fridge')){
         message.reply('the fridge is full of food. i should make something once i come back inside');
     }
          
     else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('stove')){
         message.reply('it is a stove. it is ');
     }
          
     else if(command.match('use') && command.match('fridge')){
         message.reply("i shouldn't turn the stove on. i might forget to turn it off later");
     }
          
     else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('door')){
         message.reply('it is a closed door. it is unlocked, so i should use it');
     }
          
     else if(command.match('use') && command.match('door')) {
         message.reply('i open the door and step into the dining room. There is a table and a door');
         var sheet = SpreadsheetApp.open(DriveApp.getFilesByName("Conversations").next()).getActiveSheet();
         sheet.getRange(storyArc).setValue(4);
     }
     else {
         message.reply("Uhm..Could you say something else? I don't quite understand.");
      }
}

function diningRoomArc(message, command, storyArc){
      if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('table')){
          message.reply('it is a wooden dining room table. there is food on it and it smells delicious');
      }
          
      else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('food')){
          message.reply('there is a plate of sandwiches that look delicious');
      }
          
      else if(command.match('use') && command.match('food')){
          message.reply("i shouldn't eat these sandwiches just yet. i'll save them for when i come back from outside");
      }
          
      else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('door')){
          message.reply('it is a closed door. it is unlocked, so i should use it');
       }
          
       else if(command.match('use') && command.match('door')) {
          message.reply('i open the door and step into the living room. There is a couch, TV, door');
          var sheet = SpreadsheetApp.open(DriveApp.getFilesByName("Conversations").next()).getActiveSheet();
          sheet.getRange(storyArc).setValue(5);
       }
       else {
          message.reply("Uhm..Could you say something else? I don't quite understand.");
       }
}

function livingRoomArc(message, command, storyArc){
      if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('couch')){
          message.reply('it is a soft couch');
      }
          
      else if(command.match('use') && command.match('couch')){
          message.reply('i sit down in the couch. it is comfortable, but i should really go outside first');
      }
          
      else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('tv')){
          message.reply('it is an old TV. it is off, and the screen is black');
      }
          
      else if(command.match('use') && command.match('couch')){
          message.reply('i turn on the TV and a talk show comes on.');
          message.reply("i shouldn't watch TV now, though");
      }
          
      else if((command.match('look') || command.match('explain') || command.match('describe')) && command.match('door')){
          message.reply('it is a closed door. it is unlocked, so i should use it');
      }
          
      else if(command.match('use') && command.match('door')) {
          message.reply('i open the door and step outside.');
          message.reply('the sun is warm and it feels amazing');
          message.reply('Game End. type "reset" to start over.')
          var sheet = SpreadsheetApp.open(DriveApp.getFilesByName("Conversations").next()).getActiveSheet();
          sheet.getRange(storyArc).setValue(6);
      }
      else {
          message.reply("Uhm..Could you say something else? I don't quite understand.");
      }
}

function parseNum(text){
  //returns the phone number as a str of an int
  text = text.replace("New text message from (","");
  text = text.replace(") ","");
  text = text.replace("-","");
  return parseInt(text);
}

function rand(min, max) {
  return Math.floor((Math.random() * max) + min)
}

function getHashCell(sheet, num, rows, offset){
  var r = (num % rows) + 1;
  var c = 1;
  while(true){
    var range = sheet.getRange(r,c);
    if(range.isBlank()){
      //if not found, add the number
      range.setValue(num);
      range.offset(0,1).setValue(0);
      return range;
    }
    else if(range.getValue() == num){
      //if the number is found, advance the column
      return range;
    }
    c += offset;
  }
}

function parseMessage(string) {
  list = string.split();
  string = list.join();
  for(var k in google) {
    string = string.replace(google[k], '');
    string = string.replace(/\s+/g, ' ');
  }
  string = string.replace(/\s/g, ' ').trim();
  return string;
}