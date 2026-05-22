document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentIdInput = document.getElementById('studentId').value.trim();
      const passwordInput = document.getElementById('password').value.trim();

      // 1. መጀመሪያ አድሚን መሆኑን ማረጋገጥ (ይህ ሚስጥር ነው፣ alert ውስጥ አይፃፍም!)
      if (studentIdInput === 'admin123' && passwordInput === 'adminpass') {
        window.location.href = 'admin.html';
        return;
      }

      // 2. ተማሪው በማህደር (LocalStorage) መኖሩን መፈለግ
      const savedId = localStorage.getItem('savedStudentId');
      const savedPassword = localStorage.getItem('savedPassword');

      if (savedId && studentIdInput.toLowerCase() === savedId.toLowerCase() && passwordInput === savedPassword) {
        // መረጃው ልክ ከሆነ ወደ ተማሪ ዳሽቦርድ ማስገባት
        window.location.href = 'dashboard.html';
      } else {
        // 🔥 ስህተት ከሆነ ለተማሪው የሚመጣው ንፁህ መልዕክት (የአድሚን ሚስጥር እዚህ አይጠቀስም!)
        alert('ስህተት፡ ያስገቡት የተማሪ ID ቁጥር ወይም ፓስወርድ ትክክል አይደለም። እባክዎ እንደገና ይሞክሩ!');
      }
    });
  }
});