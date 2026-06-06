
// -----------------EVENT LOGS JAVASCRIPT-----------------


// Get logs from localStorage
let logs =
JSON.parse(localStorage.getItem("eventLogs")) || [];

const logsTable =
document.getElementById("logsTable");

// ----------------DISPLAY LOGS----------------

function loadLogs() {

    if (!logsTable) return;

    logsTable.innerHTML = "";

    if (logs.length === 0) {

        logsTable.innerHTML = `
        <tr>
            <td colspan="5">
                No activity found
            </td>
        </tr>
        `;

        return;
    }

    // Latest log first
    logs
    .slice()
    .reverse()
    .forEach(log => {

        let statusClass = "";

        if(log.status === "Pending"){
            statusClass = "pending";
        }

        else if(log.status === "Completed"){
            statusClass = "completed";
        }

        else if(log.status === "Delayed"){
            statusClass = "delayed";
        }

        else{
            statusClass = "active";
        }

        logsTable.innerHTML += `
        <tr>

            <td>${log.eventName}</td>

            <td>${log.activity}</td>

            <td>${log.date}</td>

            <td>${log.time}</td>

            <td>
                <span class="${statusClass}">
                    ${log.status}
                </span>
            </td>

        </tr>
        `;
    });

}

// ----------------LOAD PAGE----------------

loadLogs();