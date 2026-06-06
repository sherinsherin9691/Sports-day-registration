let editIndex = -1;
// ------------------EVENT CONTROL-------------------

const form =
document.getElementById("eventForm");

const table =
document.getElementById("eventTable");


// ------------------LOAD DATA---------------

let events =
JSON.parse(
localStorage.getItem("events")
) || [];

let staffs =
JSON.parse(
localStorage.getItem("staffs")
) || [];


// -------------------GENERATE EVENT ID----------------

function generateEventID(){

let count = events.length + 1;

return "EV26" +
String(count).padStart(3,"0");

}

// -------------------SAVE EVENT-----------------

function saveEvents(){

localStorage.setItem(
"events",
JSON.stringify(events)
);

}

// ---------------LOAD MANAGERS-------------------

function loadManagers(){

const dropdown =
document.getElementById(
"eventManager"
);

dropdown.innerHTML =
'<option value="">Select Manager</option>';

staffs.forEach(staff=>{

dropdown.innerHTML +=

`<option>

${staff.name}

</option>`;

});

}



// -------------SHOW TEAM LIMIT--------------------


document
.getElementById("category")
.addEventListener("change",function(){

const teamLimit =
document.getElementById(
"teamLimit"
);

if(this.value==="Team"){

teamLimit.style.display =
"block";

}else{

teamLimit.style.display =
"none";

}

});

// ---------------IMAGE PREVIEW--------------------

document
.getElementById("eventImage")
.addEventListener("change",function(){

const file =
this.files[0];

if(file){

document
.getElementById("previewImage")
.src =
URL.createObjectURL(file);

}

});

// --------------PREVIEW CARD---------------

function updatePreview(event){

    document.getElementById("previewName").textContent =
    event.name;

    document.getElementById("previewId").textContent =
    event.id;

    document.getElementById("previewStaff").textContent =
    event.manager;

    document.getElementById("previewDate").textContent =
    event.date;

    document.getElementById("previewVenue").textContent =
    event.venue;
}

// ---------------UPDATE TOTAL EVENTS----------------

function updateCount(){

document.getElementById(
"totalEvents"
).innerText =
events.length;

}

// ---------------RENDER TABLE-------------

function renderTable(){

table.innerHTML = "";

events.forEach((event,index)=>{

table.innerHTML +=

`

<tr>

<td>${event.name}</td>

<td>${event.id}</td>

<td>${event.date}</td>

<td>${event.venue}</td>

<td>${event.status}</td>

<td>

<button
class="tbl-btn"
onclick="editEvent(${index})">

<i class="fa-solid fa-pen-to-square"></i>

</button>

<button
class="tbl-btn delete"
onclick="deleteEvent(${index})">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

});

updateCount();

}



// ---------------------ADD EVENT------------------

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const eventData = {

        name: document.getElementById("eventName").value,
        manager: document.getElementById("eventManager").value,
        date: document.getElementById("eventDate").value,
        time: document.getElementById("eventTime").value,
        venue: document.getElementById("venue").value,
        category: document.getElementById("category").value,
        teamLimit: document.getElementById("teamLimit").value,
        status: document.getElementById("status").value
    };

    if (editIndex === -1) {

        eventData.id = generateEventID();

        events.push(eventData);

        addLog(eventData);

        updatePreview(eventData);

    } else {

        events[editIndex] = {

            ...events[editIndex],
            ...eventData
        };

        updatePreview(events[editIndex]);

        editIndex = -1;
    }

    saveEvents();

    renderTable();

    updateEventCards();

    form.reset();
});

// ------------------DELETE EVENT-----------------
function deleteEvent(index) {

    if (confirm("Delete Event?")) {

        events.splice(index, 1);

        saveEvents();

        renderTable();

        updateEventCards();
    }
}

// ------------------EDIT EVENT-----------------

function editEvent(index) {

    const event = events[index];

    document.getElementById("eventName").value =
        event.name;

    document.getElementById("eventManager").value =
        event.manager;

    document.getElementById("eventDate").value =
        event.date;

    document.getElementById("eventTime").value =
        event.time;

    document.getElementById("venue").value =
        event.venue;

    document.getElementById("category").value =
        event.category;

    document.getElementById("teamLimit").value =
        event.teamLimit;

    document.getElementById("status").value =
        event.status;

    editIndex = index;
}

// ---------------EVENT LOG----------------


function addLog(event){

let logs =
JSON.parse(
localStorage.getItem(
"eventLogs"
)
) || [];

logs.unshift({

event:event.name,

status:event.status,

date:
new Date()
.toLocaleDateString(),

time:
new Date()
.toLocaleTimeString()

});

localStorage.setItem(

"eventLogs",

JSON.stringify(logs)

);

}



// -------------INITIAL LOAD-------------------


loadManagers();

renderTable();

updateCount();

function updateEventCards() {

    const events =
    JSON.parse(localStorage.getItem("events")) || [];

    const staffs =
    JSON.parse(localStorage.getItem("staffs")) || [];

    const active =
    events.filter(event =>
        event.status === "Pending"
    ).length;

    const completed =
    events.filter(event =>
        event.status === "Completed"
    ).length;

    document.getElementById("totalEvents").textContent =
    events.length;

    document.getElementById("activeEvents").textContent =
    active;

    document.getElementById("completedEvents").textContent =
    completed;

    document.getElementById("totalManagers").textContent =
    staffs.length;
}
updateEventCards();

// ---------------------reset----------------------
document
.getElementById("resetBtn")
.addEventListener("click", () => {

    form.reset();

    editIndex = -1;
});

// ---------------Event settings & Registered Events----------------
function saveEventRules(){

    const rules = {

        firstPlace:
        Number(document.getElementById("firstPoint").value),

        secondPlace:
        Number(document.getElementById("secondPoint").value),

        thirdPlace:
        Number(document.getElementById("thirdPoint").value),

        participation:
        Number(document.getElementById("participationPoint").value),

        soloLimit:
        Number(document.getElementById("soloLimit").value),

        teamLimit:
        Number(document.getElementById("teamLimitRule").value)

    };

    localStorage.setItem(
        "sportsRules",
        JSON.stringify(rules)
    );

    alert("Rules Saved Successfully");
}

function loadRules(){

    const rules =
    JSON.parse(
        localStorage.getItem("sportsRules")
    );

    if(!rules) return;

    document.getElementById("firstPoint").value =
    rules.firstPlace;

    document.getElementById("secondPoint").value =
    rules.secondPlace;

    document.getElementById("thirdPoint").value =
    rules.thirdPlace;

    document.getElementById("participationPoint").value =
    rules.participation;

    document.getElementById("soloLimit").value =
    rules.soloLimit;

    document.getElementById("teamLimitRule").value =
    rules.teamLimit;
}

loadRules();