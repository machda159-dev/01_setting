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
