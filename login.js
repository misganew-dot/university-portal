document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const inputId = document.getElementById('studentId').value.trim().toLowerCase();
      const inputPassword = document.getElementById('password').value;

      // 🔥 1. የአድሚን/ሬጅስትራር መግቢያ ሚስጥር (Admin Credentials)
      if (inputId === 'admin123' && inputPassword === 'adminpass') {
        window.location.href = 'admin.html';
        return; // እዚህ ላይ ኮዱን ያቆማል
      }

      // 2. የተማሪ መረጃዎችን ከማህደር መፈለግ
      const savedId = localStorage.getItem('savedStudentId');
      const savedPassword = localStorage.getItem('savedPassword');

      // 3. የተማሪውን መረጃ ማመሳከር
      if (savedId && inputId === savedId.toLowerCase() && inputPassword === savedPassword) {
        window.location.href = 'dashboard.html';
      } else {
        alert("ስህተት፡ ያስገቡት ID ወይም ፓስወርድ አልተገኘም! (ለአድሚን መግቢያ admin123 እና adminpass ይጠቀሙ)");
      }
    });
  }
});