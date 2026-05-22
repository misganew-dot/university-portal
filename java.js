document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('regform');
  const printBtn = document.getElementById('printBtn');
  const messageDiv = document.getElementById('message');

  const inputs = {
    firstName: document.getElementById('firstName'),
    middleName: document.getElementById('middleName'),
    lastName: document.getElementById('lastName'),
    dob: document.getElementById('dob'),
    photo: document.getElementById('photo'),
    studentId: document.getElementById('studentId'),
    program: document.getElementById('program'),
    dept: document.getElementById('dept'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    address: document.getElementById('address'),
    emergencyName: document.getElementById('emergencyName'),
    emergencyPhone: document.getElementById('emergencyPhone'),
    password: document.getElementById('password'),
    terms: document.getElementById('terms')
  };

  Object.keys(inputs).forEach(key => {
    if (inputs[key]) {
      const eventType = (inputs[key].type === 'select-one' || inputs[key].type === 'checkbox' || inputs[key].type === 'file' || inputs[key].type === 'date') ? 'change' : 'input';
      inputs[key].addEventListener(eventType, () => {
        clearError(key);
        if (messageDiv) messageDiv.style.display = "none";
      });
    }
  });

  document.querySelectorAll('input[name="gender"]').forEach(radio => {
    radio.addEventListener('change', () => clearError('gender'));
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      clearAllErrors();

      const nameRegex = /^[A-Za-z\s\u1200-\u137F]+$/;

      if (!inputs.firstName.value.trim() || !nameRegex.test(inputs.firstName.value.trim())) { showError('firstName', 'Invalid name.'); isValid = false; }
      if (!inputs.middleName.value.trim() || !nameRegex.test(inputs.middleName.value.trim())) { showError('middleName', 'Invalid name.'); isValid = false; }
      if (!inputs.lastName.value.trim() || !nameRegex.test(inputs.lastName.value.trim())) { showError('lastName', 'Invalid name.'); isValid = false; }
      if (!inputs.dob.value) { showError('dob', 'Required.'); isValid = false; }
      
      const genderChecked = document.querySelector('input[name="gender"]:checked');
      if (!genderChecked) { showError('gender', 'Required.'); isValid = false; }
      if (!inputs.photo.value) { showError('photo', 'Required.'); isValid = false; }

      const dkuIdRegex = /^[A-Za-z0-9\/]+$/;
      if (!inputs.studentId.value.trim() || !dkuIdRegex.test(inputs.studentId.value.trim())) { showError('studentId', 'Invalid ID.'); isValid = false; }
      if (!inputs.program.value) { showError('program', 'Required.'); isValid = false; }
      if (!inputs.dept.value) { showError('dept', 'Required.'); isValid = false; }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!inputs.email.value.trim() || !emailRegex.test(inputs.email.value.trim())) { showError('email', 'Invalid email.'); isValid = false; }

      const ethiopianPhoneRegex = /^(\+2519|\+2517|09|07)\d{8}$/;
      if (!inputs.phone.value.trim() || !ethiopianPhoneRegex.test(inputs.phone.value.trim())) { showError('phone', 'Invalid phone.'); isValid = false; }
      if (!inputs.emergencyPhone.value.trim() || !ethiopianPhoneRegex.test(inputs.emergencyPhone.value.trim())) { showError('emergencyPhone', 'Invalid phone.'); isValid = false; }

      if (!inputs.address.value.trim()) { showError('address', 'Required.'); isValid = false; }
      if (!inputs.emergencyName.value.trim()) { showError('emergencyName', 'Required.'); isValid = false; }
      if (inputs.password.value.length < 6) { showError('password', 'Minimum 6 characters.'); isValid = false; }
      if (!inputs.terms.checked) { showError('terms', 'Required.'); isValid = false; }

      if (isValid) {
        const fullName = `${inputs.firstName.value} ${inputs.middleName.value}`;
        
        // መረጃውን በብራውዘር ላይ ሴቭ ማድረጊያ (ለሎጊን)
        localStorage.setItem('savedStudentId', inputs.studentId.value.trim());
        localStorage.setItem('savedPassword', inputs.password.value);
        localStorage.setItem('savedFullName', fullName);

        if (messageDiv) {
          messageDiv.textContent = "Registration Successful! Redirecting to Login page...";
          messageDiv.style.backgroundColor = "#d1fae5";
          messageDiv.style.color = "#065f46";
          messageDiv.style.display = "block";
        }

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2500);
      }
    });
  }

  if (printBtn) { printBtn.addEventListener('click', () => { window.print(); }); }
  function showError(fieldId, msg) { const errorSpan = document.getElementById(`error-${fieldId}`); if (errorSpan) { errorSpan.textContent = msg; errorSpan.style.color = '#dc2626'; } }
  function clearError(fieldId) { const errorSpan = document.getElementById(`error-${fieldId}`); if (errorSpan) errorSpan.textContent = ''; }
  function clearAllErrors() { document.querySelectorAll('.error').forEach(err => err.textContent = ''); }
});