let editIndex = -1;
// ---------------------STAFF CONTROL PAGE---------------------


const form = document.getElementById("staffForm");

const departmentInput = document.getElementById("department");

const staffNameInput = document.getElementById("staffName");

const staffIdInput = document.getElementById("staffId");

const contactInput = document.getElementById("contact");

const shiftInput = document.getElementById("shift");

const eventInput = document.getElementById("eventAssigned");

const tableBody = document.getElementById("staffTable");

// ----------------------LOAD STAFFS---------------------

let staffs =
JSON.parse(
localStorage.getItem("staffs")
) || [];

// --------------------Load existing events-----------------------
let events =
JSON.parse(
localStorage.getItem("events")
) || [];

// ----------------------GENERATE MANAGER ID---------------------

function generateManagerID(){

const year = "26";

const random =
Math.floor(
100 + Math.random()*900
);

return "SM" + year + random;

}


// ---------------------GENERATE PASSWORD-----------------------

function generatePassword(){

const chars =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

let password = "";

for(let i=0;i<8;i++){

password += chars.charAt(

Math.floor(
Math.random()*chars.length
)

);

}

return password;

}


// ---------------------SAVE LOCAL STORAGE--------------------

function saveStaffs(){

localStorage.setItem(
"staffs",
JSON.stringify(staffs)
);

}

// ---------------------UPDATE PREVIEW CARD---------------------

function updatePreview(staff){

document.getElementById(
"previewStaffName"
).innerText =
staff.name;

document.getElementById(
"previewContact"
).innerText =
staff.contact;

document.getElementById(
"previewShift"
).innerText =
staff.shift;

document.getElementById(
"previewEvent"
).innerText =
staff.event;

document.getElementById(
"previewManagerId"
).innerText =
staff.managerId;

document.getElementById(
"previewPassword"
).innerText =
staff.password;

document.getElementById(
"previewLogo"
).innerText =
staff.name
.substring(0,2)
.toUpperCase();

}

// ----------------------RENDER TABLE------------------

function renderTable(){

tableBody.innerHTML = "";

staffs.forEach((staff,index)=>{

const row =
document.createElement("tr");

row.innerHTML = `
<tr>
    <td>${staff.staffId}</td>
    <td>${staff.name}</td>
    <td>${staff.managerId}</td>
    <td>${staff.contact}</td>

    <td>

        <button class="tbl-btn"
        onclick="editStaff(${index})">

            <i class="fa-solid fa-pen-to-square"></i>

        </button>

        <button class="tbl-btn delete"
        onclick="deleteStaff(${index})">

            <i class="fa-solid fa-trash"></i>

        </button>

    </td>

</tr>
`;

tableBody.appendChild(row);

});

}

// --------------------------ADD STAFF------------------
form.addEventListener("submit", function (e) {

    e.preventDefault();

    const staffData = {

        department: departmentInput.value,
        name: staffNameInput.value,
        staffId: staffIdInput.value,
        contact: contactInput.value,
        shift: shiftInput.value,
        event: eventInput.value
    };

    if (editIndex === -1) {

        staffData.managerId = generateManagerID();
        staffData.password = generatePassword();

        staffs.push(staffData);

        updatePreview(staffData);

    } else {

        staffs[editIndex] = {

            ...staffs[editIndex],
            ...staffData
        };

        updatePreview(staffs[editIndex]);

        editIndex = -1;
    }

    saveStaffs();

    renderTable();

    updateStaffCards();

    form.reset();
});

// ----------------------DELETE STAFF------------------

function deleteStaff(index) {

    if (confirm("Delete Staff?")) {

        staffs.splice(index, 1);

        saveStaffs();

        renderTable();

        updateStaffCards();
    }
}

// ------------------EDIT STAFF---------------

function editStaff(index) {

    const staff = staffs[index];

    departmentInput.value = staff.department;
    staffNameInput.value = staff.name;
    staffIdInput.value = staff.staffId;
    contactInput.value = staff.contact;
    shiftInput.value = staff.shift;
    eventInput.value = staff.event;

    editIndex = index;
}

// ---------------------SEARCH STAFF------------------

const searchInput =
document.getElementById(
"searchStaff"
);

searchInput.addEventListener(
"keyup",
function(){

const value =
this.value.toLowerCase();

const rows =
document.querySelectorAll(
"#staffTable tr"
);

rows.forEach(row=>{

row.style.display =

row.innerText
.toLowerCase()
.includes(value)

? ""

: "none";

});

}
);


// ------------------LOAD SAVED DATA---------------

renderTable();

function animateCounter(id,target){

    let count = 0;

    const element =
    document.getElementById(id);

    const interval = setInterval(()=>{

        count++;

        element.textContent = count;

        if(count >= target){

            clearInterval(interval);

        }

    },20);

}

animateCounter(
"totalEvents",
events.length
);

animateCounter(
"totalRegistrations",
departments.length + staffs.length
);

animateCounter(
"totalStudents",
totalStudents
);

animateCounter(
"completedEvents",
completedEvents.length
);

function updateStaffCards() {

    const staffs =
    JSON.parse(localStorage.getItem("staffs")) || [];

    const departments =
    JSON.parse(localStorage.getItem("departments")) || [];

    const events =
    JSON.parse(localStorage.getItem("events")) || [];

    let totalStudents = 0;

    departments.forEach(dept => {
        totalStudents += Number(dept.students);
    });

    const completedEvents =
    events.filter(event =>
        event.status === "Completed"
    );

    document.getElementById("totalManagers").textContent =
    staffs.length;

    document.getElementById("staffEvents").textContent =
    events.length;

    document.getElementById("staffStudents").textContent =
    totalStudents;

    document.getElementById("staffCompletedEvents").textContent =
    completedEvents.length;
}

updateStaffCards();

// ---------------------reset----------------------
document
.getElementById("resetBtn")
.addEventListener("click", () => {

    form.reset();

    editIndex = -1;
});