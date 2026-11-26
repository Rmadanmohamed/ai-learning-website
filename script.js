// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add click events to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Let the browser handle normal page links and cross-page anchors.
        if (!href || !href.startsWith('#') || href === '#') return;
        const targetId = href.substring(1);
        if (!document.getElementById(targetId)) return;
        e.preventDefault();
        scrollToSection(targetId);
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.tech-particles');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Interactive neural network animation
function animateNeuralNetwork() {
    const neurons = document.querySelectorAll('.neuron');
    neurons.forEach((neuron, index) => {
        setTimeout(() => {
            neuron.style.animation = 'neuronPulse 2s infinite';
            neuron.style.animationDelay = `${index * 0.2}s`;
        }, index * 200);
    });
}

// Trigger neural network animation when section is visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('neural-network')) {
                animateNeuralNetwork();
            }
        }
    });
}, observerOptions);

// Observe neural network section
const neuralNetwork = document.querySelector('.neural-network');
if (neuralNetwork) {
    observer.observe(neuralNetwork);
}

// Card hover effects with 3D transform
document.querySelectorAll('.card, .dl-card, .model-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Chatbot functionality
class AILearningChatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendButton');
        this.isTyping = false;
        
        this.responses = {
            'machine learning': 'Machine Learning هو فرع من الذكاء الاصطناعي يمكّن الحاسوب من التعلم والتحسن من التجربة دون برمجة صريحة. يشمل التعلم المُشرف عليه، غير المُشرف عليه، والتعلم المعزز.',
            'deep learning': 'Deep Learning هو جزء من Machine Learning يستخدم الشبكات العصبية العميقة لمحاكاة طريقة عمل الدماغ البشري. يُستخدم في الرؤية الحاسوبية، معالجة اللغة الطبيعية، والتعرف على الصوت.',
            'artificial intelligence': 'الذكاء الاصطناعي (AI) هو محاكاة الذكاء البشري في الآلات. يشمل التعلم، التفكير، حل المشاكل، الإدراك، واللغة. يُستخدم في الروبوتات، الألعاب، والأنظمة الخبيرة.',
            'neural networks': 'الشبكات العصبية هي نماذج حاسوبية مستوحاة من الدماغ البشري. تتكون من عقد (neurons) مترابطة تعالج المعلومات. تُستخدم في التصنيف، التنبؤ، والتعرف على الأنماط.',
            'cnn': 'شبكات CNN مخصصة لمعالجة البيانات الشبكية مثل الصور. تستخدم طبقات التطبيق (convolution) والتجميع (pooling) لاستخراج الميزات المهمة من الصور.',
            'rnn': 'شبكات RNN مناسبة للبيانات التسلسلية مثل النصوص والسلاسل الزمنية. لديها ذاكرة تمكنها من تذكر المعلومات السابقة واستخدامها في التنبؤات الحالية.',
            'gpt': 'GPT (Generative Pre-trained Transformer) هو نموذج لغوي متقدم يستخدم بنية Transformer. يمكنه فهم وإنتاج النصوص بطريقة طبيعية ومتماسكة.',
            'transformer': 'نماذج Transformer ثورة في معالجة اللغة الطبيعية. تستخدم آلية الانتباه (attention) لفهم العلاقات بين الكلمات في النص بشكل أفضل من النماذج السابقة.',
            'supervised learning': 'التعلم المُشرف عليه يستخدم بيانات مُصنفة لتدريب النموذج. يشمل خوارزميات مثل Linear Regression، Decision Trees، وSVM للتصنيف والتنبؤ.',
            'unsupervised learning': 'التعلم غير المُشرف عليه يكتشف الأنماط في البيانات غير المُصنفة. يشمل التجميع (clustering)، تقليل الأبعاد، وقواعد الارتباط.',
            'reinforcement learning': 'التعلم المعزز يتعلم من خلال التفاعل مع البيئة والحصول على مكافآت أو عقوبات. يُستخدم في الألعاب، الروبوتات، والقيادة الذاتية.',
            'python': 'Python هي لغة البرمجة الأكثر شعبية في مجال الذكاء الاصطناعي. توفر مكتبات قوية مثل TensorFlow، PyTorch، Scikit-learn، وPandas.',
            'tensorflow': 'TensorFlow هو إطار عمل مفتوح المصدر من Google لتطوير نماذج التعلم الآلي والذكاء الاصطناعي. يدعم التدريب على وحدات معالجة الرسوميات (GPU).',
            'pytorch': 'PyTorch هو إطار عمل للتعلم العميق من Facebook. يتميز بسهولة الاستخدام والمرونة في بناء النماذج المعقدة.',
            'data science': 'علم البيانات يجمع بين الإحصاء، البرمجة، والمعرفة المجالية لاستخراج رؤى من البيانات. يشمل جمع البيانات، التنظيف، التحليل، والتصور.',
            'algorithm': 'الخوارزمية هي مجموعة من التعليمات المحددة لحل مشكلة معينة. في الذكاء الاصطناعي، نستخدم خوارزميات مختلفة للتعلم والتنبؤ.',
            'overfitting': 'Overfitting يحدث عندما يتعلم النموذج البيانات التدريبية بشكل مفرط ولا يعمم جيداً على بيانات جديدة. يمكن تجنبه باستخدام تقنيات التنظيم (regularization).',
            'gradient descent': 'Gradient Descent هو خوارزمية تحسين تُستخدم لتدريب النماذج. تعمل على تقليل دالة الخطأ تدريجياً للوصول إلى أفضل قيم للمعاملات.',
            'feature engineering': 'هندسة الميزات هي عملية اختيار وتحويل وإنشاء ميزات جديدة من البيانات الخام لتحسين أداء النموذج.',
            'cross validation': 'التحقق المتقاطع هو تقنية لتقييم أداء النموذج عبر تقسيم البيانات إلى مجموعات فرعية للتدريب والاختبار بطرق مختلفة.',
            'hello': 'مرحباً! أنا مساعدك الذكي في تعلم الذكاء الاصطناعي. يمكنني الإجابة على أسئلتك حول Machine Learning، Deep Learning، والذكاء الاصطناعي. ما الذي تريد أن تتعلمه اليوم؟',
            'hi': 'أهلاً وسهلاً! كيف يمكنني مساعدتك في رحلة تعلم الذكاء الاصطناعي؟',
            'help': 'يمكنني مساعدتك في فهم المفاهيم التالية:\n• Machine Learning\n• Deep Learning\n• Neural Networks\n• Python للذكاء الاصطناعي\n• خوارزميات التعلم\n• معالجة البيانات\n\nاسأل عن أي موضوع تريد تعلمه!',
            'thanks': 'عفواً! سعيد لمساعدتك. إذا كان لديك أي أسئلة أخرى حول الذكاء الاصطناعي، لا تتردد في السؤال!',
            'thank you': 'العفو! أتمنى أن تكون المعلومات مفيدة. استمر في التعلم والاستكشاف!'
        };
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (message && !this.isTyping) {
            this.addMessage(message, 'user');
            this.chatInput.value = '';
            this.processMessage(message);
        }
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    processMessage(message) {
        this.isTyping = true;
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message.toLowerCase());
            this.typeMessage(response);
        }, 1500);
    }
    
    generateResponse(message) {
        // Check for exact matches first
        for (const [key, response] of Object.entries(this.responses)) {
            if (message.includes(key)) {
                return response;
            }
        }
        
        // Default responses for common patterns
        if (message.includes('what') || message.includes('ما') || message.includes('ماذا')) {
            return 'يمكنني شرح أي مفهوم في الذكاء الاصطناعي. جرب أن تسأل عن: Machine Learning، Deep Learning، Neural Networks، أو أي موضوع آخر تريد تعلمه!';
        }
        
        if (message.includes('how') || message.includes('كيف')) {
            return 'لتعلم الذكاء الاصطناعي بشكل فعال:\n1. ابدأ بأساسيات الرياضيات والإحصاء\n2. تعلم Python وMath libraries\n3. افهم خوارزميات Machine Learning\n4. مارس على مشاريع حقيقية\n5. تابع أحدث التطورات في المجال';
        }
        
        if (message.includes('learn') || message.includes('تعلم') || message.includes('دراسة')) {
            return 'رائع! التعلم المستمر هو مفتاح النجاح في الذكاء الاصطناعي. ما الموضوع المحدد الذي تريد التركيز عليه؟ Machine Learning؟ Deep Learning؟ أم شيء آخر؟';
        }
        
        // Default response
        return 'سؤال ممتاز! لكن يمكنني تقديم معلومات أكثر تفصيلاً إذا سألت عن موضوع محدد مثل Machine Learning، Deep Learning، Neural Networks، أو أي مفهوم آخر في الذكاء الاصطناعي.';
    }
    
    typeMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        this.chatMessages.appendChild(messageDiv);
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                messageContent.textContent += text.charAt(i);
                i++;
                this.scrollToBottom();
            } else {
                clearInterval(typeInterval);
                this.isTyping = false;
            }
        }, 30);
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="loading"></div>
                جاري الكتابة...
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AILearningChatbot();
});

// Open chatbot function
function openChatbot() {
    const chatbotSection = document.getElementById('chatbot');
    if (chatbotSection) {
        chatbotSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Focus on chat input after scrolling
        setTimeout(() => {
            const chatInput = document.getElementById('chatInput');
            if (chatInput) {
                chatInput.focus();
            }
        }, 1000);
    }
}

// Dynamic background particles
function createParticles() {
    const particlesContainer = document.querySelector('.tech-particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite linear;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
window.addEventListener('load', createParticles);

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        if (isNaN(target)) return;
        
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/[0-9]+/, target);
                clearInterval(timer);
            } else {
                counter.textContent = counter.textContent.replace(/[0-9]+/, Math.floor(current));
            }
        }, 20);
    });
}

// Trigger counter animation when models section is visible
const modelsSection = document.getElementById('models');
if (modelsSection) {
    const modelsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                modelsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    modelsObserver.observe(modelsSection);
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            
            // Remove loading class after animation
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});

// Progressive loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
window.addEventListener('load', lazyLoadImages);

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.tech-particles');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 16)); // ~60fps

console.log('🚀 AI Learning Hub initialized successfully!');
console.log('🧠 Ready to explore the world of Artificial Intelligence!');
console.log('💡 Features loaded: Animations, Chatbot, Interactive Elements');