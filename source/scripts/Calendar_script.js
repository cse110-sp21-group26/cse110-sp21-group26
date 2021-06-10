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
document.addEventListener('DOMContentLoaded', function(){
    console.log("started");
    let datebox = document.getElementById("daydate");
    datebox.innerHTML = reverseformat(today());
    let mystorage = window.localStorage;
    if(mystorage.getItem(today()) != undefined){
        console.log("priorly created");
        arrtoday = JSON.parse(mystorage.getItem(today()));
        let usuable  =[];
        for(var i in arrtoday){
            console.log(i);
            usuable.push(arrtoday[i]);
        }
        var eventbox = document.getElementById("eventcage");
        //var list_present = eventbox.querySelector("#event_list")
           var  evlist = document.createElement("UL");
           evlist.id = "event_list";
           console.log(usuable.length);
            for (k = 0; k < usuable.length; k++) {
                eve = usuable[k].description + " @ " + usuable[k].time;
                evo = document.createElement("LI");
                evo.innerHTML = eve;
                evlist.appendChild(evo);
            }
            eventbox.appendChild(evlist);

    }
    });

var anoopbox, anoopbox1, anoopbox2, anoopbox3;
var runonce = false;
var onetime = false;
const eventMap = new Map();
//document.addEventListener('DOMContentLoaded', startRender);
window.onbeforeunload = function (e) {
    window.onunload = function () {
        updateLS();
    }
    return undefined;
};

dropdown = document.getElementById("dropbtn");
dropdown.addEventListener("click", function () {
    document.getElementById("myDropdown").classList.toggle("show");
})



function gatherEvents() {
    if (runonce == false) {
        var found = false;
        mystorage = window.localStorage;
        let skeletons = document.getElementsByClassName("fc-content-skeleton");
        for (var k = 0; k < mystorage.length; k++) {
            date = mystorage.key(k);
            if (date.includes("-") == false) {
                continue;
            }
            prearry = JSON.parse(mystorage.getItem(date));
            var res = [];
            for (var i in prearry) {
                res.push(prearry[i]);
                //console.log(prearry[i]);
            }
            /*for(t = 0; t < res.length;t++){
            console.log(res[t].date);
            }
            console.log(res.length);*/
            for (n = 0; n < res.length; n++) {
                for (i = 0; i < skeletons.length; i++) {
                    table = skeletons[i].firstChild;
                    thead = table.firstChild;
                    tbod = table.lastChild;
                    theadrow = thead.firstChild;
                    tbodrows = tbod.children;
                    theadcells = theadrow.children;
                    for (h = 0; h < theadcells.length; h++) {
                        if (theadcells[h].getAttribute("data-date") === date) {
                            for (g = 0; g < tbodrows.length; g++) {
                                tbodcells = tbodrows[g].children;
                                if (tbodcells[h].className === "fc-event-container") {
                                    continue;
                                } else {
                                    found = true;
                                    tbodcells[h].className = "fc-event-container";
                                    anchor = document.createElement("A")
                                    anchor.className = "fc-day-grid-event fc-event fc-start fc-end  fc-draggable"
                                    div1 = document.createElement("DIV");
                                    div1.className = "fc-content";
                                    span1 = document.createElement("span");
                                    span1.className = "fc-time";
                                    span1.innerHTML = res[n].time
                                    span2 = document.createElement("span");
                                    span2.className = "fc-title";
                                    span2.innerHTML = res[n].description;
                                    div1.appendChild(span1);
                                    div1.appendChild(span2);
                                    anchor.appendChild(div1);
                                    tbodcells[h].appendChild(anchor);
                                    break;
                                }
                            }
                            if (found === false) {
                                newrow = document.createElement("tr");
                                for (m = 0; m < 7; m++) {
                                    td = document.createElement("td");
                                    if (m == h) {
                                        td.className = "fc-event-container";
                                        anchor = document.createElement("A")
                                        anchor.className = "fc-day-grid-event fc-event fc-start fc-end  fc-draggable"
                                        div1 = document.createElement("DIV");
                                        div1.className = "fc-content";
                                        span1 = document.createElement("span");
                                        span1.className = "fc-time";
                                        span1.innerHTML = res[n].time
                                        span2 = document.createElement("span");
                                        span2.className = "fc-title";
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

function reverseformat(date) {
    let size = date.length;
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, size);
    return new String(month + "-" + day + "-" + year);
}

function populator() {
    let mystorage = window.localStorage;
    anoopbox = document.querySelectorAll("td.fc-day.fc-widget-content");

    for (i = 0; i < anoopbox.length; i++) {
        let holder = anoopbox[i].getAttribute("data-date");
         anoopbox[i].addEventListener("click", function () {
            var eventbox = document.getElementById("eventcage");
            var mapindic = false;
            var storindic = false;
            var list_present = eventbox.querySelector("#event_list")
            var titlepre = eventbox.querySelector("#daydate");
            //fconsole.log(list_present);
            if (list_present != undefined) {
                list_present.remove();
            }
            titlepre.innerHTML = reverseformat(holder);
            //eventbox.firstChild.innerHTML = holder;

            if (eventMap.has(holder)) {
                mapindic = true;
                console.log("present in map");
            }
            if (mystorage.getItem(holder) != undefined) {
                storindic = true;
                console.log("present in loc storage");
            }
            if (storindic == true && mapindic == true) {
                touse = JSON.parse(mystorage.getItem(holder));
                console.log("priorly created");
                evlist = document.createElement("UL");
                evlist.id = "event_list"
                for (k = 0; k < touse.length; k++) {
                    eve = touse[k].description + " @ " + touse[k].time;
                    evo = document.createElement("LI");
                    evo.innerHTML = eve;
                    evlist.appendChild(evo);
                }
                var arrus = eventMap.get(holder);
                for (k = 0; k < arrus.length; k++) {
                    steve = arrus[k].description + " @ " + arrus[k].time;
                    stevo = document.createElement("LI");
                    stevo.innerHTML = steve;
                    evlist.appendChild(stevo);
                }
                eventbox.appendChild(evlist);

            } else if (mapindic == true && storindic == false) {
                console.log("new");
                evlist = document.createElement("UL");
                evlist.id = "event_list"
                var arrus = eventMap.get(holder);
                for (k = 0; k < arrus.length; k++) {
                    eve = arrus[k].description + " @ " + arrus[k].time;
                    evo = document.createElement("LI");
                    evo.innerHTML = eve;
                    evlist.appendChild(evo);
                }
                eventbox.appendChild(evlist);



            } else if (storindic == true && mapindic == false) {
                touse = JSON.parse(mystorage.getItem(holder));
                console.log("priorly created");
                evlist = document.createElement("UL");
                evlist.id = "event_list"
                for (k = 0; k < touse.length; k++) {
                    eve = touse[k].description + " @ " + touse[k].time;
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
            if (noTaskPrompt) {
                noTaskPrompt.forEach(element => {
                    element.remove();
                });
            }
            tasklist = mystorage.getItem("tasksList");
            if (tasklist != null) {
                ref_tasklist = JSON.parse(tasklist);
                var arry = [];
                for (var m in ref_tasklist) {
                    arry.push(ref_tasklist[m]);
                }
                for (b = 0; b < arry.length; b++) {
                    console.log(arry[b].date);
                    console.log(reverseformat(holder));

                    if (arry[b].date == reverseformat(holder)) {
                        console.log("has tasks");
                        console.log(arry[b]);
                        const tasksListModuleForm = document.getElementById("tasks_list_items_display"); //locate where to add
                        const tasktext = arry[b].taskText;
                        const isChecked = Number(arry[b].checked) === 1 ? "checked" : "unchecked";
                        let spanCheckedOrCheckedStyle;
                        if (Number(arry[b].checked) === 1) {
                            if (Number(arry[b].important) === 1) {
                                spanCheckedOrCheckedStyle = "tasks_list_item_span_checked_important";
                            } else {
                                spanCheckedOrCheckedStyle = "tasks_list_item_span_checked";
                            }
                        } else {
                            if (Number(arry[b].important) === 1) {
                                spanCheckedOrCheckedStyle = "tasks_list_item_span_unchecked_important";
                            } else {
                                spanCheckedOrCheckedStyle = "tasks_list_item_span_unchecked";
                            }
                        }
                        const taskID = arry[b].taskID;

                        const oneTaskItem = document.createElement("li"); // create new element
                        oneTaskItem.setAttribute('class', `tasks_list_item`);
                        oneTaskItem.innerHTML = `
                       <input id=${taskID} type="checkbox" ${isChecked}/>
                       <span class=${spanCheckedOrCheckedStyle} >${tasktext}</span>
                       <button class="important_button">
                         <svg><use href="#important-mark"></use></svg>
                       </button>
                       <button class="delete_task_button">
                         <svg><use href="#delete-icon"></use></svg>
                       </button>
                   `;
                        tasksListModuleForm.appendChild(oneTaskItem); //inject }
                        //console.log("found task");

                    }
                }
            }
        });
        //console.log(set1);

    }
}


function updateLS() {
    console.log("hi");
    let mystorage = window.localStorage;
    const iterator_entries = eventMap.entries();
    for (p = 0; p < eventMap.size; p++) {
        counter = iterator_entries.next().value;
        if (mystorage.getItem(counter[0]) === null) {
            mystorage.setItem(counter[0], JSON.stringify(counter[1]));
        } else {
            var arr = JSON.parse(mystorage.getItem(counter[0]));
            var res = [];
            for (var i in arr) {
                res.push(arr[i]);

            }
            var final = res.concat(counter[1]);
            mystorage.setItem(counter[0], JSON.stringify(final));
        }
    }
    console.log(mystorage);
    //mystorage.clear();
}

function checker() {
    let mystorage = window.localStorage;
    console.log("bruh");
    for (k = 0; k < mystorage.length; k++) {
        var name = mystorage.key(k);
        var arr = mystorage.getItem(name);
        var str = JSON.parse(arr);
        var res = [];
        for (var i in str) {
            res.push(str[i]);
        }
        // console.log(res);
    }
}

function deletenewlyadded() {
    var todlt = document.querySelector("td.fc-event-container");
    var minidlt = todlt.children
    for (l = 0; l < minidlt.length; l++) {
        minidlt[l].remove();
    }
    todlt.removeAttribute("class");
}

function today() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    var m, d;
    if (mm < 10) {
        m = "0" + mm;
    } else {
        m = mm;
    }
    if (dd < 10) {
        d = "0" + dd;
    } else {
        d = dd;
    }
    today = yyyy + '-' + m + '-' + d;
    return today;
}

function eventpopulator() {
    anoopbox2 = document.querySelectorAll("div.fc-content-skeleton")
    document.createAttribute("position-count");
    let mystorage = window.localStorage;

    //console.log(anoopbox2);
    for (i = 0; i < anoopbox2.length; i++) {
        var table = anoopbox2[i].firstChild;
        var tbody = table.lastChild;
        var thead = table.firstChild;
        var headrow = thead.firstChild;
        var headholders = headrow.children;
        var rows = tbody.children;
        var arrcount = new Array();

        for (k = 0; k < rows.length; k++) {
            var tdholders = rows[k].children;
            if (tdholders.length == 7) {
                for (h = 0; h < tdholders.length; h++) {
                    if (tdholders[h].className == "fc-event-container") {
                        arrcount.push(h);
                        var time = tdholders[h].querySelector(".fc-time").innerHTML;
                        var description = tdholders[h].querySelector(".fc-title").innerHTML;
                        var date = headholders[h].getAttribute("data-date");
                        //console.log(time, description, date);
                        if (eventMap[date] == undefined) {
                            var eventarr = new Array();
                            eventos = new evento(date, description, time);


                            eventarr.push(eventos);
                            // console.log(JSON.stringify(eventarr));
                            eventMap.set(date, eventarr);
                        }

                    }
                }
            } else {
                for (l = 0; l < tdholders.length; l++) {
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
    runonce = false;
    gatherEvents();
    populator();
    //eventpopulator();


});
var nextweek = document.getElementsByClassName("fc-next-button fc-button fc-state-default fc-corner-right");
nextweek[0].addEventListener("click", function () {
    runonce = false;
    gatherEvents();
    populator();
    //eventpopulator();

});
var tod = document.getElementsByClassName("fc-today-button fc-button fc-state-default fc-corner-left fc-corner-right");
tod[0].addEventListener("click", function () {
    runonce = false;
    gatherEvents();
    populator();
    // eventpopulator();

});

month = document.getElementsByClassName("fc-month-button fc-button fc-state-default fc-corner-left fc-state-active");
month[0].remove();
week = document.getElementsByClassName("fc-agendaWeek-button fc-button fc-state-default");
week[0].remove();
day = document.getElementsByClassName("fc-agendaDay-button fc-button fc-state-default fc-corner-right");
day[0].remove();
//populator();
//checker();
//today();


// anoopbox1 = anoopbox.querySelectorAll("td.fc-day fc-widget-content fc-sun fc-past");
//console.log(anoopbox1)