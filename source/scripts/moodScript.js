//==============
// State Variables
let getDot = 0;
var motValidation = false;
var strValidation = false;
var moodClickedValidation = false;
var weeklyMood = [0,0,0,0,0];
var getMoodLevel;
var getMotLevel;
var getStrLevel;
var motivation = [];
var stress = [];
var days;
//===============

//==================
//Load Google Charts 
google.charts.load("current", {packages:["corechart"]});
google.charts.load("current", {packages:["bar"]});
google.charts.setOnLoadCallback(drawMoodChart);
google.charts.setOnLoadCallback(drawStressChart);
google.charts.setOnLoadCallback(drawMotivationChart);
//===================

/**
 * Validates a button has been pressed
 * Makes clicked emoji bigger and resets others to normal scale.
 * Presents correct feeling paragraph underneath.
 * Checks for form completion
 * @param {string} e 
 * @param {string} id 
 */
function moodClicked(e,id){
    moodClickedValidation = true;
 
    showMood = document.getElementById('mood-choice');

    //Reset the scale back to 1
    for(let i = 1; i <= 5; i++){
         document.getElementById("mood"+i).style.transform = "scale(1)";
    } 
    document.getElementById(id).style.transform = "scale(1.4)"; 
    document.getElementById(id).style.textShadow = "10px 10px #ff0000";

    showMood.textContent = "You feel " + e +"." 
    showMood.style.display = 'block';    
    btnDisplay();
}
/**
 * Gets mood selection 
 * @param {Integer} e 
 */
function getMood(e){
    getMoodLevel = e;
}
/**
 * Checks button validations
 * if all true -> submit button will display
 */
function btnDisplay(){
    let btnToggle = document.getElementById('moodBtn');
    if(strValidation && motValidation && moodClickedValidation)
        btnToggle.style.display = 'block';
}
/**
 * Passes a number through to display the background on the respective clicked number
 * clears recently clicked colors
 * @param {Integer} e 
 */
function dotColorOnCLickMot(e) {
    for(let I = 1; I <= 5; I++)
        document.getElementById("motdot"+I).style.background = "#FFFFFF"; 
    document.getElementById("motdot"+e).style.background = "#18a89c";  
    getMotLevel = e;
    motValidation = true;
    btnDisplay();
} 
/**
 * Passes a number through to display the background on the respective clicked number
 * clears recently clicked colors
 * @param {Integer} e 
 */
function dotColorOnCLickStr(e) {
    for(let I = 1; I <= 5; I++)
        document.getElementById("strdot"+I).style.background = "#FFFFFF";
    document.getElementById("strdot"+e).style.background = "#18a89c";  
    getStrLevel = e;
    strValidation = true;

    btnDisplay();
} 
/**
 * Store Mood-Tracker data to local storage
 * Uses today's date + record number to store each object
 * If all 3 records are stored, no additional records will be stored for this day
 */
function storeData(){
    let storeDate = new Date();
    let month = storeDate.getMonth()+1;
    let day = storeDate.getDate();
    let year = storeDate.getFullYear();
    
    let fullDate1 = month + '/' + day + '/' + year + '/' + 1;
    let fullDate2 = month + '/' + day + '/' + year + '/' + 2;
    let fullDate3 = month + '/' + day + '/' + year + '/' + 3;

    let moodObject = { 'mood': getMoodLevel,  'anxiety': getMotLevel, 'stress': getStrLevel };
    
    if (localStorage.getItem(fullDate1) === null) {
        window.localStorage.setItem(fullDate1, JSON.stringify(moodObject));
    } else if(localStorage.getItem(fullDate1) !== null && localStorage.getItem(fullDate2) === null) {
        window.localStorage.setItem(fullDate2, JSON.stringify(moodObject));
    } else if(localStorage.getItem(fullDate1) !== null && localStorage.getItem(fullDate2) !== null && localStorage.getItem(fullDate3) === null) {
        window.localStorage.setItem(fullDate3, JSON.stringify(moodObject));
    }
}

for(let I=0; I <= 6; I++) {
    var newDate = new Date();
    newDate.setDate(newDate.getDate()-I);

    for(let I=1; I <= 3; I++) {
        var record = newDate.toLocaleDateString() + '/' + I;
        var retrievedObject = JSON.parse(localStorage.getItem(record));

        if(retrievedObject !== null) {
            if(retrievedObject.mood == 1) {
                weeklyMood[0]++;
            }
            else if(retrievedObject.mood == 2) {
                weeklyMood[1]++;
            }
            else if(retrievedObject.mood == 3) {
                weeklyMood[2]++;
            }
            else if(retrievedObject.mood == 4) {
                weeklyMood[3]++;
            }
            else if(retrievedObject.mood == 5) {
                weeklyMood[4]++;
            }

            stress.push(retrievedObject.stress);
            motivation.push(retrievedObject.anxiety);

        } else if(retrievedObject === null) {
            stress.push(0);
            motivation.push(0);
        }
        
    }
}

var date = new Date();
var todayDay = date.getDay();

if(todayDay == 0) {
    days = ['Mon','Tu','Wed','Thu','Fri','Sat','Sun'];
} else if(todayDay == 1) {
    days = ['Tu','Wed','Thu','Fri','Sat','Sun', 'Mon'];
} else if(todayDay == 2) {
    days = ['Wed','Thu','Fri','Sat','Sun', 'Mon', 'Tu'];
} else if(todayDay == 3) {
    days = ['Thu','Fri','Sat','Sun', 'Mon', 'Tu', 'Wed'];
} else if(todayDay == 4) {
    days = ['Fri','Sat','Sun', 'Mon', 'Tu', 'Wed', 'Thu'];
} else if(todayDay == 5) {
    days = ['Sat','Sun', 'Mon', 'Tu', 'Wed', 'Thu', 'Fri'];
} else if(todayDay == 6) {
    days = ['Sun', 'Mon', 'Tu', 'Wed', 'Thu', 'Fri', 'Sat'];
}

/**
   * Draw pie chart to track weekly mood
   */
function drawMoodChart() {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Great', weeklyMood[0]],
      ['Good', weeklyMood[1]],
      ['Ok', weeklyMood[2]],
      ['Bad', weeklyMood[3]],
      ['Awful', weeklyMood[4]]
    ]);

    var options = {
      legend: { position: 'bottom'},
      width: 230,
      height: 300,
      title: 'Weekly Mood',
      titleTextStyle: {
          bold: false,
      },
      colors: ['#f4a342', '#d3a06c', '#af8b6d', '#8b8d98', '#6185ba'],
      is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('moodChart'));
    chart.draw(data, options);
  }


  /**
   * Draw bar chart for weekly stress level
   */
  function drawStressChart() {
    var data = google.visualization.arrayToDataTable([
      ['Days', 'Entry 1', 'Entry 2', 'Entry 3'],
      [days[0], stress[18], stress[19], stress[20]],
      [days[1], stress[15], stress[16], stress[17]],
      [days[2], stress[12], stress[13], stress[14]],
      [days[3], stress[9], stress[10], stress[11]],
      [days[4], stress[6], stress[7], stress[8]],
      [days[5], stress[3], stress[4], stress[5]],
      [days[6], stress[0], stress[1], stress[2]]
    ]);

    var options = {
      width: 200,
      height: 200,
      vAxis: {
        viewWindow: {
          min: 0
        }
      },
      colors: ['#f3b49f', '#ec8f6e', '#e6693e'],
      chart: {
        title: 'Weekly Stress Level'
      }
    };

    var chart = new google.charts.Bar(document.getElementById('stressChart'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

  /**
   * Draw bar chart for weekly motivation
   */
  function drawMotivationChart() {
    var data = google.visualization.arrayToDataTable([
      ['Days', 'Entry 1', 'Entry 2', 'Entry 3'],
      [days[0], motivation[18], motivation[19], motivation[20]],
      [days[1], motivation[15], motivation[16], motivation[17]],
      [days[2], motivation[12], motivation[13], motivation[14]],
      [days[3], motivation[9], motivation[10], motivation[11]],
      [days[4], motivation[6], motivation[7], motivation[8]],
      [days[5], motivation[3], motivation[4], motivation[5]],
      [days[6], motivation[0], motivation[1], motivation[2]]
    ]);

    var options = {
      width: 100,
      height: 100,
      vAxis: {
        viewWindow: {
          min: 0
        }
      },
      colors: ['#a05998', '#c47cbb', '#e7b0e0'],
      chart: {
        title: 'Weekly Motivation Level'
      }
    };

    var chart = new google.charts.Bar(document.getElementById('motivationChart'));

    chart.draw(data, google.charts.Bar.convertOptions(options));
  }
