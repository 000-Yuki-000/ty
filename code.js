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
    
    // ============ AUTO LOGIN ============
    function triggerAutofill() {
        const usernameInput = document.querySelector('input[type="text"], input[name*="user"], input[name*="email"], input[name*="login"]');
        const passwordInput = document.querySelector('input[type="password"]');
        
        if (usernameInput && passwordInput) {
            console.log('🔄 Trigger autofill...');
            usernameInput.focus();
            usernameInput.click();
            
            setTimeout(() => {
                passwordInput.focus();
                passwordInput.click();
            }, 300);
            
            return { usernameInput, passwordInput };
        }
        return null;
    }
    
    function handleLoginPage() {
        const loginButton = document.querySelector('button[name="sub_aut"]');
        
        if (loginButton) {
            console.log('🔐 Phát hiện trang login!');
            const inputs = triggerAutofill();
            
            setTimeout(() => {
                if (inputs && inputs.passwordInput.value) {
                    console.log('✅ Autofill đã điền - Click login!');
                    loginButton.click();
                } else {
                    console.log('⏳ Chưa có mật khẩu - Trigger lại...');
                    triggerAutofill();
                    
                    setTimeout(() => {
                        if (inputs && inputs.passwordInput.value) {
                            console.log('✅ Click login!');
                            loginButton.click();
                        } else {
                            console.log('⚠️ Thử click login anyway...');
                            loginButton.click();
                        }
                    }, 3000);
                }
            }, CONFIG.loginDelay);
            
            return true;
        }
        return false;
    }
    
    // ============ ERROR HANDLER ============
    const observer = new MutationObserver(() => {
        const bodyText = document.body.innerText;
        if (bodyText.includes('ERR_NETWORK_CHANGED') || 
            bodyText.includes('ERR_PROXY') ||
            bodyText.includes('ERR_CACHE_MISS')) {
            console.log('⚠️ Lỗi - Reload sau ' + (CONFIG.errorReloadDelay/1000) + ' giây...');
            setTimeout(() => location.reload(), CONFIG.errorReloadDelay);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
    
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
