document.addEventListener('DOMContentLoaded', () => {
  // 1. የገባውን ተማሪ ስም እና ID ከማህደር መውሰድ
  const studentName = localStorage.getItem('savedFullName') || 'Student';
  const studentId = localStorage.getItem('savedStudentId') || '';

  const welcomeText = document.querySelector('.main-header h2');
  const idBadge = document.querySelector('.user-profile');
  const gradeTableBody = document.querySelector('#view-grades tbody');
  const courseTableBody = document.querySelector('#main-dashboard table tbody');

  if (welcomeText) welcomeText.textContent = `Welcome Back, ${studentName}!`;
  if (idBadge && studentId) idBadge.textContent = `ID: ${studentId.toUpperCase()}`;

  // -----------------------------------------------------------------
  // 🔥 2. አድሚኑ የሞላውን ውጤት (Grade) ለተማሪው ማሳያ ክፍል (View Grades)
  // -----------------------------------------------------------------
  if (gradeTableBody && studentId) {
    const lowerId = studentId.toLowerCase();

    // አድሚኑ የሞላቸውን ውጤቶች ከማህደር መፈለግ (ከሌሉ Default ውጤት ይሰጣል)
    const gradeCS = localStorage.getItem(`grade_${lowerId}_CoSc1011`) || 'A';
    const gradeMath = localStorage.getItem(`grade_${lowerId}_Math1012`) || 'A-';
    const gradeEng = localStorage.getItem(`grade_${lowerId}_EnLa1011`) || 'B+';

    // የተማሪውን የውጤት ሰንጠረዥ በአድሚኑ ውጤት መተካት
    gradeTableBody.innerHTML = `
      <tr><td>CoSc1011</td><td>Introduction to Computer Science</td><td>3</td><td><strong>${gradeCS}</strong></td><td>${gradeCS === 'F' ? '<span style="color:red;">Failed</span>' : 'Passed'}</td></tr>
      <tr><td>Math1012</td><td>Freshman Mathematics</td><td>4</td><td><strong>${gradeMath}</strong></td><td>${gradeMath === 'F' ? '<span style="color:red;">Failed</span>' : 'Passed'}</td></tr>
      <tr><td>EnLa1011</td><td>Communicative English Skills</td><td>3</td><td><strong>${gradeEng}</strong></td><td>${gradeEng === 'F' ? '<span style="color:red;">Failed</span>' : 'Passed'}</td></tr>
    `;
  }

  // -----------------------------------------------------------------
  // 🔥 3. አድሚኑ የጨመረውን አዲስ ኮርስ ለተማሪው ማሳያ ክፍል (Dashboard)
  // -----------------------------------------------------------------
  if (courseTableBody) {
    const customCode = localStorage.getItem('customCourseCode');
    const customTitle = localStorage.getItem('customCourseTitle');
    const customCredit = localStorage.getItem('customCourseCredit');

    // አድሚኑ አዲስ ኮርስ ጨምሮ ከሆነ በዋናው ገጽ ሰንጠረዥ ስር እንዲታይ ማድረግ
    if (customCode && customTitle && customCredit) {
      // የነበሩትን ኮርሶች ሳናጠፋ አዲሱን ከታች መጨመር
      courseTableBody.innerHTML += `
        <tr style="background-color: #f0fdf4;">
          <td><span style="background:#22c55e; color:white; padding:2px 5px; border-radius:3px; font-size:10px; margin-right:5px;">NEW</span>${customCode}</td>
          <td>${customTitle}</td>
          <td>${customCredit}</td>
        </tr>
      `;
    }
  }

  // 4. የገጾች መቀያየሪያ (Tabs Logic)
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
});