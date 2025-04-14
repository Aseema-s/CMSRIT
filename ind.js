tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#8A2BE2',
          secondary: '#FF69B4',
        },
        borderRadius: {
          'none': '0px',
          'sm': '4px',
          DEFAULT: '8px',
          'md': '12px',
          'lg': '16px',
          'xl': '20px',
          '2xl': '24px',
          '3xl': '32px',
          'full': '9999px',
          'button': '8px',
        },
      },
    },
  };
  document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    const passwordIcon = document.getElementById('passwordIcon');
    
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        
        if (type === 'text') {
            passwordIcon.classList.remove('ri-eye-line');
            passwordIcon.classList.add('ri-eye-off-line');
        } else {
            passwordIcon.classList.remove('ri-eye-off-line');
            passwordIcon.classList.add('ri-eye-line');
        }
    });
});  