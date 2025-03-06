document.addEventListener('DOMContentLoaded', () => {
    // Rolagem para o topo ao atualizar a página
    window.scrollTo(0, 0);

   // Menu Mobile
   const menuToggle = document.getElementById('menuToggle');
   const nav = document.getElementById('nav');

   // Abrir/fechar menu ao clicar no ícone do menu
   menuToggle.addEventListener('click', () => {
       nav.classList.toggle('active');
   });

   // Fechar menu ao clicar em um link
   document.querySelectorAll('.nav-link').forEach(link => {
       link.addEventListener('click', () => {
           nav.classList.remove('active');
       });
   });

   // Fechar menu ao clicar fora dele
   document.addEventListener('click', (event) => {
       const isClickInsideMenu = nav.contains(event.target);
       const isClickOnToggle = menuToggle.contains(event.target);

       if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains('active')) {
           nav.classList.remove('active');
       }
   });

    // Sistema de contagem de perguntas
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const questionCount = document.getElementById('questionCount');
    const totalPrice = document.getElementById('totalPrice');
    const buyQuestionsBtn = document.getElementById('buyQuestionsBtn');

    let count = 4;
    const pricePerQuestion = 10;

    function updateCount(newCount) {
        if (newCount >= 4) {
            count = newCount;
            questionCount.textContent = count;
            totalPrice.textContent = count * pricePerQuestion;
            updateBuyLink();
        }
    }

    function updateBuyLink() {
        const message = `Olá, gostaria de comprar ${count} perguntas avulsas.`;
        buyQuestionsBtn.href = `https://wa.me/559191946826?text=${encodeURIComponent(message)}`;
    }

    decrementBtn.addEventListener('click', () => updateCount(count - 1));
    incrementBtn.addEventListener('click', () => updateCount(count + 1));

    // Inicializa o contador e o link do WhatsApp
    questionCount.textContent = count;
    totalPrice.textContent = count * pricePerQuestion;
    updateBuyLink();

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de fade para cards de serviço
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Efeito de transição de imagens
    const titles = document.querySelectorAll(".title");
    const root = document.querySelector(":root");
    const outer = document.getElementById('outer');
    const middle = document.getElementById('middle');
    const inner = document.getElementById('inner');
    const nextButton = document.getElementById('nextButton');

    // Imagens carregadas da pasta local "imagens/assets"
    const images = [
        {
            url: "imagens/assets/imagem1.jpeg", // Caminho da primeira imagem
            
        },
        {
            url: "imagens/assets/imagem2.jpeg", // Caminho da segunda imagem
            
        },
        {
            url: "imagens/assets/imagem3.jpeg", // Caminho da terceira imagem
            
        },
        {
            url: "imagens/assets/imagem4.jpeg", // Caminho da quarta imagem
            
        },
        {
            url: "imagens/assets/imagem5.jpeg", // Caminho da quinta imagem
            
        }
    ];
    let currentIndex = 0;

    function changeElements(isFirstRender = false) {
        if (!isFirstRender) currentIndex++;
        const curImage = images[currentIndex % images.length];
        const nextImage = images[(currentIndex + 1) % images.length];
        nextButton.setAttribute("disabled", true);

        const changeTitles = () => {
            titles[0].textContent = curImage.name;
            titles[1].textContent = nextImage.name;
        };

        const changeImages = () => {
            root.style.setProperty("--image-1", `url(${curImage.url})`);
            root.style.setProperty("--image-2", `url(${nextImage.url})`);
        };

        if (!isFirstRender) {
            runTextAnimations(changeTitles);
            runSpinAnimations(changeImages);
        } else {
            nextButton.removeAttribute("disabled");
            changeImages();
            changeTitles();
        }
        recalculateImagePosition();
    }

    function runTextAnimations(endCallback) {
        const animationTimeInMs = 550;
        titles[0].classList.add("active");
        titles[1].classList.add("active");

        setTimeout(() => {
            endCallback();
            titles[0].classList.remove("active");
            titles[1].classList.remove("active");
        }, animationTimeInMs);
    }

    function runSpinAnimations(middleCallback) {
        const animationTimeInMs = 2000;
        const firstCircleSpin = 1300;
        outer.classList.add("active");
        root.style.setProperty("--after-opacity", "0");
        root.style.setProperty("--before-opacity", "1");

        setTimeout(() => {
            middleCallback();
            root.style.setProperty("--after-opacity", "1");
            root.style.setProperty("--before-opacity", "0");
        }, firstCircleSpin / 2);

        setTimeout(() => {
            outer.classList.remove("active");
            nextButton.removeAttribute("disabled");
        }, animationTimeInMs);
    }

    function recalculateImagePosition() {
        const middleBounds = middle.getBoundingClientRect();
        root.style.setProperty(
            "--middle-position",
            `-${middleBounds.left}px -${middleBounds.top}px`
        );
        const innerBounds = inner.getBoundingClientRect();
        root.style.setProperty(
            "--inner-position",
            `-${innerBounds.left}px -${innerBounds.top}px`
        );
    }

    window.addEventListener("resize", recalculateImagePosition);

    nextButton.addEventListener("click", () => changeElements());

    changeElements(true);
});