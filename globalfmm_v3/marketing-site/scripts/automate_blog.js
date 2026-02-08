const fs = require('fs-extra');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Configuration
const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
    console.error("Error: GOOGLE_API_KEY environment variable not set.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const BLOG_PATH = path.join(__dirname, '../blog.html');
const INDEX_PATH = path.join(__dirname, '../index.html');
const HISTORY_PATH = path.join(__dirname, '../blog_history.json');
const ARTICLES_DIR = path.join(__dirname, '../');

async function run() {
    try {
        // 1. Load history
        let history = [];
        if (await fs.pathExists(HISTORY_PATH)) {
            history = await fs.readJson(HISTORY_PATH);
        }

        // 2. Generate content with AI
        console.log("Generating new blog post content...");
        const prompt = `
            Eres un experto en Facility Management (FM) y tecnología, parte del equipo de "Global FMM" y la plataforma "Advance IA".
            Debes escribir un nuevo artículo técnico pero accesible para el blog. 
            El tono debe ser premium, futurista y orientado a la eficiencia extrema mediante IA.
            
            Temas ya tratados: ${history.map(h => h.title).join(", ") || "Ninguno"}.
            
            Escribe el artículo en ESPAÑOL.
            Necesito que devuelvas un objeto JSON con los siguientes campos:
            - title: Un título potente.
            - description: Una meta-descripción breve para SEO.
            - badge: Un tag breve (ej: Tecnología, Eficiencia, Estrategia).
            - icon: Un emoji representativo.
            - lead: Una frase de resumen impactante.
            - slug: Un nombre de archivo amigable (ej: el-futuro-de-la-ia-en-fm).
            - content: El cuerpo del artículo en HTML (usando tags <h2>, <p>, <ul>, <li>, y una sección destacada con <div class="tech-card glass">).
            - metricVal: Una cifra (ej: -20%).
            - metricLabel: Qué representa esa cifra (ej: Ahorro energético esperado).

            IMPORTANTE: Solo responde con el JSON puro.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const cleanedJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        const post = JSON.parse(cleanedJson);

        const fileName = `${post.slug}.html`;
        const filePath = path.join(ARTICLES_DIR, fileName);

        // 3. Create the HTML file for the article
        console.log(`Creating ${fileName}...`);
        const today = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('es-ES', options);

        const template = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Advance FM IA</title>
    <meta name="description" content="${post.description}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="assets/brand/logo-icon-clean.png" type="image/png">
</head>
<body class="insight-page">
    <nav class="glass-nav">
        <div class="nav-container">
            <a href="index.html" class="logo-group">
                <img src="img/global_fmm_logo_MAX_QUALITY_transparent.png" alt="Global FMM Logo" style="height: 160px;">
            </a>
            <div class="nav-links">
                <a href="ecosistema.html">Ecosistema</a>
                <a href="quienes-somos.html">Nosotros</a>
                <a href="acerca-de-advance.html">Advance</a>
                <a href="modelo-gestion.html">Modelo</a>
                <a href="modulos.html">Módulos</a>
                <a href="index.html#insights" class="active">Insights</a>
                <a href="blog.html">Blog</a>
                <a href="index.html#contacto">Contacto</a>
            </div>
            <button class="mobile-toggle"><span></span></button>
        </div>
    </nav>
    <header class="hero-mini container">
        <div class="hero-content">
            <div class="hero-badge">${post.badge}</div>
            <h1 class="hero-title">${post.title.replace(post.title.split(' ').slice(-1)[0], `<span class="gradient-text">${post.title.split(' ').slice(-1)[0]}</span>`)}</h1>
            <p class="hero-lead">${post.lead}</p>
        </div>
    </header>
    <main class="container section-padding">
        <article class="glass article-content" style="padding: 3rem; border-radius: 24px;">
            ${post.content}
            <div class="metric-overlay" style="position: relative; margin-top: 3rem; top: 0; right: 0;">
                <span class="metric-val">${post.metricVal}</span>
                <span class="metric-label">${post.metricLabel}</span>
            </div>
        </article>
        <section class="final-cta section-padding container">
            <div class="glass ca-wrapper">
                <div class="cta-content">
                    <h2 class="section-title">¿Listo para transformar tu operación?</h2>
                    <p class="section-subtitle" style="margin-bottom: 2.5rem;">Únete a las empresas que ya están liderando con inteligencia artificial aplicada al Facility Management.</p>
                    <a href="https://advance.globalfmm.com" class="btn-large btn-glow">Ingresar a Advance IA</a>
                </div>
            </div>
        </section>
    </main>
    <footer class="main-footer">
        <div class="container footer-grid">
            <div class="footer-brand">
                <img src="img/global_fmm_logo_MAX_QUALITY_transparent.png" alt="Global FMM Logo" style="height: 120px;">
                <p>Redefiniendo el futuro de la gestión de activos técnicos mediante inteligencia artificial y una visión centrada en las personas.</p>
            </div>
            <div class="footer-links">
                <h4>Ecosistema</h4>
                <a href="ecosistema.html">Ecosistema</a>
                <a href="quienes-somos.html">Nosotros</a>
                <a href="acerca-de-advance.html">Advance</a>
                <a href="modelo-gestion.html">Modelo</a>
                <a href="modulos.html">Módulos</a>
            </div>
            <div class="footer-links">
                <h4>Recursos</h4>
                <a href="index.html#insights">Insights</a>
                <a href="blog.html">Blog</a>
                <a href="index.html#faq">Preguntas Frecuentes</a>
            </div>
            <div class="footer-links">
                <h4>Contacto & Demo</h4>
                <a href="index.html#contacto">Contacto</a>
                <a href="https://advance.globalfmm.com">Ingresar a Advance</a>
            </div>
            <div class="footer-links">
                <h4>Legal</h4>
                <a href="politica-privacidad.html">Privacidad</a>
                <a href="politica-cookies.html">Cookies</a>
            </div>
        </div>
        <div class="footer-bottom container">
            <p>&copy; 2026 Advance IA & Global FMM. Todos los derechos reservados.</p>
        </div>
    </footer>
    <script src="js/main.js"></script>
</body>
</html>`;

        await fs.writeFile(filePath, template);

        // 4. Update blog.html
        console.log("Updating blog.html...");
        let blogHtml = await fs.readFile(BLOG_PATH, 'utf-8');
        const newCard = `
            <article class="post-card glass">
                <div class="sector-icon">${post.icon}</div>
                <div class="post-tag">${post.badge}</div>
                <span class="post-date">${formattedDate}</span>
                <h3>${post.title}</h3>
                <p>${post.lead}</p>
                <a href="${fileName}" class="read-more">Leer Más →</a>
            </article>`;

        // Find the end of the insights-grid and prepend the new post
        blogHtml = blogHtml.replace('<div class="insights-grid">', `<div class="insights-grid">${newCard}`);
        await fs.writeFile(BLOG_PATH, blogHtml);

        // 5. Update index.html (Only keep the latest 4 in homepage)
        console.log("Updating index.html...");
        let indexHtml = await fs.readFile(INDEX_PATH, 'utf-8');
        // This is a simple logic to add it at the top of insights-grid
        indexHtml = indexHtml.replace('<div class="insights-grid">', `<div class="insights-grid">${newCard}`);
        await fs.writeFile(INDEX_PATH, indexHtml);

        // 6. Update history
        history.push({
            title: post.title,
            date: new Date().toISOString(),
            file: fileName
        });
        await fs.writeJson(HISTORY_PATH, history, { spaces: 2 });

        console.log("Success! New post generated and site updated.");

    } catch (error) {
        console.error("Error during automation:", error);
        process.exit(1);
    }
}

run();
