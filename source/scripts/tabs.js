function openTab(evt, classname) {
    // Declare all variables
    var i, tabcontent1, tabcontent2, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
      tabcontent1 = document.getElementsByClassName("Calendar");
     tabcontent2 = document.getElementsByClassName("container text-center");
    //for (i = 0; i < tabcontent.length; i++) {
      //tabcontent[i].style.display = "none";
    //}
    //console.log(tabcontent1[0]);
    //console.log(tabcontent2);
    tabcontent1[0].style.visibility = "hidden";
    tabcontent2[0].style.display = "none";
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    if(classname == "Calendar"){
     // console.log(tabcontent1);
      tabcontent1[0].style.visibility = "visible";
      tabcontent1[0].style.display = "block";
      
    }
    else{
    document.getElementById(classname).style.display = "block";
    evt.currentTarget.className += " active";
    }
  }
 // document.getElementById("defaultOpen").click();
