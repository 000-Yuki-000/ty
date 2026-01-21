// auto-collect.js
// Version: 3.2
// Last updated: 2026-01-20

(function() {
    'use strict';
    
    console.log('🚀 Auto Collect Script đã load!');
    document.querySelector('button[name="games_sbor"]').click();
    let hasClicked = false; // Cờ đánh dấu đã click
    let lastValue = 0; // Giá trị trước đó

    
    function autoCollect() {
        const tikElement = document.getElementById('tik');
        const collectButton = document.querySelector('button[name="games_sbor"]');
        
        if (!tikElement || !collectButton) {
            return;
        }
        
        const valueText = tikElement.textContent.trim().replace(/,/g, '');
        const currentValue = parseFloat(valueText);
        
        console.log('💰 Giá trị:', currentValue);
        
        // Chỉ click nếu:
        // 1. Chưa click lần nào (hasClicked = false)
        // 2. Giá trị >= 1.6
        // 3. Giá trị đang tăng (để tránh click ngay sau reload)
        if (!hasClicked && currentValue >= 1.5 && currentValue > lastValue) {
            console.log('✅ Đạt ngưỡng - Click COLLECT!');
            collectButton.click();
            hasClicked = true; // Đánh dấu đã click
        }
        
        // Reset cờ nếu giá trị giảm xuống dưới 1.0 (sau khi reload)
        if (currentValue < 1.0) {
            hasClicked = false;
        }
        
        lastValue = currentValue;
    }
    
    // Đợi page load xong
    setTimeout(() => {
        setInterval(autoCollect, 100); // Có thể để interval nhỏ hơn an toàn
    }, 2000);
})();

