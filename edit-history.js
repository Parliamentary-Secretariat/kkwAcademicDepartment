function loadEditHistory() {
    const editHistory = JSON.parse(localStorage.getItem('editHistory')) || [];
    const editHistoryTable = document.getElementById('editHistoryTable');

    editHistoryTable.innerHTML = ''; // ล้างข้อมูลเก่าก่อนโหลดใหม่

    editHistory.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.subject}</td>
            <td>${item.studentId}</td>
            <td>${item.studentName}</td>
            <td>${item.oldGrade}</td>
            <td>${item.newGrade}</td>
            <td>${item.editedBy}</td>
            <td>${item.timestamp}</td>
        `;
        editHistoryTable.appendChild(row);
    });
}

// โหลดประวัติการแก้ไขเมื่อเปิดหน้า
loadEditHistory();
