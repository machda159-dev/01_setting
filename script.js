// 모바일 햄버거 메뉴 토글 로직
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// 메뉴 링크 클릭 시 메뉴 닫기 (모바일 환경 편의성)
document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
}));

// 스크롤 시 흐릿하게 나타나는 효과 (Scroll Reveal Animation)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
            // 한 번 보여진 후에는 observer 해제
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 애니메이션을 적용할 요소들 선택
document.querySelectorAll('.about-card, .section-title, .contact-box').forEach((el) => {
    el.style.opacity = "0"; // 초기 상태는 투명하게
    observer.observe(el);
});


// =========================================
// Gallery Images Loading & Lightbox
// =========================================
const galleryImages = ['KakaoTalk_20260211_171037304.jpg', 'KakaoTalk_20260213_133444408.jpg', 'KakaoTalk_20260213_133747897.jpg', 'KakaoTalk_20260214_214204888.jpg', 'KakaoTalk_20260214_214340210.jpg', 'KakaoTalk_20260214_215649824.jpg', 'KakaoTalk_20260222_224439864.jpg', 'KakaoTalk_20260222_224439864_01.jpg', 'KakaoTalk_20260222_224439864_02.jpg', 'KakaoTalk_20260222_224439864_03.jpg', 'KakaoTalk_20260222_224439864_04.jpg', 'KakaoTalk_20260222_224439864_05.jpg'];

const galleryContainer = document.getElementById('galleryContainer');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close-lightbox');

if (galleryContainer) {
    galleryImages.forEach(imgName => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = 'Sample_image/' + imgName;
        img.alt = 'Travel Memory';
        img.loading = 'lazy';
        
        item.appendChild(img);
        
        item.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });

        galleryContainer.appendChild(item);
        observer.observe(item);
    });
}

if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
}
