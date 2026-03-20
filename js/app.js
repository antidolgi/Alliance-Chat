// js/app.js

// Плавный скролл к секции
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Мобильное меню
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Отправка демо-сообщения
function sendDemoMessage() {
  const nickname = document.getElementById('demoNickname').value.trim();
  const message = document.getElementById('demoMessage').value.trim();
  const chatMessages = document.getElementById('demoChatMessages');
  const sendBtn = document.getElementById('demoSendBtn');
  
  if (!nickname || !message) {
    showNotification('⚠️ Введите ник и сообщение', 'error');
    return;
  }
  
  sendBtn.disabled = true;
  sendBtn.textContent = '⏳';
  
  // Имитация отправки
  setTimeout(() => {
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.innerHTML = `
      <div class="meta">
        <span class="nickname">${escapeHtml(nickname)}</span>
        <span class="timestamp">${time}</span>
        <span class="platform">[Website]</span>
      </div>
      <div class="content">${escapeHtml(message)}</div>
    `;
    
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    document.getElementById('demoMessage').value = '';
    sendBtn.disabled = false;
    sendBtn.textContent = '➤ Отправить';
    
    showNotification('✅ Сообщение отправлено в демо-чат', 'success');
    
    // Имитация ответа через 3 секунды
    setTimeout(() => {
      const responseEl = document.createElement('div');
      responseEl.className = 'message';
      responseEl.innerHTML = `
        <div class="meta">
          <span class="nickname">SystemBot</span>
          <span class="timestamp">${new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
          <span class="platform">[System]</span>
        </div>
        <div class="content">В реальной версии это сообщение ушло бы в Telegram/VK и вернулось обратно!</div>
      `;
      chatMessages.appendChild(responseEl);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 3000);
    
  }, 500);
}

// Отправка формы контактов
function submitContactForm(event) {
  event.preventDefault();
  
  const form = document.getElementById('contactForm');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Здесь можно добавить реальную отправку на сервер
  // Пока просто имитация
  console.log('Заявка:', data);
  
  showNotification('✅ Заявка отправлена! Мы свяжемся с вами в течение 24 часов', 'success');
  form.reset();
}

// Уведомления
function showNotification(text, type = 'success') {
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notificationText');
  
  notificationText.textContent = text;
  notification.style.background = type === 'error' ? 'var(--danger)' : 'var(--success)';
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 4000);
}

// Экранирование HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Обработка Enter в поле сообщения демо
document.addEventListener('DOMContentLoaded', () => {
  const demoMessage = document.getElementById('demoMessage');
  if (demoMessage) {
    demoMessage.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendDemoMessage();
      }
    });
  }
  
  // Закрытие мобильного меню при клике на ссылку
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-menu').style.display = 'none';
    });
  });
});

// Анимация при скролле
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.feature-card, .problem-card, .pricing-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
});
