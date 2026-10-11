/**
 * Siwat Teimtad - Economist Portfolio
 * Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    });
  }

  // 2. Email Copy with Feedback Toast
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = 'dx@outlook.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copied to clipboard: ' + email);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Email copied to clipboard: ' + email);
      }
    });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // 3. Logo Fallback Handling
  const logos = document.querySelectorAll('img.brand-logo');
  logos.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
      const fallbackBadge = document.createElement('span');
      fallbackBadge.className = 'brand-logo';
      fallbackBadge.style.display = 'inline-flex';
      fallbackBadge.style.alignItems = 'center';
      fallbackBadge.style.justifyContent = 'center';
      fallbackBadge.style.background = '#11141e';
      fallbackBadge.style.color = '#38bdf8';
      fallbackBadge.style.fontSize = '0.75rem';
      fallbackBadge.style.fontWeight = '700';
      fallbackBadge.textContent = 'ST';
      if (img.parentNode) {
        img.parentNode.insertBefore(fallbackBadge, img);
      }
    });
  });

  // 4. Smooth Anchor Link Highlighting
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
});
