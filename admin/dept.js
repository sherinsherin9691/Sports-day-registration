
let editIndex = -1;

//------------------- Department Center--------------------


const form = document.getElementById("departmentForm");

const departmentInput = document.getElementById("department");

const coordinatorInput = document.getElementById("coordinator");

const emailInput = document.getElementById("email");

const contactInput = document.getElementById("contact");

const studentsInput = document.getElementById("students");

const shiftInput = document.getElementById("shift");

const tableBody = document.getElementById("departmentTable");



// -------------------Load Existing Departments-------------------

departments.forEach(dept => {

    if (dept.score === undefined) {

        dept.score = 0;

    }

});

saveDepartments();

// ------------------Generate Department ID------------------

function generateDepartmentID(name){

    const year = "26";

    const code = name.substring(0,2).toUpperCase();

    const random = Math.floor(100 + Math.random()*900);

    return year + code + random;
}

// --------------------Generate Password-----------------

function generatePassword(){

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let password = "";

    for(let i=0;i<8;i++){

        password +=
        chars.charAt(
        Math.floor(
        Math.random()*chars.length
        )
        );
    }

    return password;
}

// ---------------------Save Local Storage--------------------


function saveDepartments(){

    localStorage.setItem(
    "departments",
    JSON.stringify(departments)
    );

}

// -------------------Update Preview Card--------------------

function updatePreview(data){

document.getElementById("previewDepartment").textContent =
data.department;

document.getElementById("previewCoordinator").textContent =
data.coordinator;

document.getElementById("previewContact").textContent =
data.contact;

document.getElementById("previewShift").textContent =
data.shift;

document.getElementById("previewStudents").textContent =
data.students;

document.getElementById("previewDeptId").textContent =
data.id;

document.getElementById("previewPassword").textContent =
data.password;

document.getElementById(
"previewLogo"
).innerText =
data.department
.substring(0,2)
.toUpperCase();

}



// -------------------Render Table-------------------

function renderTable(){

tableBody.innerHTML = "";

departments.forEach((dept,index)=>{

const row = document.createElement("tr");

row.innerHTML = `
<td>${dept.department}</td>
<td>${dept.coordinator}</td>
<td>${dept.id}</td>
<td>${dept.contact}</td>

<td>
    <button class="tbl-btn"
    onclick="editDepartment(${index})">

        <i class="fa-solid fa-pen-to-square"></i>

    </button>

    <button class="tbl-btn delete"
    onclick="deleteDepartment(${index})">

        <i class="fa-solid fa-trash"></i>

    </button>
</td>
`;

tableBody.appendChild(row);

});

}

// -------------------Add Department-------------------


form.addEventListener("submit", function (e) {

    e.preventDefault();

    const department = departmentInput.value;
    const coordinator = coordinatorInput.value;
    const email = emailInput.value;
    const contact = contactInput.value;
    const students = studentsInput.value;
    const shift = shiftInput.value;

    if (editIndex === -1) {

        const departmentData = {

            department,
            coordinator,
            email,
            contact,
            students,
            shift,

            id: generateDepartmentID(department),

            password: generatePassword(),

            score: 0
        };

        departments.push(departmentData);

        updatePreview(departmentData);

    } else {

        departments[editIndex] = {

            ...departments[editIndex],

            department,
            coordinator,
            email,
            contact,
            students,
            shift
        };

        updatePreview(departments[editIndex]);

        editIndex = -1;
    }

    saveDepartments();

    renderTable();

    updateDepartmentCards();

    form.reset();
});
//---------------- Delete Department-----------------

function deleteDepartment(index) {

    if (confirm("Delete Department?")) {

        departments.splice(index, 1);

        saveDepartments();

        renderTable();

        updateDepartmentCards();
    }
}

// -------------------Edit Department-------------------


function editDepartment(index) {

    const dept = departments[index];

    departmentInput.value = dept.department;
    coordinatorInput.value = dept.coordinator;
    emailInput.value = dept.email;
    contactInput.value = dept.contact;
    studentsInput.value = dept.students;
    shiftInput.value = dept.shift;

    editIndex = index;
}

// -------------------Search Department------------------

const searchInput =
document.getElementById(
"searchDept"
);

searchInput.addEventListener(
"keyup",
function(){

const value =
this.value.toLowerCase();

const rows =
document.querySelectorAll(
"#departmentTable tr"
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


// ----------------Load Existing Data---------------

renderTable();

function updateDepartmentCards() {

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

    document.getElementById("totalDepartments").textContent =
    departments.length;

    document.getElementById("deptEvents").textContent =
    events.length;

    document.getElementById("deptStudents").textContent =
    totalStudents;

    document.getElementById("deptCompletedEvents").textContent =
    completedEvents.length;
}

updateDepartmentCards();

function editDepartment(index){

    const departments =
    JSON.parse(localStorage.getItem("departments")) || [];

    const dept = departments[index];

    document.getElementById("department").value =
    dept.department;

    document.getElementById("coordinator").value =
    dept.coordinator;

    document.getElementById("email").value =
    dept.email;

    document.getElementById("contact").value =
    dept.contact;

    document.getElementById("students").value =
    dept.students;

    document.getElementById("shift").value =
    dept.shift;

    editIndex = index;
}

// ---------------------reset----------------------
document
.getElementById("resetBtn")
.addEventListener("click", () => {

    form.reset();

    editIndex = -1;
});