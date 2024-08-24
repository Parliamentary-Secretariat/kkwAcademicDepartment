
// ตัวอย่างข้อมูลวิชาและนักเรียน
let subjects = {
    "ภาษาไทย": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "คณิตศาสตร์": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "วิทยาศาสตร์": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "สังคมศึกษา ศาสนาและวัฒนธรรม": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "ประวัติศาสตร์": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "หน้าที่พลเมือง": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "ศิลปะ": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "ดนตรี": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "การงานอาชีพ": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "สุขศึกษาและพลศึกษา": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ],
    "ภาษาอังกฤษ": [
        { id: '00001', name: 'นายศุภกฤต บุญคำ', grade: '' },
        { id: '00002', name: 'นายคนอร์ ศรีวรรณา', grade: '' }
    ]
};

// ฟังก์ชันเพื่อโหลดข้อมูลวิชา
function loadSubjects() {
    const savedSubjects = JSON.parse(localStorage.getItem('subjects'));
    if (savedSubjects) {
        subjects = savedSubjects; // อัปเดต subjects ด้วยข้อมูลจาก localStorage
    }

    const subjectSelect = document.getElementById('subjectSelect');
    for (let subject in subjects) {
        let option = document.createElement('option');
        option.value = subject;
        option.innerText = subject;
        subjectSelect.appendChild(option);
    }
}

// ฟังก์ชันเพื่อโหลดข้อมูลนักเรียนสำหรับวิชาที่เลือก
function loadStudentsForSubject(subject) {
    const studentTable = document.getElementById('studentTable');
    studentTable.innerHTML = ''; // ล้างข้อมูลเก่าก่อนโหลดใหม่

    subjects[subject].forEach(student => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td><input type="text" id="grade-${student.id}" value="${student.grade}" disabled></td>
            <td>
                <button onclick="enableEdit('${subject}', '${student.id}')">แก้ไข</button>
                <button id="save-${student.id}" onclick="saveGrade('${subject}', '${student.id}')" disabled>บันทึก</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

// ฟังก์ชันเพื่อเปิดให้แก้ไขคะแนน
function enableEdit(subject, studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    gradeInput.disabled = false;

    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = false;
}

// ฟังก์ชันเพื่อบันทึกคะแนนและรีเฟรชข้อมูล
function saveGrade(subject, studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    gradeInput.disabled = true;

    const grade = gradeInput.value;
    updateGrade(subject, studentId, grade);

    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = true;

    // หลังจากบันทึกข้อมูลแล้ว รีโหลดข้อมูลทั้งหมดเพื่ออัปเดตตาราง
    loadStudentsForSubject(subject);
}

// ฟังก์ชันเพื่ออัปเดตคะแนนในอาร์เรย์ subjects และบันทึกใน localStorage
function updateGrade(subject, studentId, grade) {
    const student = subjects[subject].find(s => s.id === studentId);
    if (student) {
        student.grade = grade;
        saveSubjects();
    }
}

// ฟังก์ชันเพื่อบันทึกข้อมูลลงใน localStorage
function saveSubjects() {
    localStorage.setItem('subjects', JSON.stringify(subjects));
}

// เมื่อเลือกวิชา ให้โหลดข้อมูลนักเรียนในวิชานั้น
document.getElementById('subjectSelect').addEventListener('change', function() {
    const selectedSubject = this.value;
    loadStudentsForSubject(selectedSubject);
});

// โหลดข้อมูลวิชาเมื่อเปิดหน้า
loadSubjects();

// ---------------------------------------------------------------------------------------------

// ฟังก์ชันเพื่อบันทึกประวัติการแก้ไข
function saveEditHistory(subject, studentId, oldGrade, newGrade) {
    const user = JSON.parse(localStorage.getItem('currentUser')); // ดึงข้อมูลผู้ใช้ที่ล็อกอิน
    const timestamp = new Date().toLocaleString(); // เวลาปัจจุบัน

    const historyItem = {
        subject: subject,
        studentId: studentId,
        studentName: subjects[subject].find(s => s.id === studentId).name,
        oldGrade: oldGrade,
        newGrade: newGrade,
        editedBy: user.username, // ใช้ชื่อผู้ใช้จากการล็อกอิน
        timestamp: timestamp
    };

    let editHistory = JSON.parse(localStorage.getItem('editHistory')) || [];
    editHistory.push(historyItem);
    localStorage.setItem('editHistory', JSON.stringify(editHistory));
}

// ปรับปรุงฟังก์ชันเพื่อบันทึกคะแนนและบันทึกประวัติการแก้ไข
function saveGrade(subject, studentId) {
    let gradeInput = document.getElementById(`grade-${studentId}`);
    let oldGrade = subjects[subject].find(s => s.id === studentId).grade;
    let newGrade = gradeInput.value;

    gradeInput.disabled = true;

    if (oldGrade !== newGrade) {
        updateGrade(subject, studentId, newGrade);
        saveEditHistory(subject, studentId, oldGrade, newGrade); // บันทึกประวัติการแก้ไข
    }

    let saveButton = document.getElementById(`save-${studentId}`);
    saveButton.disabled = true;

    loadStudentsForSubject(subject);
}
