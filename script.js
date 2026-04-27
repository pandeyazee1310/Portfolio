// ===== TYPING EFFECT =====
const words = ["Developer", "Learner", "Engineer"];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
  current = words[i];

  document.querySelector(".typing").innerHTML =
    current.substring(0, j) + "|";

  if (!isDeleting && j < current.length) {
    j++;
  } else if (isDeleting && j > 0) {
    j--;
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) i = (i + 1) % words.length;
  }

  setTimeout(type, 150);
}
type();


// ===== DARK / LIGHT MODE =====
function toggleMode() {
  document.body.classList.toggle("dark");

  // Icon remains the same for both modes
}

// ===== BACK TO TOP BUTTON =====
const btn = document.getElementById("topBtn");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
};

function scrollTopBtn() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// ===== EMAILJS CONTACT FORM =====
(function() {
  // Initialize EmailJS with your public key
  emailjs.init("RevpHAw_E5LtACk6o");
})();

// Handle form submission - wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get form data
      const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      // Send email using EmailJS
      emailjs.send('service_ducopyl', 'template_1e5t3nx', formData)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          showCustomMessage('Message sent successfully! Thank you for contacting me.', 'success');
          // Reset form
          document.getElementById('contact-form').reset();
        }, function(error) {
          console.log('FAILED...', error);
          showCustomMessage('Failed to send message. Please try again.', 'failed');
        });
    });
  }
});

// Custom message display function (replaces browser alerts)
function showCustomMessage(message, type) {
  // Remove any existing message
  const existingMessage = document.querySelector('.custom-notification');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message container
  const messageDiv = document.createElement('div');
  messageDiv.className = `custom-notification ${type}`;
  messageDiv.textContent = message;

  // Professional styling - Top position
  messageDiv.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    padding: 14px 24px;
    border-radius: 6px;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    z-index: 10000;
    max-width: 600px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    animation: slideInTop 0.3s ease-out;
  `;

  // Type-specific styling
  if (type === 'success') {
    messageDiv.style.background = '#10b981';
    messageDiv.style.color = 'white';
  } else if (type === 'failed') {
    messageDiv.style.background = '#ef4444';
    messageDiv.style.color = 'white';
  }

  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInTop {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  if (!document.querySelector('style[data-custom-message-animation]')) {
    style.setAttribute('data-custom-message-animation', 'true');
    document.head.appendChild(style);
  }

  // Add to page
  document.body.appendChild(messageDiv);

  // Auto remove after 4 seconds
  setTimeout(() => {
    messageDiv.style.animation = 'slideInTop 0.3s ease-in reverse';
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 300);
  }, 4000);
}