document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const allCards = document.querySelectorAll('.platform-card');

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        allCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const isVisible = title.includes(searchTerm) || description.includes(searchTerm);
            
            card.style.display = isVisible ? 'flex' : 'none';
        });
    });

    // 分类导航功能
    const categoryItems = document.querySelectorAll('.category-item');
    const subcategoryPanel = document.querySelector('.subcategory-panel');
    const subcategoryContents = document.querySelectorAll('.subcategory-content');
    let currentCategory = null;
    let panelTimeout;

    // 显示分类面板
    function showPanel(category) {
        clearTimeout(panelTimeout);
        
        // 移除其他分类的激活状态
        categoryItems.forEach(item => item.classList.remove('active'));
        subcategoryContents.forEach(content => content.classList.remove('active'));
        
        // 激活当前分类
        category.classList.add('active');
        
        // 显示对应的二级分类内容
        const categoryId = category.dataset.category;
        const content = document.querySelector(`.subcategory-content[data-category="${categoryId}"]`);
        if (content) {
            content.classList.add('active');
        }
        
        // 显示面板
        subcategoryPanel.style.display = 'block';
        currentCategory = category;
    }

    // 隐藏分类面板
    function hidePanel() {
        panelTimeout = setTimeout(() => {
            if (!isMouseOverPanel) {
                subcategoryPanel.style.display = 'none';
                categoryItems.forEach(item => item.classList.remove('active'));
                currentCategory = null;
            }
        }, 200);
    }

    // 处理分类项的鼠标事件
    categoryItems.forEach(category => {
        category.addEventListener('mouseenter', () => showPanel(category));
        category.addEventListener('mouseleave', hidePanel);
    });

    // 处理面板的鼠标事件
    let isMouseOverPanel = false;
    subcategoryPanel.addEventListener('mouseenter', () => {
        isMouseOverPanel = true;
        clearTimeout(panelTimeout);
    });

    subcategoryPanel.addEventListener('mouseleave', () => {
        isMouseOverPanel = false;
        hidePanel();
    });

    // 移动端适配：点击事件
    if (window.innerWidth <= 768) {
        categoryItems.forEach(category => {
            category.addEventListener('click', (e) => {
                e.preventDefault();
                const content = document.querySelector(`.subcategory-content[data-category="${category.dataset.category}"]`);
                if (content) {
                    content.style.display = content.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }
});
