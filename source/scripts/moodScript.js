//==============
// State Variables
let getDot = 0;
var motValidation = false;
var strValidation = false;
var moodClickedValidation = false;
var getMotLevel;
var getStrLevel;
//===============

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
 * Used for localStorage
 */
function storeData(){
    console.log(getStrLevel + " " + getMotLevel);
}
