document.addEventListener('DOMContentLoaded', () => {
  // 1. የነበረውን የተማሪ መረጃ ሰንጠረዥ ላይ ማሳየት
  const studentName = localStorage.getItem('savedFullName');
  const studentId = localStorage.getItem('savedStudentId');
  const tableBody = document.getElementById('studentTableBody');
  const totalStudentsCounter = document.getElementById('totalStudents');

  if (tableBody && studentName && studentId) {
    tableBody.innerHTML = `
      <tr>
        <td>${studentName}</td>
        <td>${studentId.toUpperCase()}</td>
        <td><span style="color: #059669; font-weight: bold;">Active</span></td>
        <td><button onclick="alert('የተማሪ ስም: ${studentName}\\nID: ${studentId}')" style="padding: 5px 10px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">View Profile</button></td>
      </tr>
    `;
    totalStudentsCounter.textContent = "1";
  }

  // 2. 🔥 የአድሚን ገጾች መቀያየሪያ ህግ (Tab Switching)
  const menuItems = document.querySelectorAll('.menu-item');
  const tabContents = document.querySelectorAll('.tab-content');

  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      menuItems.forEach(i => i.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      this.classList.add('active');
      const targetTabId = this.getAttribute('data-target');
      const targetTab = document.getElementById(targetTabId);
      if (targetTab) targetTab.classList.add('active');
    });
  });

  // 3. 🔥 Add New Course ፎርም ሲላክ (የሙከራ ስራ)
  const courseForm = document.getElementById('addCourseForm');
  if (courseForm) {
    courseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const code = document.getElementById('newCourseCode').value.toUpperCase();
      const title = document.getElementById('newCourseTitle').value;
      const credit = document.getElementById('newCourseCredit').value;

      // አዲሱን ኮርስ ማህደር (LocalStorage) ውስጥ መቅዳት
      localStorage.setItem('customCourseCode', code);
      localStorage.setItem('customCourseTitle', title);
      localStorage.setItem('customCourseCredit', credit);

      alert(`ኮርሱ በተሳካ ሁኔታ ታክሏል!\nCourse: ${code} - ${title}`);
      this.reset();
    });
  }

  // 4. 🔥 Grade Management ፎርም ሲላክ (የውጤት መሙያ)
  const gradeForm = document.getElementById('assignGradeForm');
  if (gradeForm) {
    gradeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const targetId = document.getElementById('gradeStudentId').value.trim().toLowerCase();
      const course = document.getElementById('gradeCourseCode').value;
      const grade = document.getElementById('assignedLetter').value;

      // አድሚኑ የሞላውን ውጤት በማህደር ማስቀመጥ
      localStorage.setItem(`grade_${targetId}_${course}`, grade);

      alert(`ውጤቱ ለተማሪ ቁጥር ${targetId.toUpperCase()} በትክክል ተመዝግቧል!`);
      this.reset();
    });
  }
});