let getDot = 0;
var motValidation = false;
var strValidation = false;
var moodClickedValidation = false;
var getMotLevel;
var getStrLevel;


function moodClicked(e){
    moodClickedValidation = true;
    showMood = document.getElementById('mood-choice');
    showMood.textContent = "You picked " + e +"."
    showMood.style.display = 'block';
    btnDisplay();
}

function btnDisplay(){
    let btnToggle = document.getElementById('moodBtn');
    if(strValidation && motValidation && moodClickedValidation)
        btnToggle.style.display = 'block';
}

function dotColorOnCLickMot(e) {
    for(let I = 1; I <= 5; I++)
        document.getElementById("motdot"+I).style.background = "#FFFFFF"; 
    document.getElementById("motdot"+e).style.background = "#18a89c";  
    getMotLevel = e;
    motValidation = true;
    btnDisplay();
} 

function dotColorOnCLickStr(e) {
    for(let I = 1; I <= 5; I++)
        document.getElementById("strdot"+I).style.background = "#FFFFFF";
    document.getElementById("strdot"+e).style.background = "#18a89c";  
    getStrLevel = e;
    strValidation = true;

    btnDisplay();
} 

function storeData(){
    alert(getStrLevel + " " + getMotLevel);
}
