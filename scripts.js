// 折叠菜单切换函数
function toggleAccordion(container) {
    const content = container.nextElementSibling;
    const isActive = container.classList.contains('active');

    // 切换内容的显示状态
    content.style.display = isActive ? 'none' : 'block';
    container.classList.toggle('active');
}

// 语言切换功能
function switchLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang); // 保存用户选择的语言到本地存储
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });

    // 更新所有导航链接中的语言参数
    document.querySelectorAll('nav a').forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('lang', lang);
        link.href = url.toString();
    });

    // 更新当前页面 URL 参数
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('lang', lang);
    window.history.replaceState(null, null, currentUrl.toString());
}

// 显示大图功能
function showLightbox(imageSrc, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxDescription = document.getElementById('lightbox-description');

    lightboxImage.src = imageSrc;
    lightboxDescription.textContent = description;
    lightbox.classList.remove('fade-out');
    lightbox.classList.add('fade-in');
    lightbox.style.display = 'flex';
}

// 关闭大图功能
function closeLightbox(event = null) {
    const lightbox = document.getElementById('lightbox');
    if (!event || event.target === lightbox || event.target.classList.contains('close-btn')) {
        lightbox.classList.remove('fade-in');
        lightbox.classList.add('fade-out');
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300); // 动画时间应与CSS中的animation时间一致
    }
}

// 给大图容器添加点击事件，确保点击图片外的部分关闭大图
document.getElementById('lightbox').addEventListener('click', function(event) {
    if (event.target === this) {
        closeLightbox(event);
    }
});

// 默认语言切换调用
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const savedLanguage = urlParams.get('lang') || localStorage.getItem('preferredLanguage') || 'en'; // 获取URL参数或本地存储中的语言设置，默认为英语
    switchLanguage(savedLanguage);
});

// 在不同页面之间保持语言一致
document.querySelectorAll('.language-switch button').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('onclick').match(/switchLanguage\('(\w+)'\)/)[1];
        switchLanguage(lang);
    });
});
