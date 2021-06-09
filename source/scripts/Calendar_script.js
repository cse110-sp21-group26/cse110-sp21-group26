/* initialize the external events */
//import { renderOneTaskItem(oneTask), clearDisplayedTasksItems()} from "./tasksListScript.js" ;
class evento {
    constructor(date, description, time) {
        this.date = date;
        this.description = description;
        this.time = time;
        this.rendered = false;
    }

}
var anoopbox, anoopbox1, anoopbox2, anoopbox3;
var runonce = false;
var onetime = false;
const eventMap = new Map();
//document.addEventListener('DOMContentLoaded', startRender);
window.onbeforeunload =  function (e) {
    window.onunload = function () {
updateLS();
   }
    return undefined;
};


dropdown = document.getElementById("dropbtn");
dropdown.addEventListener("click", function () {
    document.getElementById("myDropdown").classList.toggle("show");
})

function startRender(){
    let mystorage = window.localStorage
    if(mystorage.size == 0){
        console.log("hi");
        return;
        
    }
    console.log("events present");
gatherEvents();
}

function gatherEvents(){
    if(runonce == false){
    var found = false;
mystorage = window.localStorage;
let skeletons = document.getElementsByClassName("fc-content-skeleton");
for(var k = 0; k < mystorage.length;k++){
date = mystorage.key(k);
if(date.includes("-") == false){
    continue;
}
prearry = JSON.parse(mystorage.getItem(date));
var res = [];
for(var i in prearry){
    res.push(prearry[i]);
    //console.log(prearry[i]);
}
/*for(t = 0; t < res.length;t++){
console.log(res[t].date);
}
console.log(res.length);*/
for(n = 0; n < res.length; n++){
for(i = 0; i < skeletons.length;i++){
    table = skeletons[i].firstChild;
    thead = table.firstChild;
    tbod = table.lastChild;
    theadrow= thead.firstChild;
    tbodrows = tbod.children;
    theadcells = theadrow.children;
    for(h = 0 ; h < theadcells.length;h++){
        if(theadcells[h].getAttribute("data-date") === date){
            for(g = 0; g < tbodrows.length;g++){
                tbodcells = tbodrows[g].children;
                if(tbodcells[h].className === "fc-event-container"){
                    continue;
                }
                else {
                    found = true;
                    tbodcells[h].className = "fc-event-container";
                    anchor = document.createElement("A")
                     anchor.className = "fc-day-grid-event fc-event fc-start fc-end  fc-draggable"
                    div1 = document.createElement("DIV");
                    div1.className ="fc-content";
                    span1 = document.createElement("span");
                    span1.className ="fc-time";
                    span1.innerHTML = res[n].time
                    span2 = document.createElement("span");
                    span2.className ="fc-title";
                    span2.innerHTML = res[n].description;
                    div1.appendChild(span1);
                    div1.appendChild(span2);
                    anchor.appendChild(div1);
                    tbodcells[h].appendChild(anchor);
                    break;
                }
            }
            if(found === false){
            newrow = document.createElement("tr");
            for(m = 0; m < 7;m++){
                td = document.createElement("td");
                if(m == h ){
                    td.className = "fc-event-container";
                    anchor = document.createElement("A")
                     anchor.className = "fc-day-grid-event fc-event fc-start fc-end  fc-draggable"
                    div1 = document.createElement("DIV");
                    div1.className ="fc-content";
                    span1 = document.createElement("span");
                    span1.className ="fc-time";
                    span1.innerHTML = res[n].time
                    span2 = document.createElement("span");
                    span2.className ="fc-title";
                    span2.innerHTML = res[n].description;
                    div1.appendChild(span1);
                    div1.appendChild(span2);
                    anchor.appendChild(div1);
                    td.appendChild(anchor);
                }
                newrow.appendChild(td);
            }

            tbod.appendChild(newrow);
            }
        }
    }

}
found = false;
}
}
runonce = true;
    }
}
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
function reverseformat(date){
    let size = date.length;
    let year = date.substring(0, 4);
    let month = date.substring(5,7);
    let day = date.substring(8, size);
    return new String(month +"-"+ day +"-" + year);
}
function populator() {
    let mystorage = window.localStorage;
    anoopbox = document.querySelectorAll("td.fc-day.fc-widget-content");
   
    for (i = 0; i < anoopbox.length; i++) {
        let holder = anoopbox[i].getAttribute("data-date");
        //set1.add(holder);
        if( holder == today() && onetime == false){
        var eventbox =document.getElementById("eventcage");
        var list_present = eventbox.querySelector("#event_list")
        var titlepre = eventbox.querySelector("#daydate");
        titlepre.innerHTML = reverseformat(holder);
        if(mystorage.getItem(holder) != undefined){
            touse = JSON.parse(mystorage.getItem(holder));
            console.log("priorly created");
            evlist = document.createElement("UL");
            evlist.id = "event_list"
            for(k = 0; k <touse.length;k++){
                eve = touse[k].description + " @ " + touse[k].time  ;
                evo = document.createElement("LI");
                evo.innerHTML = eve;
                evlist.appendChild(evo);
            }
            eventbox.appendChild(evlist);
        }
        let tasksListDisplayTag = document.querySelectorAll(".tasks_list_item");
  tasksListDisplayTag.forEach(element => {
    element.remove();
  });
  //delete no task prompt
  let noTaskPrompt = document.querySelectorAll(".task_nofound_prompt");
  if (noTaskPrompt){
    noTaskPrompt.forEach(element => {
      element.remove();
    });
  }

        tasklist = mystorage.getItem("tasksList");
        if(tasklist != null){
            ref_tasklist = JSON.parse(tasklist);
            var arry = [];
            for(var m in ref_tasklist){
                arry.push(ref_tasklist[m]);
            }
            for(b = 0; b < arry.length; b++){
               if(arry[b].date == reverseformat(holder)){
                $.getScript("./scripts/tasksListScript.js",function(){
                    renderOneTaskItem(arry[b]);
                    });
             
               }
            }
        }
        onetime = true;
        }
    anoopbox[i].addEventListener("click", function() {
        var eventbox =document.getElementById("eventcage");
        var mapindic = false;
        var storindic = false;
        var list_present = eventbox.querySelector("#event_list")
        var titlepre = eventbox.querySelector("#daydate");
        //fconsole.log(list_present);
        if(list_present != undefined){
            list_present.remove();
        }
        titlepre.innerHTML = reverseformat(holder);
        //eventbox.firstChild.innerHTML = holder;

        if(eventMap.has(holder)){
            mapindic = true;
            console.log("present in map");
        }
        if(mystorage.getItem(holder) != undefined){
            storindic = true;
            console.log("present in loc storage");
        }
        if(storindic == true && mapindic == true){
            touse = JSON.parse(mystorage.getItem(holder));
            console.log("priorly created");
            evlist = document.createElement("UL");
            evlist.id = "event_list"
            for(k = 0; k <touse.length;k++){
                eve = touse[k].description + " @ " + touse[k].time  ;
                evo = document.createElement("LI");
                evo.innerHTML = eve;
                evlist.appendChild(evo);
            }
            var arrus = eventMap.get(holder);
            for(k = 0; k <arrus.length;k++){
                steve = arrus[k].description + " @ " + arrus[k].time  ;
                stevo = document.createElement("LI");
                stevo.innerHTML = steve;
                evlist.appendChild(stevo);
            }
            eventbox.appendChild(evlist);

        }
        
        else if(mapindic == true && storindic == false){
            console.log("new");
            evlist = document.createElement("UL");
            evlist.id = "event_list"
            var arrus = eventMap.get(holder);
            for(k = 0; k <arrus.length;k++){
                eve = arrus[k].description + " @ " + arrus[k].time  ;
                evo = document.createElement("LI");
                evo.innerHTML = eve;
                evlist.appendChild(evo);
            }
            eventbox.appendChild(evlist);

            

        }
        else if(storindic == true && mapindic == false){
            touse = JSON.parse(mystorage.getItem(holder));
            console.log("priorly created");
            evlist = document.createElement("UL");
            evlist.id = "event_list"
            for(k = 0; k <touse.length;k++){
                eve = touse[k].description + " @ " + touse[k].time  ;
                evo = document.createElement("LI");
                evo.innerHTML = eve;
                evlist.appendChild(evo);
            }
            eventbox.appendChild(evlist);

        }
        let tasksListDisplayTag = document.querySelectorAll(".tasks_list_item");
  tasksListDisplayTag.forEach(element => {
    element.remove();
  });
  //delete no task prompt
  let noTaskPrompt = document.querySelectorAll(".task_nofound_prompt");
  if (noTaskPrompt){
    noTaskPrompt.forEach(element => {
      element.remove();
    });
  }
        tasklist = mystorage.getItem("tasksList");
        if(tasklist != null){
            ref_tasklist = JSON.parse(tasklist);
            var arry = [];
            for(var m in ref_tasklist){
                arry.push(ref_tasklist[m]);
            }
            for(b = 0; b < arry.length; b++){
                console.log(arry[b].date);
                console.log(reverseformat(holder));

               if(arry[b].date == reverseformat(holder)){
                   console.log("has tasks");
                   console.log(arry[b]);
                $.getScript("./scripts/tasksListScript.js",function(){
                    renderOneTaskItem(arry[b]);
                    }); }
                    //console.log("found task");

            }
        }
      }); 
}
//console.log(set1);

}


function updateLS(){
    console.log("hi");
    let mystorage = window.localStorage;
    const iterator_entries = eventMap.entries();
    for(p = 0; p < eventMap.size;p++){
     counter = iterator_entries.next().value;
        if(mystorage.getItem(counter[0]) === null){
            mystorage.setItem(counter[0],JSON.stringify(counter[1]));   
        }
        else {
            var arr = JSON.parse(mystorage.getItem(counter[0]));
            var res = [];
            for(var i in arr){
                res.push(arr[i]);

            }
            var final = res.concat(counter[1]);
            mystorage.setItem(counter[0], JSON.stringify(final));
        }
    }
    console.log(mystorage);
    //mystorage.clear();
}
function checker(){
    let mystorage = window.localStorage;
    console.log("bruh");
    for(k= 0; k<mystorage.length;k++){
        var name = mystorage.key(k);
        var arr = mystorage.getItem(name);
        var str = JSON.parse(arr);
        var res = [];
        for(var i in str){
                res.push(str[i]);
    }
   // console.log(res);
}
}
function deletenewlyadded(){
var todlt = document.querySelector("td.fc-event-container");
var minidlt = todlt.children
for(l = 0; l<  minidlt.length;l++){
    minidlt[l].remove();
}
todlt.removeAttribute("class");
}
function today(){
    let today = new Date();
    let dd = today.getDate();
    let mm =  today.getMonth()+1;
    let yyyy = today.getFullYear();
    var m,d;
    if(mm < 10){
      m = "0"+mm;
    }
    else{
       m = mm;
    }
    if(dd < 10){
      d = "0" + dd;
    }
    else{
      d = dd;
    }
    today = yyyy +'-' + m + '-' + d;
    return today;
}
function eventpopulator() {
anoopbox2 = document.querySelectorAll("div.fc-content-skeleton")
document.createAttribute("position-count");
let mystorage = window.localStorage;

//console.log(anoopbox2);
for (i = 0; i < anoopbox2.length;i++){
    var table = anoopbox2[i].firstChild;
    var tbody = table.lastChild;
    var thead  = table.firstChild;
    var headrow = thead.firstChild;
    var headholders = headrow.children;
    var rows = tbody.children;
    var arrcount = new Array();

    for(k = 0; k < rows.length; k++){
        var tdholders = rows[k].children;
        if(tdholders.length == 7){
        for(h = 0; h < tdholders.length;h++){
            if(tdholders[h].className == "fc-event-container"){
                arrcount.push(h);
                var time = tdholders[h].querySelector(".fc-time").innerHTML;
                var description = tdholders[h].querySelector(".fc-title").innerHTML;
                var date = headholders[h].getAttribute("data-date");
                //console.log(time, description, date);
                if(eventMap[date] == undefined){
                    var eventarr = new Array();
                eventos = new evento(date, description, time);
               

                eventarr.push(eventos);
               // console.log(JSON.stringify(eventarr));
                eventMap.set(date, eventarr);
                }

            }
        }
    }
    else{
        for(l = 0; l <tdholders.length;l++){
            var dateindex = arrcount[l];

            console.log("same day ");
            var time = tdholders[l].querySelector(".fc-time").innerHTML;
                var description = tdholders[l].querySelector(".fc-title").innerHTML;
                //console.log(time, description);

                var date = headholders[dateindex].getAttribute("data-date");
                eventdos = new evento(date, description, time);
                //console.log(time, description, date);
                arr = eventMap.get(date);
                arr.push(eventdos);
                //console.log(JSON.stringify(arr));

                eventMap.set(date, arr);
                
        }
    }
    //console.log(table.lastChild);
}
}
//updateLS();
//console.log(eventMap);
runonce = false;
//deletenewlyadded();
//gatherEvents();
//gatherEvents();//console.log("recognize");
//print =  document.querySelector("div.fc-content");
//console.log(print);
gatherEvents();
populator();
}

/*
for (i = 0; i < anoopbox2.length; i++) {
    var table = anoopbox2[i].firstChild;
    var bod = table.lastChild;
    var rows = bod.children;
    var head = table.firstChild;
    var headrow = head.firstChild;
    var headies = headrow.children;
    //console.log(rows);

    for (k = 0; k < rows.length; k++) {
        var bodies = rows[k].children;
        for (j = 0; j < bodies.length; j++) {
            if (bodies[j].className == "fc-event-container") {

                //console.log(j);
                // console.log(bodies[j]);
                var aclass = bodies[j].firstChild;
                //console.log(aclass);
                var divimp = aclass.firstChild;
                //console.log(divimp);
                var spanos = divimp.firstChild;
                var time = spanos.innerHTML;

                var thanos = divimp.children[1];
                var title = thanos.innerHTML;
                console.log(title);
                console.log(time);
                //console.log(spanos.innerHTML);

                if (k == 0) {
                    n = j;
                } else {
                    n = j + 1;
                }
                var date = headies[n].getAttribute("data-date");
                console.log(date);
                if (eventMap[date] == undefined) {
                    console.log("untapped date");
                    var eventarr = new Array();
                    let eventos = new evento(date, title, time);
                    eventarr.push(eventos);
                    eventMap[date] = eventarr;
                } else if (eventMap[date] != undefined) {
                    console.log("date has events");
                    var present = 0;
                    let eventdos = new evento(date, title, time);
                    console.log(eventdos.description);
                    console.log(eventMap[date][0].description);
                    for (k = 0; k < eventMap[date].length; k++) {
                        if (eventMap[date][k].description == eventdos.description) {
                            if (eventMap[date][k].time == eventdos.time) {
                                console.log("identical");
                                present = 1;
                            }
                        }
                    }
                    if (present == 0) {
                        eventMap[date].push(eventdos);

                    }




                }
            }
            //populatorcmplx(title, date, time);
        }
    }
}
console.log(eventMap);
populator();*/


    /*anoopbox2 = document.querySelectorAll("div.fc-content-skeleton");
    





/*$('#external-events .fc-event').each(function () {

    // store data so the calendar knows to render an event upon drop

    $(this).data('event', {
        title: $.trim($(this).text()),
        // use the element's text as the event title

        stick: true // maintain when user navigates 
    });

    // make the event draggable using jQuery UI
    $(this).draggable({
        zIndex: 999,
        revert: true, // will cause the event to go back to its
        revertDuration: 0 //  original position after the drag
    });

});*/

var taskbox = document.getElementById('external-events-listing');
var addbtn = document.getElementById("eventbutton");
addbtn.addEventListener("click", function () {
    let val = validateForm();
    if (val == true) {
        let newtsk = document.createElement("div.fc-event");
        newtsk.className = "fc-event";
        let newtxt = document.createElement("textarea");
        let timetxt = document.createElement("textarea");
        newtxt.id = "txt"
        newtxt.value = document.forms["inputevent"]["eventname"].value;
        timetxt.value = document.forms["inputevent"]["eventtime"].value;

        newtsk.appendChild(newtxt);
        newtsk.appendChild(timetxt);
        //console.log(newtsk.children);
        $(newtsk).data('event', {
            title: $.trim(newtxt.value),
            time: $.trim(timetxt.value),
            stick: true
        });
        $(newtsk).draggable({
            zIndex: 999,
            revert: true,
            revertDuration: 0
        });

        //newtsk.myfunc();


        taskbox.appendChild(newtsk);
        console.log("event added");
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    } else {
        alert("please enter an event description and an event time");
    }
});

function validateForm() {
    var eventdesc = document.forms["inputevent"]["eventname"].value;
    var eventtime = document.forms["inputevent"]["eventtime"].value;

    if (eventdesc == "" || eventtime == "") {
        return false;
    }
    return true;

}



/* initialize the calendar */

$('#calendar').fullCalendar({
    header: {
        left: 'prev,next, today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    dragRevertDuration: 0,
    drop: function () {
      
        eventpopulator();
        //gatherEvents();
        // is the "remove after drop" checkbox checked?
        if (!$('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
        }
    },

    eventDragStop: function (event, jsEvent, ui, view) {
        if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
            $('#calendar').fullCalendar('removeEvents', event._id);
            var el = $("<div class='fc-event'>").appendTo('#external-events-listing').text(event.title);
            el.draggable({
                zIndex: 999,
                revert: true,
                revertDuration: 0
            });
            el.data('event', {
                title: event.title,
                id: event.id,
                stick: true
            });
        }
    }

});


var isEventOverDiv = function (x, y) {

    var external_events = $('#external-events');
    var offset = external_events.offset();
    offset.right = external_events.width() + offset.left;
    offset.bottom = external_events.height() + offset.top;

    // Compare
    if (x >= offset.left &&
        y >= offset.top &&
        x <= offset.right &&
        y <= offset.bottom) {
        return true;
    }
    return false;


};



var lastweek = document.getElementsByClassName("fc-prev-button fc-button fc-state-default fc-corner-left");
lastweek[0].addEventListener("click", function () {
    populator();
    //eventpopulator();


});
var nextweek = document.getElementsByClassName("fc-next-button fc-button fc-state-default fc-corner-right");
nextweek[0].addEventListener("click", function () {
    populator();
    //eventpopulator();

});
var tod = document.getElementsByClassName("fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right");
tod[0].addEventListener("click", function () {
    populator();
    // eventpopulator();

});

populator();
checker();
today();


// anoopbox1 = anoopbox.querySelectorAll("td.fc-day fc-widget-content fc-sun fc-past");
//console.log(anoopbox1)