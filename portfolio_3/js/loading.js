// Loading Animation Script
class LoadingAnimation {
    constructor() {
        // Check if loading has been shown in this session
        if (this.shouldShowLoading()) {
            this.createLoadingOverlay();
            this.showLoading();
            // Mark as shown for this session
            sessionStorage.setItem('loadingShown', 'true');
        }
    }

    shouldShowLoading() {
        // Only show loading if it hasn't been shown in this session
        return !sessionStorage.getItem('loadingShown');
    }

    createLoadingOverlay() {
        const loadingHTML = `
            <div id="loading-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #F5F2E8 0%, #FAF7F0 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.5s ease-out;
            ">
                <div class="floating-elements" style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    overflow: hidden;
                ">
                    <div class="floating-circle circle-1" style="
                        position: absolute;
                        width: 80px;
                        height: 80px;
                        top: 20%;
                        left: 10%;
                        border-radius: 50%;
                        background: rgba(21, 154, 156, 0.1);
                        animation: float 6s ease-in-out infinite;
                    "></div>
                    <div class="floating-circle circle-2" style="
                        position: absolute;
                        width: 60px;
                        height: 60px;
                        top: 60%;
                        right: 15%;
                        border-radius: 50%;
                        background: rgba(21, 154, 156, 0.1);
                        animation: float 6s ease-in-out infinite 2s;
                    "></div>
                    <div class="floating-circle circle-3" style="
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        bottom: 30%;
                        left: 20%;
                        border-radius: 50%;
                        background: rgba(21, 154, 156, 0.1);
                        animation: float 6s ease-in-out infinite 4s;
                    "></div>
                </div>
                
                <div class="loading-container" style="text-align: center; position: relative;">
                    <h1 class="loading-logo" style="
                        font-family: 'Noto Serif JP', serif;
                        font-size: 2.5rem;
                        font-weight: 300;
                        color: #002333;
                        margin-bottom: 2rem;
                        letter-spacing: 0.1em;
                        opacity: 0;
                        animation: fadeInDown 1s ease-out 0.3s forwards;
                    ">OKUDA Innovation</h1>
                    
                    <div class="loading-spinner" style="
                        width: 60px;
                        height: 60px;
                        margin: 0 auto 2rem;
                        position: relative;
                    ">
                        <div class="spinner-ring" style="
                            width: 100%;
                            height: 100%;
                            border: 3px solid #E5E7EB;
                            border-top: 3px solid #159A9C;
                            border-radius: 50%;
                            animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
                        "></div>
                    </div>
                    
                    <div class="loading-dots" style="
                        display: flex;
                        justify-content: center;
                        gap: 8px;
                        margin-bottom: 1.5rem;
                    ">
                        <div class="dot" style="
                            width: 8px;
                            height: 8px;
                            background: #159A9C;
                            border-radius: 50%;
                            animation: bounce 1.4s ease-in-out infinite both;
                            animation-delay: -0.32s;
                        "></div>
                        <div class="dot" style="
                            width: 8px;
                            height: 8px;
                            background: #159A9C;
                            border-radius: 50%;
                            animation: bounce 1.4s ease-in-out infinite both;
                            animation-delay: -0.16s;
                        "></div>
                        <div class="dot" style="
                            width: 8px;
                            height: 8px;
                            background: #159A9C;
                            border-radius: 50%;
                            animation: bounce 1.4s ease-in-out infinite both;
                        "></div>
                    </div>
                    
                    <p class="loading-text" style="
                        font-size: 0.9rem;
                        color: #6B7280;
                        letter-spacing: 0.05em;
                        opacity: 0;
                        animation: fadeIn 1s ease-out 0.8s forwards;
                    ">革新的なソリューションを準備中...</p>
                    
                    <div class="progress-bar" style="
                        width: 200px;
                        height: 2px;
                        background: #E5E7EB;
                        margin: 1.5rem auto 0;
                        border-radius: 1px;
                        overflow: hidden;
                    ">
                        <div class="progress-fill" style="
                            height: 100%;
                            background: linear-gradient(90deg, #159A9C, #002333);
                            border-radius: 1px;
                            animation: progressFill 2.5s ease-out infinite;
                        "></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        this.addLoadingStyles();
    }

    addLoadingStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes bounce {
                0%, 80%, 100% {
                    transform: scale(0);
                    opacity: 0.5;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes progressFill {
                0% {
                    width: 0%;
                    transform: translateX(-100%);
                }
                50% {
                    width: 100%;
                    transform: translateX(0%);
                }
                100% {
                    width: 100%;
                    transform: translateX(100%);
                }
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) scale(1);
                    opacity: 0.3;
                }
                50% {
                    transform: translateY(-20px) scale(1.1);
                    opacity: 0.6;
                }
            }
        `;
        document.head.appendChild(style);
    }

    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        
        // Hide loading after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, 1500); // Show for at least 1.5 seconds
        });
    }
}

// Initialize loading animation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LoadingAnimation();
    });
} else {
    new LoadingAnimation();
}