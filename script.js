document.addEventListener('DOMContentLoaded', () => {
    // Rolagem para o topo ao atualizar a página
    window.scrollTo(0, 0);

    // Menu Mobile
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    // Abrir/fechar menu ao clicar no ícone do menu
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰'; // Alterna entre ícone de hambúrguer e "X"
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.textContent = '☰'; // Volta ao ícone de hambúrguer
        });
    });

    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.textContent = '☰'; // Volta ao ícone de hambúrguer
        }
    });

    // Sistema de contagem de perguntas
    const decrementBtn = document.getElementById('decrementBtn');
    const incrementBtn = document.getElementById('incrementBtn');
    const questionCount = document.getElementById('questionCount');
    const totalPrice = document.getElementById('totalPrice');
    const buyQuestionsBtn = document.getElementById('buyQuestionsBtn');

    let count = 3;
    const pricePerQuestion = 10;

    function updateCount(newCount) {
        if (newCount >= 3) {
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
                    behavior: 'smooth',
                    block: 'start' // Rola até o topo do elemento
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

    // Efeito de transição de imagens na galeria
    const titles = document.querySelectorAll(".title");
    const root = document.querySelector(":root");
    const outer = document.getElementById('outer');
    const middle = document.getElementById('middle');
    const inner = document.getElementById('inner');

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
    let isAnimating = false; // Controla se uma animação está em andamento

    // Função para avançar as imagens ao clicar na foto
    function changeElements() {
        if (isAnimating) return; // Impede cliques durante a animação
        isAnimating = true; // Bloqueia novos cliques

        // Avança para a próxima imagem
        currentIndex = (currentIndex + 1) % images.length;
        const curImage = images[currentIndex];
        const nextImage = images[(currentIndex + 1) % images.length];

        // Atualiza os títulos
        titles[0].textContent = curImage.name;
        titles[1].textContent = nextImage.name;

        // Inicia a animação de giro
        runSpinAnimations(curImage, nextImage);
    }

    // Função para executar a animação de giro
    function runSpinAnimations(curImage, nextImage) {
        // Esconde a imagem atual imediatamente
        root.style.setProperty("--before-opacity", "0");

        // Define a nova imagem com opacidade 0 (invisível)
        root.style.setProperty("--image-2", `url(${nextImage.url})`);
        root.style.setProperty("--after-opacity", "0");

        // Inicia a animação de giro
        outer.classList.add("active");

        // Durante o giro, aumenta a opacidade da nova imagem
        setTimeout(() => {
            root.style.setProperty("--after-opacity", "1");
        }, 650); // Metade do tempo da animação

        // Finaliza a animação e atualiza a imagem principal
        setTimeout(() => {
            outer.classList.remove("active");
            root.style.setProperty("--image-1", `url(${curImage.url})`);
            isAnimating = false; // Libera novos cliques após 2 segundos
        }, 1300); // Tempo total da animação
    }

    // Adiciona evento de clique na foto para avançar as imagens
    outer.addEventListener('click', () => {
        if (!isAnimating) {
            changeElements();
        }
    });

    // Inicializa a galeria
    changeElements();

    // Validação em tempo real do formulário de contato
    const contactForm = document.querySelector('.contact-form form');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const assuntoInput = document.getElementById('assunto');
    const mensagemInput = document.getElementById('mensagem');

    nomeInput.addEventListener('input', () => {
        if (nomeInput.value.trim() === '') {
            nomeInput.setCustomValidity('Por favor, insira seu nome.');
        } else {
            nomeInput.setCustomValidity('');
        }
    });

    emailInput.addEventListener('input', () => {
        if (!emailInput.checkValidity()) {
            emailInput.setCustomValidity('Por favor, insira um e-mail válido.');
        } else {
            emailInput.setCustomValidity('');
        }
    });

    assuntoInput.addEventListener('input', () => {
        if (assuntoInput.value.trim() === '') {
            assuntoInput.setCustomValidity('Por favor, insira um assunto.');
        } else {
            assuntoInput.setCustomValidity('');
        }
    });

    mensagemInput.addEventListener('input', () => {
        if (mensagemInput.value.trim() === '') {
            mensagemInput.setCustomValidity('Por favor, insira uma mensagem.');
        } else {
            mensagemInput.setCustomValidity('');
        }
    });

    // Envio do formulário
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (contactForm.checkValidity()) {
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
});