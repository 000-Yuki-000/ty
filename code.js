// auto-collect.js
// Version: 3.2
// Last updated: 2026-01-20

(function() {
    'use strict';
    
    console.log('🚀 Auto Collect v3.2 đã load từ server!');
    
    // ============ CONFIGURATION ============
    const CONFIG = {
        collectThreshold: 1.5,      // Ngưỡng để collect
        checkInterval: 100,         // Kiểm tra mỗi 1ms
        clickCooldown: 5000,        // Cooldown sau khi click
        loginDelay: 2000,           // Đợi autofill
        errorReloadDelay: 2000,     // Delay trước khi reload khi lỗi
    };
    
    let canClick = true;
    
    // ============ AUTO COLLECT ============
    function autoCollect() {
        const tikElement = document.getElementById('tik');
        const collectButton = document.querySelector('button[name="games_sbor"]');
        
        if (!tikElement || !collectButton || !canClick) {
            return;
        }
        
        const currentValue = parseFloat(tikElement.textContent.trim().replace(/,/g, ''));
        console.log('💰 Giá trị:', currentValue);
        
        if (currentValue >= CONFIG.collectThreshold) {
            console.log('✅ Đạt ' + CONFIG.collectThreshold + ' - Click COLLECT!');
            collectButton.click();
            canClick = false;
            setTimeout(() => { canClick = true; }, CONFIG.clickCooldown);
        }
    }
    
    // ============ INIT ============
    setTimeout(() => {
        if (handleLoginPage()) {
            console.log('📍 Trang login - Chờ đăng nhập...');
        } else {
            console.log('📍 Trang game - Auto collect bắt đầu!');
            console.log('⚙️ Ngưỡng collect:', CONFIG.collectThreshold);
            setInterval(autoCollect, CONFIG.checkInterval);
        }
    }, 2000);
    
    console.log('✅ Script sẵn sàng!');

})();

