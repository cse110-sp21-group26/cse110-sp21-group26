/* initialize the external events */
class evento {
    constructor(date, description, time) {
        this.date = date;
        this.description = description;
        this.time = time;
    }

}
var anoopbox, anoopbox1, anoopbox2, anoopbox3;
const eventMap = new Map();

dropdown = document.getElementById("dropbtn");
dropdown.addEventListener("click", function () {
    document.getElementById("myDropdown").classList.toggle("show");
})
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

function populator() {
    anoopbox = document.querySelectorAll("td.fc-day.fc-widget-content");
    anoopbox1 = document.getElementsByTagName("td");
    // console.log(anoopbox);
    //console.log(anoopbox1);
    qday = document.querySelector('div.well');
    var set1 = new Set();

    //console.log(qday);
   var well1 = qday.children;
    var div1 = well1[1]
    var para = div1.children;
    //for( h = 1; h < para.length;h++){
       // para[h].remove();
    //}
    console.log(para);

    console.log(eventMap.keys());
    
    for (i = 0; i < anoopbox.length; i++) {
        let holder = anoopbox[i].getAttribute("data-date");
        set1.add(holder);
        
    anoopbox[i].addEventListener("click", function() {
        
        var eventbox =document.getElementById("eventcage");

        var list_present = eventbox.querySelector("#event_list")
        var titlepre = eventbox.querySelector("#daydate");
        console.log(list_present);
        if(list_present != undefined){
            list_present.remove();
        }
        titlepre.innerHTML = holder;
        //eventbox.firstChild.innerHTML = holder;

    
        if(eventMap.has(holder)){
            console.log("exists");
            evlist = document.createElement("UL");
            evlist.id = "event_list"
            eventbox.appendChild(evlist);
            var arrus = eventMap.get(holder);
            for(k = 0; k <arrus.length;k++){
                eve = arrus[k].description + " @ " + arrus[k].time  ;
                evo = document.createElement("LI");
                evo.innerHTML = eve;
                evlist.appendChild(evo);
            }

        }
    

      }) 
}
console.log(set1);

}

function populatorcmplx(title, date, time) {
    anoopbox3 = document.querySelectorAll("td.fc-day.fc-widget-content");
    //anoopbox1 = document.getElementsByTagName("td");
    // console.log(anoopbox);
    //console.log(anoopbox1);
    for (i = 0; i < anoopbox3.length; i++) {
        let holder = anoopbox3[i].getAttribute("data-date");
        if (holder == date) {
            anoopbox3[i].addEventListener('click', function () {

                qday = document.querySelector('div.well');
                //console.log(qday);
                well1 = qday.children;

                div1 = well1[1];
                para = div1.children;
                para[0].innerHTML = date;
                //eventbox  = div1.children;
                //para[0].innerHTML = holder;
                //newvent = document.createElement("textarea");

                //newvent.value = title + "@" + time;
                let evententry = document.createElement("li");
                evententry.id = title + "" + time;
                evententry.innerHTML = title + "@" + time;

                if (para[1].contains(document.getElementById(evententry.id))) {
                    alert("event already exists");
                } else {

                    para[1].appendChild(evententry);
                }

            }, false);

        }
    }
}

function eventpopulator() {
anoopbox2 = document.querySelectorAll("div.fc-content-skeleton")
document.createAttribute("position-count");
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
                console.log(time, description, date);
                if(eventMap[date] == undefined){
                    var eventarr = new Array();
                eventos = new evento(date, description, time);
                eventarr.push(eventos);
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
                console.log(time, description, date);
                arr = eventMap.get(date);
                arr.push(eventdos);
                eventMap.set(date, arr);
                
        }
    }
    //console.log(table.lastChild);
}
}
console.log(eventMap);
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

function mapupdater() {

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
        //console.log("event dropped");
        eventpopulator();
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



// anoopbox1 = anoopbox.querySelectorAll("td.fc-day fc-widget-content fc-sun fc-past");
//console.log(anoopbox1)