// 모바일 햄버거 메뉴 토글 로직
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    // 접근성 속성 상태 업데이트
    hamburger.setAttribute("aria-expanded", isActive);
});

// 메뉴 링크 클릭 시 메뉴 닫기 (모바일 환경 편의성)
document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
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
const galleryImages = [
    { src: 'KakaoTalk_20260211_171037304.jpg', caption: '동료들과 함께한 의미 있는 순간' },
    { src: 'KakaoTalk_20260213_133444408.jpg', caption: '새로운 비즈니스 기회를 향한 항해' },
    { src: 'KakaoTalk_20260213_133747897.jpg', caption: '뜨거운 열정과 도전의 시간' },
    { src: 'KakaoTalk_20260214_214204888.jpg', caption: '성공적인 세미나 현장의 열기' },
    { src: 'KakaoTalk_20260214_214340210.jpg', caption: '네트워킹을 통한 끈끈한 파트너십 구축' },
    { src: 'KakaoTalk_20260214_215649824.jpg', caption: '명확한 목표를 향해 나아가는 발걸음' },
    { src: 'KakaoTalk_20260222_224439864.jpg', caption: '눈부신 성과 창출을 축하하며' },
    { src: 'KakaoTalk_20260222_224439864_01.jpg', caption: '창의적 인사이트가 돋보인 순간' },
    { src: 'KakaoTalk_20260222_224439864_02.jpg', caption: '글로벌 진출을 향한 힘찬 도약' },
    { src: 'KakaoTalk_20260222_224439864_03.jpg', caption: '핵심 파트너사 임원진과의 미팅' },
    { src: 'KakaoTalk_20260222_224439864_04.jpg', caption: '미래지향적 청사진을 그리는 전략 회의' },
    { src: 'KakaoTalk_20260222_224439864_05.jpg', caption: '조직 변화를 이끌어가는 리더십' }
];

const galleryContainer = document.getElementById('galleryContainer');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.querySelector('.close-lightbox');

if (galleryContainer) {
    galleryImages.forEach(imgData => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = 'Sample_image/' + imgData.src;
        img.alt = imgData.caption;
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        const txt = document.createElement('p');
        txt.textContent = imgData.caption;
        overlay.appendChild(txt);

        item.appendChild(img);
        item.appendChild(overlay);

        item.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt; // 원본 이미지의 alt 텍스트 전달
            if (lightboxCaption) {
                lightboxCaption.textContent = imgData.caption;
            }
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
            closeBtn.focus(); // 스크린 리더 포커스 이동
        });

        galleryContainer.appendChild(item);
        observer.observe(item);
    });
}

// 라이트박스 닫기 공통 함수
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // 배경 스크롤 복원
}

if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // 키보드 접근성: Esc 키로 라이트박스 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
            // 포커스를 이전에 선택한 갤러리 아이템 등으로 돌려주는 것이 정석이나,
            // 현재 구조에서는 단순 닫기 동작 구현에 집중
        }
    });
}
