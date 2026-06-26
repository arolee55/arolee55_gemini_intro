document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. DOM Elements
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const header = document.querySelector('header');
  const customizerToggle = document.getElementById('customizer-toggle');
  const customizerClose = document.getElementById('customizer-close');
  const customizerDrawer = document.getElementById('customizer-drawer');
  const customizerOverlay = document.getElementById('customizer-overlay');
  
  // Customizer Input Elements
  const accent1Picker = document.getElementById('accent1-picker');
  const accent2Picker = document.getElementById('accent2-picker');
  const editLogo = document.getElementById('edit-logo');
  const editName = document.getElementById('edit-name');
  const editRoles = document.getElementById('edit-roles');
  const editTag = document.getElementById('edit-tag');
  const editAvatar = document.getElementById('edit-avatar');
  const editBio = document.getElementById('edit-bio');
  const editLongBio = document.getElementById('edit-long-bio');
  const editExperience = document.getElementById('edit-experience');
  const editProjects = document.getElementById('edit-projects');
  const editEmail = document.getElementById('edit-email');
  const editPhone = document.getElementById('edit-phone');
  const editLocation = document.getElementById('edit-location');
  
  const btnExportHTML = document.getElementById('export-html');
  const btnResetCustomizer = document.getElementById('reset-customizer');

  // DOM Display Elements to be updated
  const headerLogoText = document.getElementById('header-logo');
  const heroTagText = document.getElementById('hero-tag');
  const heroNameText = document.getElementById('hero-name');
  const heroBioText = document.getElementById('hero-bio');
  const heroAvatarImg = document.getElementById('hero-avatar');
  const aboutLongBioText = document.getElementById('about-long-bio');
  const statExperienceText = document.getElementById('stat-experience');
  const statProjectsText = document.getElementById('stat-projects');
  const contactEmailText = document.getElementById('contact-email');
  const contactPhoneText = document.getElementById('contact-phone');
  const contactLocationText = document.getElementById('contact-location');
  const footerCopyrightText = document.getElementById('footer-copyright');

  // Initial State Copy for Reset Functionality
  const defaultState = {
    accent1: '#a855f7',
    accent2: '#06b6d4',
    logo: 'Dev.Studio',
    name: '홍길동',
    roles: '크리에이티브 개발자, UX 엔지니어, 문제 해결사',
    tag: 'Welcome to my space',
    avatar: 'profile.jpg',
    bio: '사용자 중심의 가치를 코드로 구현하는 개발자입니다. 최신 웹 기술을 기반으로 직관적이고 아름다운 인터페이스를 설계하고 안정적인 웹 서비스를 구축합니다.',
    longBio: '저는 웹의 무한한 가능성을 신뢰하는 엔지니어입니다. 복잡한 문제를 간단하고 명쾌한 코드로 푸는 것을 좋아하며, 기술로 사람들의 일상을 더 편리하게 만드는 데 열정을 쏟고 있습니다. 웹 퍼포먼스 튜닝, 직관적인 UI 설계, 그리고 팀원들과의 원활한 상호 성장을 소중하게 여깁니다.',
    experience: '3+',
    projects: '30+',
    email: 'gildong@example.com',
    phone: '010-1234-5678',
    location: '대한민국 서울시 강남구'
  };

  // 3. Theme Toggle Functionality
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      updateThemeIcon(true);
    } else {
      document.body.classList.remove('light-theme');
      updateThemeIcon(false);
    }
  };

  const updateThemeIcon = (isLight) => {
    if (!themeIcon) return;
    if (isLight) {
      themeIcon.setAttribute('data-lucide', 'sun');
    } else {
      themeIcon.setAttribute('data-lucide', 'moon');
    }
    // Re-render the specific lucide icon
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  };

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
  });

  initTheme();

  // 4. Header Scroll Style Toggle
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 5. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);

  // 6. Typing Effect for Hero Subtitle
  let roles = defaultState.roles.split(',').map(r => r.trim());
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const roleTextEl = document.getElementById('hero-role-text');
  let typeSpeed = 100;
  let typingTimer = null;

  const typeRoles = () => {
    if (!roleTextEl) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      charIndex--;
      typeSpeed = 50;
    } else {
      charIndex++;
      typeSpeed = 120;
    }

    roleTextEl.textContent = currentRole.substring(0, charIndex);

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      // Pause before typing next word
      typeSpeed = 500;
    }

    typingTimer = setTimeout(typeRoles, typeSpeed);
  };

  typeRoles();

  const restartTypingEffect = (newRolesString) => {
    if (typingTimer) clearTimeout(typingTimer);
    roles = newRolesString.split(',').map(r => r.trim()).filter(r => r !== '');
    if (roles.length === 0) roles = ["개발자"];
    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    typeRoles();
  };

  // 7. Scroll Reveal Animation & Progress Bar Fills
  const reveals = document.querySelectorAll('.reveal');
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If the skills section is visible, animate progress bars
        if (entry.target.id === 'skills') {
          skillBars.forEach(bar => {
            bar.style.width = bar.getAttribute('data-percent');
          });
        }
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));

  // 8. Skill Tab Switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.skills-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deactivate all tabs & panels
      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Activate current tab & matching panel
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
        
        // Reset and animate bar fills inside the opened panel
        const subBars = targetPanel.querySelectorAll('.skill-bar-fill');
        subBars.forEach(bar => {
          bar.style.width = '0%';
          setTimeout(() => {
            bar.style.width = bar.getAttribute('data-percent');
          }, 50);
        });
      }
    });
  });

  // 9. Profile Customizer Drawer Logic
  const openCustomizer = () => {
    customizerDrawer.classList.add('open');
    customizerOverlay.classList.add('open');
  };

  const closeCustomizer = () => {
    customizerDrawer.classList.remove('open');
    customizerOverlay.classList.remove('open');
  };

  customizerToggle.addEventListener('click', openCustomizer);
  customizerClose.addEventListener('click', closeCustomizer);
  customizerOverlay.addEventListener('click', closeCustomizer);

  // 10. Live Updating DOM elements from Customizer
  const updateAccentColors = () => {
    const color1 = accent1Picker.value;
    const color2 = accent2Picker.value;
    document.documentElement.style.setProperty('--accent-1', color1);
    document.documentElement.style.setProperty('--accent-2', color2);
    document.documentElement.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${color1}, ${color2})`);
    document.documentElement.style.setProperty('--accent-shadow', `${color1}59`); // color1 + 35% opacity in hex (59)
  };

  accent1Picker.addEventListener('input', updateAccentColors);
  accent2Picker.addEventListener('input', updateAccentColors);

  editLogo.addEventListener('input', (e) => {
    headerLogoText.textContent = e.target.value;
    updateFooterCopyright();
  });
  
  editName.addEventListener('input', (e) => {
    heroNameText.textContent = e.target.value;
  });

  editRoles.addEventListener('input', (e) => {
    restartTypingEffect(e.target.value);
  });

  editTag.addEventListener('input', (e) => {
    heroTagText.textContent = e.target.value;
  });

  editAvatar.addEventListener('input', (e) => {
    heroAvatarImg.src = e.target.value;
  });

  editBio.addEventListener('input', (e) => {
    heroBioText.textContent = e.target.value;
  });

  editLongBio.addEventListener('input', (e) => {
    aboutLongBioText.textContent = e.target.value;
  });

  editExperience.addEventListener('input', (e) => {
    statExperienceText.textContent = e.target.value;
  });

  editProjects.addEventListener('input', (e) => {
    statProjectsText.textContent = e.target.value;
  });

  editEmail.addEventListener('input', (e) => {
    contactEmailText.textContent = e.target.value;
  });

  editPhone.addEventListener('input', (e) => {
    contactPhoneText.textContent = e.target.value;
  });

  editLocation.addEventListener('input', (e) => {
    contactLocationText.textContent = e.target.value;
  });

  const updateFooterCopyright = () => {
    const brand = editLogo.value || defaultState.logo;
    const currentYear = new Date().getFullYear();
    footerCopyrightText.innerHTML = `&copy; ${currentYear} ${brand}. All rights reserved.`;
  };

  // 11. Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('메시지가 성공적으로 전송되었습니다! (실제 포트폴리오 메일 연동을 원하신다면 Formspree 혹은 EmailJS 연동이 필요합니다)');
    contactForm.reset();
  });

  // 12. Reset Customizer Values
  const resetCustomizer = () => {
    accent1Picker.value = defaultState.accent1;
    accent2Picker.value = defaultState.accent2;
    updateAccentColors();

    editLogo.value = defaultState.logo;
    headerLogoText.textContent = defaultState.logo;

    editName.value = defaultState.name;
    heroNameText.textContent = defaultState.name;

    editRoles.value = defaultState.roles;
    restartTypingEffect(defaultState.roles);

    editTag.value = defaultState.tag;
    heroTagText.textContent = defaultState.tag;

    editAvatar.value = defaultState.avatar;
    heroAvatarImg.src = defaultState.avatar;

    editBio.value = defaultState.bio;
    heroBioText.textContent = defaultState.bio;

    editLongBio.value = defaultState.longBio;
    aboutLongBioText.textContent = defaultState.longBio;

    editExperience.value = defaultState.experience;
    statExperienceText.textContent = defaultState.experience;

    editProjects.value = defaultState.projects;
    statProjectsText.textContent = defaultState.projects;

    editEmail.value = defaultState.email;
    contactEmailText.textContent = defaultState.email;

    editPhone.value = defaultState.phone;
    contactPhoneText.textContent = defaultState.phone;

    editLocation.value = defaultState.location;
    contactLocationText.textContent = defaultState.location;

    updateFooterCopyright();
  };

  btnResetCustomizer.addEventListener('click', resetCustomizer);

  // 13. Export Clean HTML (Dynamic build)
  btnExportHTML.addEventListener('click', () => {
    // Clone document structure
    const docClone = document.documentElement.cloneNode(true);
    
    // Remove customizer parts
    const drawer = docClone.querySelector('#customizer-drawer');
    const overlay = docClone.querySelector('#customizer-overlay');
    const toggleBtn = docClone.querySelector('#customizer-toggle');
    if (drawer) drawer.remove();
    if (overlay) overlay.remove();
    if (toggleBtn) toggleBtn.remove();
    
    // Inject Custom Colors inside head style block
    const color1 = accent1Picker.value;
    const color2 = accent2Picker.value;
    const styleBlock = document.createElement('style');
    styleBlock.textContent = `
      :root {
        --accent-1: ${color1} !important;
        --accent-2: ${color2} !important;
        --accent-gradient: linear-gradient(135deg, ${color1}, ${color2}) !important;
        --accent-shadow: ${color1}59 !important;
      }
    `;
    docClone.querySelector('head').appendChild(styleBlock);

    // Clean up unnecessary scripts (like the customizer itself)
    // Or we keep app.js but we clean up the customizer elements in app.js
    // To ensure the exported file runs fine even without the customizer DOM elements, 
    // app.js handles null elements gracefully. So it will run fine!
    
    const htmlContent = '<!DOCTYPE html>\n' + docClone.outerHTML;
    
    // Trigger Download
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editName.value || 'portfolio'}_portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('성공적으로 HTML 파일이 내보내졌습니다! 다운로드 폴더를 확인해 보세요.');
  });

  // 14. Seoul 7-Day Weather Forecast Implementation
  const getWeatherDescription = (code) => {
    // WMO Weather interpretation codes (WW)
    const codes = {
      0: { desc: "맑음", icon: "sun" },
      1: { desc: "대체로 맑음", icon: "cloud-sun" },
      2: { desc: "구름 조금", icon: "cloud-sun" },
      3: { desc: "흐림", icon: "cloud" },
      45: { desc: "안개", icon: "cloud-drizzle" },
      48: { desc: "침적 안개", icon: "cloud-drizzle" },
      51: { desc: "가벼운 이슬비", icon: "cloud-drizzle" },
      53: { desc: "이슬비", icon: "cloud-drizzle" },
      55: { desc: "짙은 이슬비", icon: "cloud-drizzle" },
      61: { desc: "약한 비", icon: "cloud-rain" },
      63: { desc: "보통 비", icon: "cloud-rain" },
      65: { desc: "강한 비", icon: "cloud-heavy-rain" },
      71: { desc: "가벼운 눈", icon: "snowflake" },
      73: { desc: "눈", icon: "snowflake" },
      75: { desc: "강한 눈", icon: "snowflake" },
      77: { desc: "싸락눈", icon: "snowflake" },
      80: { desc: "약한 소나기", icon: "cloud-drizzle" },
      81: { desc: "소나기", icon: "cloud-rain" },
      82: { desc: "강한 소나기", icon: "cloud-heavy-rain" },
      85: { desc: "약한 눈 소나기", icon: "snowflake" },
      86: { desc: "강한 눈 소나기", icon: "snowflake" },
      95: { desc: "뇌우", icon: "cloud-lightning" },
      96: { desc: "뇌우 및 우박", icon: "cloud-lightning" },
      99: { desc: "강한 뇌우 및 우박", icon: "cloud-lightning" }
    };
    return codes[code] || { desc: "알 수 없음", icon: "cloud" };
  };

  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = days[date.getDay()];
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return {
      dayOfWeek: `${dayOfWeek}요일`,
      dateDisplay: `${month}/${day}`
    };
  };

  const fetchSeoulWeather = async () => {
    const loader = document.getElementById('weather-loader');
    const forecastGrid = document.getElementById('forecast-grid');
    const refreshBtnIcon = document.querySelector('#refresh-weather-btn i');
    
    if (refreshBtnIcon) refreshBtnIcon.classList.add('spinning');
    
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.5665&longitude=126.9780&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FSeoul');
      if (!res.ok) throw new Error('Weather data fetch failed');
      const data = await res.json();
      
      // Render current weather
      const currentTemp = Math.round(data.current_weather.temperature);
      const currentCode = data.current_weather.weathercode;
      const { desc: currentDesc, icon: currentIconName } = getWeatherDescription(currentCode);
      
      const currentTempEl = document.getElementById('current-temp');
      const currentDescEl = document.getElementById('current-desc');
      if (currentTempEl) currentTempEl.textContent = `${currentTemp}°C`;
      if (currentDescEl) currentDescEl.textContent = currentDesc;
      
      // Render icon
      const currentIconWrapper = document.getElementById('current-weather-icon');
      if (currentIconWrapper) {
        currentIconWrapper.innerHTML = `<i data-lucide="${currentIconName}" class="weather-icon-large"></i>`;
      }
      
      // Daily weather details for today (index 0)
      const todayMax = Math.round(data.daily.temperature_2m_max[0]);
      const todayMin = Math.round(data.daily.temperature_2m_min[0]);
      const todayPrecip = data.daily.precipitation_probability_max[0];
      
      const todayMaxEl = document.getElementById('today-max-temp');
      const todayMinEl = document.getElementById('today-min-temp');
      const todayPrecipEl = document.getElementById('today-precip');
      if (todayMaxEl) todayMaxEl.textContent = `${todayMax}°C`;
      if (todayMinEl) todayMinEl.textContent = `${todayMin}°C`;
      if (todayPrecipEl) todayPrecipEl.textContent = `${todayPrecip}%`;
      
      // Render 7-day forecast cards
      if (forecastGrid) {
        forecastGrid.innerHTML = '';
        
        for (let i = 0; i < 7; i++) {
          const dateStr = data.daily.time[i];
          const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
          const minTemp = Math.round(data.daily.temperature_2m_min[i]);
          const weatherCode = data.daily.weathercode[i];
          const precipProb = data.daily.precipitation_probability_max[i];
          
          const { dayOfWeek, dateDisplay } = formatDay(dateStr);
          const { desc, icon } = getWeatherDescription(weatherCode);
          
          const card = document.createElement('div');
          card.className = 'glass-panel forecast-card';
          card.innerHTML = `
            <div class="forecast-date">
              <div>${dayOfWeek}</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${dateDisplay}</div>
            </div>
            <div class="forecast-icon">
              <i data-lucide="${icon}" style="width: 28px; height: 28px;"></i>
            </div>
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);">${desc}</div>
            <div class="forecast-temp">
              <span class="forecast-temp-max">${maxTemp}°C</span>
              <span class="forecast-temp-min">${minTemp}°C</span>
            </div>
            <div class="forecast-precip">
              <i data-lucide="umbrella" style="width: 12px; height: 12px;"></i> ${precipProb}%
            </div>
          `;
          forecastGrid.appendChild(card);
        }
      }
      
      // Recreate lucide icons for newly added HTML elements
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    } catch (err) {
      console.error(err);
      if (forecastGrid) {
        forecastGrid.innerHTML = `
          <div class="weather-error">
            <i data-lucide="alert-triangle" style="width: 32px; height: 32px; color: var(--accent-1);"></i>
            <p>날씨 데이터를 불러오는데 실패했습니다. 네트워크를 확인해 주세요.</p>
          </div>
        `;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    } finally {
      if (refreshBtnIcon) {
        refreshBtnIcon.classList.remove('spinning');
      }
    }
  };

  const refreshWeatherBtn = document.getElementById('refresh-weather-btn');
  if (refreshWeatherBtn) {
    refreshWeatherBtn.addEventListener('click', fetchSeoulWeather);
  }

  // Initial Fetch
  fetchSeoulWeather();

  // 15. Tab Opener Feature
  const tabOpenerBtn    = document.getElementById('tab-opener-btn');
  const tabUrlInput     = document.getElementById('tab-url-input');
  const tabDelayInput   = document.getElementById('tab-delay-input');
  const tabLoopInput    = document.getElementById('tab-loop-input');
  const tabStatus       = document.getElementById('tab-opener-status');
  const tabStatusIcon   = document.getElementById('tab-opener-status-icon');
  const tabStatusMsg    = document.getElementById('tab-opener-status-msg');
  const tabLogList      = document.getElementById('tab-opener-log-list');
  const tabLogClearBtn  = document.getElementById('tab-log-clear-btn');

  // Helper: append a timestamped log entry
  const addLog = (message, type = 'info') => {
    if (!tabLogList) return;
    const now = new Date();
    const time = now.toLocaleTimeString('ko-KR', { hour12: false });
    const li = document.createElement('li');
    li.className = `log-item log-${type}`;
    li.textContent = `[${time}] ${message}`;
    tabLogList.appendChild(li);
    // Auto-scroll to bottom
    tabLogList.scrollTop = tabLogList.scrollHeight;
  };

  // Helper: update the status card appearance
  const setStatus = (message, type = 'loading', iconName = 'loader') => {
    if (!tabStatus) return;
    tabStatus.style.display = 'flex';
    tabStatus.className = 'tab-opener-status';
    if (type !== 'loading') tabStatus.classList.add(`status-${type}`);

    tabStatusIcon.innerHTML = `<i data-lucide="${iconName}" style="width:20px;height:20px;"></i>`;
    tabStatusMsg.textContent = message;

    if (typeof lucide !== 'undefined') lucide.createIcons();
  };

  if (tabOpenerBtn) {
    let countdownTimer = null;
    let currentLoopCount = 0;

    const stopOpener = (message = '반복 실행이 중지되었습니다.', type = 'warning', icon = 'x-circle') => {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
      tabOpenerBtn.innerHTML = '<i data-lucide="external-link" style="width:18px;height:18px;"></i> 반복 새 탭 열기 시작';
      setStatus(message, type, icon);
      if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    tabOpenerBtn.addEventListener('click', async () => {
      // If already running, stop it
      if (countdownTimer !== null) {
        stopOpener('반복 실행이 사용자에 의해 중지되었습니다.', 'warning', 'x-circle');
        addLog('중지됨: 사용자가 동작을 중지했습니다.', 'warning');
        return;
      }

      const url = tabUrlInput ? tabUrlInput.value.trim() : '';
      const delaySec = parseInt(tabDelayInput ? tabDelayInput.value : '3', 10) || 3;
      
      let maxLoop = parseInt(tabLoopInput ? tabLoopInput.value : '5', 10);
      if (isNaN(maxLoop) || maxLoop < 1) {
        maxLoop = 5;
      }

      // Validate URL
      if (!url) {
        setStatus('URL을 입력해 주세요.', 'error', 'alert-circle');
        addLog('오류: URL이 비어 있습니다.', 'error');
        return;
      }
      try { new URL(url); } catch {
        setStatus('유효하지 않은 URL 형식입니다.', 'error', 'alert-circle');
        addLog(`오류: 유효하지 않은 URL → ${url}`, 'error');
        return;
      }

      // Step 1: Open first tab immediately
      currentLoopCount = 1;
      addLog(`[시작] 새 탭 반복 열기 시작 (사용자 설정: 총 ${maxLoop}회)`, 'info');

      const openTab = () => {
        try {
          const newTab = window.open(url, '_blank');
          if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
            addLog(`오류: 브라우저 팝업 차단 감지 (${currentLoopCount}/${maxLoop})`, 'error');
            return false;
          }
          
          // Focus recovery attempt: Blur the newly opened tab and focus on self (parent window)
          try {
            newTab.blur();
          } catch (e) {
            // Might throw cross-origin errors on some browsers
          }
          window.focus();
          // Double guarantee via a slight delay
          setTimeout(() => {
            window.focus();
          }, 100);

          addLog(`✓ 새 탭 열기 성공 (${currentLoopCount}/${maxLoop}) → ${url}`, 'success');
          return true;
        } catch (err) {
          addLog(`오류: 새 탭 열기 실패 (${currentLoopCount}/${maxLoop}) - ${err.message}`, 'error');
          return false;
        }
      };

      const success = openTab();
      if (!success) {
        stopOpener('팝업이 차단되었습니다. 브라우저 주소창 우측에서 팝업을 허용해주세요.', 'error', 'shield-off');
        return;
      }

      // If only 1 loop is requested, finish immediately
      if (currentLoopCount >= maxLoop) {
        stopOpener(`반복 실행 완료! (총 ${maxLoop}회)`, 'success', 'check-circle-2');
        addLog(`[완료] 지정한 반복 횟수(${maxLoop}회)를 모두 채웠습니다.`, 'success');
        return;
      }

      // Start countdown timer for subsequent repeats
      let remainingSeconds = delaySec;

      const updateUI = () => {
        setStatus(`진행 중: ${currentLoopCount}/${maxLoop} 완료. 다음 탭까지 ${remainingSeconds}초...`, 'loading', 'timer');
        tabOpenerBtn.innerHTML = `<i data-lucide="x-circle" style="width:18px;height:18px;"></i> 정지 (${currentLoopCount}/${maxLoop})`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      };

      updateUI();

      countdownTimer = setInterval(() => {
        remainingSeconds--;
        if (remainingSeconds <= 0) {
          // Open next tab
          currentLoopCount++;
          const opened = openTab();

          if (!opened) {
            stopOpener('팝업 차단으로 인해 반복이 정지되었습니다. 주소창에서 팝업을 허용해 주세요.', 'error', 'shield-off');
            return;
          }

          if (currentLoopCount >= maxLoop) {
            stopOpener(`반복 실행 완료! (총 ${maxLoop}회)`, 'success', 'check-circle-2');
            addLog(`[완료] 지정한 반복 횟수(${maxLoop}회)를 모두 채웠습니다.`, 'success');
          } else {
            remainingSeconds = delaySec; // reset countdown for next loop
            updateUI();
          }
        } else {
          updateUI();
        }
      }, 1000);
    });
  }

  // Clear log
  if (tabLogClearBtn) {
    tabLogClearBtn.addEventListener('click', () => {
      if (tabLogList) {
        tabLogList.innerHTML = '<li class="log-item log-info">로그가 지워졌습니다.</li>';
      }
      if (tabStatus) tabStatus.style.display = 'none';
    });
  }
});
