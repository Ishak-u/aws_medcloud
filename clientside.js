<script>
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const data = new URLSearchParams(formData);

    fetch('/login', {
      method: 'POST',
      body: data
  })
.then(response => response.text())
  .then(result => {
    if (result.trim() === 'Login successful!') {
      window.location.href = 'final interface.html';
    } else {
      loginMessage.textContent = result;
    }
  })
  .catch(error => {
    loginMessage.textContent = 'Error: ' + error;
  });
});