// -------------------- LOAD DATA --------------------

const departments =
JSON.parse(localStorage.getItem("departments")) || [];

const staffs =
JSON.parse(localStorage.getItem("staffs")) || [];

const events =
JSON.parse(localStorage.getItem("events")) || [];

const logs =
JSON.parse(localStorage.getItem("eventLogs")) || [];

// -------------------- DASHBOARD CARDS --------------------

// Total Events
document.getElementById("totalEvents").textContent =
events.length;

// Total Registrations
document.getElementById("totalRegistrations").textContent =
departments.length + staffs.length;

// Total Students

let totalStudents = 0;

departments.forEach(dept => {

    totalStudents += Number(dept.students || 0);

});

document.getElementById("totalStudents").textContent =
totalStudents;

// Completed Events

const completedEvents =
events.filter(event =>
event.status === "Completed"
);

document.getElementById("completedEvents").textContent =
completedEvents.length;


// -------------------- EVENT STATUS --------------------

const upcoming =
events.filter(event =>
event.status === "Pending"
).length;

const ongoing =
events.filter(event =>
event.status === "Active"
).length;

const completed =
events.filter(event =>
event.status === "Completed"
).length;

document.getElementById("upcomingCount").textContent =
upcoming;

document.getElementById("ongoingCount").textContent =
ongoing;

document.getElementById("completedCount").textContent =
completed;

document.getElementById("eventTotal").textContent =
events.length;


// -------------------- PIE CHART --------------------

const total =
events.length || 1;

const upcomingPercent =
(upcoming / total) * 100;

const ongoingPercent =
(ongoing / total) * 100;

const completedPercent =
(completed / total) * 100;

document.querySelector(".circle-chart").style.background =
`conic-gradient(
#1d4ed8 0% ${upcomingPercent}%,
#2563eb ${upcomingPercent}% ${upcomingPercent + ongoingPercent}%,
#93c5fd ${upcomingPercent + ongoingPercent}% 100%
)`;

// -------------------- RECENT ACTIVITY --------------------

const recentLogs =
logs.slice(-5).reverse();

const activityTable =
document.getElementById("recentActivity");

activityTable.innerHTML = "";

recentLogs.forEach(log => {

    let statusClass = "";

    if(log.status === "Pending"){

        statusClass = "pending";

    }
    else if(log.status === "Completed"){

        statusClass = "completed";

    }
    else{

        statusClass = "active";

    }

    activityTable.innerHTML += `

    <tr>

        <td>${log.event || "-"}</td>

        <td>${log.status || "-"}</td>

        <td>${log.date || "-"}</td>

        <td class="${statusClass}">
            ${log.status || "-"}
        </td>

    </tr>

    `;

});


// -------------------- TOP 5 DEPARTMENT SCORES --------------------

function loadDepartmentScores(){

    const container =
    document.getElementById("scoreContainer");

    container.innerHTML = "";

    const topDepartments =
    [...departments]
    .sort((a,b)=>
        (b.score || 0) -
        (a.score || 0)
    )
    .slice(0,5);

    const maxScore =
    Math.max(
        ...topDepartments.map(
            dept => dept.score || 0
        ),
        1
    );

    topDepartments.forEach(dept => {

        const score =
        dept.score || 0;

        const width =
        (score / maxScore) * 100;

        container.innerHTML += `

        <div class="score-item">

            <div class="score-header">

                <span>${dept.department}</span>

                <span>${score} pts</span>

            </div>

            <div class="score-bar">

                <div
                class="score-fill"
                style="width:${width}%">
                </div>

            </div>

        </div>

        `;

    });

}

loadDepartmentScores();