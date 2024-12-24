document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const allCards = document.querySelectorAll('.link-card');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        allCards.forEach(card => {
            const title = card.querySelector('.title').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
            
            card.style.display = isVisible ? 'flex' : 'none';
        });
    });

    // 侧边栏导航
    const sidebarLinks = document.querySelectorAll('.sidebar-section a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有活动状态
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // 添加当前活动状态
            this.classList.add('active');
        });
    });

    // 滚动时更新活动状态
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.category');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });
});
