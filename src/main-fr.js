import { initOrderForm } from './order-form.js';
import './style.css';
import {packages, addons, process, faqs} from './data-fr.js';
import {helmet} from './logo.js';
const $ = s => document.querySelector(s);
const money = n => `€${new Intl.NumberFormat('fr-FR').format(n)}`;
const icon = (t) => `<span aria-hidden="true">${t}</span>`;
let packageId='landing', selectedAddons=new Set(), speed='standard', scenario='standard', visits=240;

$('#app').innerHTML = `
<div class="grain" aria-hidden="true"></div><div class="motion-line" id="motion-line" aria-hidden="true"></div>
<header class="site-header"><div class="shell nav"><a class="wordmark" href="#top" aria-label="SiteWarrior — accueil">${helmet('logo-icon')}<span class="brand-name">SITE<span class="brand-light">WARRIOR</span></span></a><nav class="nav-links" id="navigation"><a href="#benefits">Ce qui fait la différence</a><a href="#process">Notre méthode</a><a href="#pricing">Tarifs</a><a href="#faq">FAQ</a></nav><div class="nav-actions"><a class="nav-cta" href="#pricing">COMMANDER UN SITE <span>→</span></a><div class="language-switch" aria-label="Choisir la langue"><a class="lang-link" data-lang="en" href="${import.meta.env.BASE_URL}" lang="en" hreflang="en" aria-label="English"><span aria-hidden="true">🇬🇧</span></a><a class="lang-link" data-lang="pl" href="${import.meta.env.BASE_URL}pl/" lang="pl" hreflang="pl" aria-label="Polski"><span aria-hidden="true">🇵🇱</span></a><a class="lang-link" data-lang="no" href="${import.meta.env.BASE_URL}no/" lang="nb" hreflang="nb" aria-label="Norsk"><span aria-hidden="true">🇳🇴</span></a><a class="lang-link active" data-lang="fr" href="${import.meta.env.BASE_URL}fr/" lang="fr" hreflang="fr" aria-current="page" aria-label="Français"><span aria-hidden="true">🇫🇷</span></a><a class="lang-link" data-lang="de" href="${import.meta.env.BASE_URL}de/" lang="de" hreflang="de" aria-label="Deutsch"><span aria-hidden="true">🇩🇪</span></a></div></div><button class="menu-toggle" id="menu-toggle" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span></button></div></header>
<main id="top">
<section class="hero" id="hero"><div class="hero-grid"><div class="hero-content"><p class="kicker fade-in"><span class="tiny-cross">—</span> CRÉATION ET DÉVELOPPEMENT WEB</p><h1 class="fade-in">PAS ENCORE DE SITE ?<br><em>DES CLIENTS</em><br>VOUS ÉCHAPPENT<span class="period">.</span></h1><p class="hero-copy fade-in">Nous concevons des sites qui présentent votre activité clairement et donnent envie de vous contacter. À partir de 229 € HT.</p><div class="hero-actions fade-in"><a class="button button-primary" href="#pricing"><span>COMMANDEZ DÈS 229 €</span><b>→</b></a><a class="text-link" href="#benefits">VOIR LA SIMULATION <span>↓</span></a></div><div class="hero-bottom mono"><span>STRATÉGIE — DESIGN — DÉVELOPPEMENT</span><span>VOIR LES TARIFS ↓</span></div></div><div class="hero-object" id="hero-object"><div class="helmet-wrap">${helmet('hero-helmet')}</div></div></div></section>

<section id="benefits" class="section section-arena journey-section"><div class="shell"><div class="section-heading journey-heading"><p class="kicker">QUAND LES VISITEURS REPARTENT</p><h2>POURQUOI VOS VISITEURS<br><span>NE VOUS CONTACTENT PAS ?</span></h2><p>Un beau site ne suffit pas. Identifiez trois freins fréquents et estimez comment une expérience plus claire pourrait favoriser les prises de contact.</p></div><div class="journey-workspace"><div class="journey-explain"><div class="journey-intro-line"><span class="journey-small">01 — 03</span><span class="journey-small">QUE CORRIGER EN PREMIER ?</span></div><div class="journey-stages" role="group" aria-label="QUE CORRIGER EN PREMIER ?"><button type="button" class="journey-stage active" data-stage="0" aria-pressed="true"><span class="stage-index">01</span><span class="stage-name">La première impression</span><span class="stage-pointer" aria-hidden="true">→</span></button><button type="button" class="journey-stage " data-stage="1" aria-pressed="false"><span class="stage-index">02</span><span class="stage-name">Pourquoi vous choisir</span><span class="stage-pointer" aria-hidden="true">→</span></button><button type="button" class="journey-stage " data-stage="2" aria-pressed="false"><span class="stage-index">03</span><span class="stage-name">La prochaine étape</span><span class="stage-pointer" aria-hidden="true">→</span></button></div><div class="journey-advice" aria-live="polite"><p id="journey-problem"></p><strong id="journey-fix"></strong></div></div><div class="journey-calculator"><div class="journey-calculator-top"><span>Visites mensuelles du site</span><output id="traffic-output" for="traffic">300</output></div><input id="traffic" type="range" min="100" max="3000" step="100" value="300" aria-label="Visites mensuelles du site"><div class="journey-rate-grid"><label for="rate-current">Taux de prise de contact actuel<span><output id="rate-current-output">1.0%</output></span></label><input id="rate-current" type="range" min="0.5" max="10" step="0.5" value="1" aria-label="Taux de prise de contact actuel"><label for="rate-better">Taux de prise de contact envisagé<span><output id="rate-better-output">3.0%</output></span></label><input id="rate-better" type="range" min="0.5" max="10" step="0.5" value="3" aria-label="Taux de prise de contact envisagé"></div><div class="journey-comparison"><div class="journey-result"><span>SCÉNARIO ACTUEL</span><strong id="result-current">3</strong><small>demandes / mois</small><div class="journey-track"><i id="bar-current"></i></div></div><div class="journey-result potential"><span>SCÉNARIO AMÉLIORÉ</span><strong id="result-better">9</strong><small>demandes / mois</small><div class="journey-track"><i id="bar-better"></i></div></div></div><div class="journey-gain"><span>DEMANDES SUPPLÉMENTAIRES POSSIBLES</span><strong id="result-gain">+6</strong></div><p class="journey-disclaimer">Simulation indicative. Les taux sont vos hypothèses, pas des résultats de SiteWarrior ni une garantie. Les demandes dépendent aussi du trafic, du marché et de votre offre.</p><div class="journey-actions"><button type="button" id="journey-reset" class="journey-reset">RÉINITIALISER ↻</button><a href="#pricing" class="journey-link">LANCER MON PROJET →</a></div></div></div></div></section>
<section class="decision-section" id="decisions"><div class="shell decision-shell"><div class="decision-heading"><p class="kicker">AVANT DE COMMENCER</p><h2>UN BON SITE<br><em>NE DOIT RIEN AU HASARD.</em></h2><p>Trois choix essentiels pour retenir l’attention, inspirer confiance et faciliter la prise de contact.</p></div><div class="decision-lab"><div class="decision-tabs" role="group" aria-label="AVANT DE COMMENCER"><button class="decision-tab active" data-decision="0" aria-pressed="true"><span class="decision-tab-name">Clarifier votre offre</span><span aria-hidden="true">→</span></button><button class="decision-tab " data-decision="1" aria-pressed="false"><span class="decision-tab-name">Supprimer les obstacles</span><span aria-hidden="true">→</span></button><button class="decision-tab " data-decision="2" aria-pressed="false"><span class="decision-tab-name">Faciliter le contact</span><span aria-hidden="true">→</span></button></div><div class="decision-display" aria-live="polite"><div class="decision-orbit" aria-hidden="true"><i></i><i></i><i></i><b></b></div><div class="decision-copy"><small id="decision-index">01 / LES 5 PREMIÈRES SECONDES</small><h3 id="decision-title">Les visiteurs doivent comprendre votre activité sans chercher d’explication.</h3><p id="decision-detail">Une accroche claire, un bénéfice concret et un bouton facile à repérer.</p></div></div></div></div></section>
<section id="process" class="section method-section"><div class="shell"><div class="section-heading heading-row"><div><p class="kicker">COMMENT NOUS TRAVAILLONS</p><h2>UNE MÉTHODE CLAIRE.<br><span>SANS COMPLICATION.</span></h2></div><p>Un bon site guide naturellement les visiteurs vers l’information et l’action qui comptent.</p></div><div class="process-grid">${process.map(([n,title,desc])=>`<article class="process-card interactive-card" tabindex="0"><div class="card-line mono"><span>${n} / 04</span><span class="card-arrow">→</span></div><div class="process-cross" aria-hidden="true"></div><h3>${title}</h3><p>${desc}</p><div class="card-bottom-line"></div></article>`).join('')}</div><div class="manifesto"><div class="mono">NOTRE APPROCHE</div><p>MOINS DE DÉCORATION.<br><strong>PLUS DE CLARTÉ.</strong></p><a href="#pricing" class="round-arrow" aria-label="Go to pricing">→</a></div></div></section>
<section class="section deliverables"><div class="shell deliver-grid"><div><p class="kicker">CE QUE COMPREND VOTRE SITE</p><h2>DES SITES<br><span>QUI FONT AVANCER VOTRE ACTIVITÉ.</span></h2><p class="section-intro">Des premiers mots à l’affichage mobile. L’essentiel, sans superflu.</p><a class="text-link light" href="#pricing">VOIR LES TARIFS <span>→</span></a></div><div class="deliver-list">${[['01','Conçu pour guider','Une structure claire et des appels à l’action.'],['02','Pensé d’abord pour mobile','Adapté au mobile et à l’ordinateur.'],['03','Du code, pas que des maquettes','Un site fonctionnel prêt à publier.'],['04','Prêt à évoluer','Une base flexible pour accompagner votre croissance.']].map(x=>`<div class="deliver-item"><div><h3>${x[1]}</h3><p>${x[2]}</p></div><span class="deliver-plus">＋</span></div>`).join('')}</div></div></section>
<section class="care-section" id="support"><div class="shell"><p class="kicker">L’ACCOMPAGNEMENT CONTINUE</p><div class="care-layout"><h2>ON RESTE À VOS CÔTÉS,<br><em>MÊME APRÈS LA MISE EN LIGNE.</em></h2><p class="care-intro">Vous repartez avec un site prêt à l’emploi et les connaissances pour le gérer. Conseils et prise en main personnalisée sont inclus dans le projet.</p></div><div class="care-list"><article class="care-item"><span class="care-num">01</span><h3>Consultations gratuites</h3><p>Posez vos questions avant et après la mise en ligne, sans frais de conseil supplémentaires dans le cadre convenu.</p><span class="care-arrow" aria-hidden="true">→</span></article><article class="care-item"><span class="care-num">02</span><h3>Accompagnement personnalisé</h3><p>Nous vous montrons comment utiliser le site, modifier le contenu et traiter les demandes.</p><span class="care-arrow" aria-hidden="true">→</span></article><article class="care-item"><span class="care-num">03</span><h3>Des pistes pour la suite</h3><p>Sachez quoi mesurer et améliorer à mesure que votre activité se développe.</p><span class="care-arrow" aria-hidden="true">→</span></article></div></div></section>
<section id="pricing" class="section pricing-section"><div class="shell"><div class="section-heading heading-row"><div><p class="kicker">CRÉEZ VOTRE SITE</p><h2>CHOISISSEZ VOTRE FORMULE.<br><span>ESTIMEZ VOTRE BUDGET.</span></h2></div><p>Choisissez les prestations dont vous avez besoin : le prix estimatif s’actualise instantanément, sans rendez-vous commercial.</p></div><div class="builder"><div class="builder-input"><div class="builder-step mono"><span>CHOISISSEZ VOTRE SITE</span><span></span></div><div class="package-options" id="packages"></div><div class="builder-step mono"><span>OPTIONS SUPPLÉMENTAIRES</span><span></span></div><div id="addons" class="addon-options"></div><div class="builder-step mono"><span>DÉLAI DE LIVRAISON</span><span></span></div><div class="delivery-options" id="deadlines"></div><p class="delivery-note">*Livraison express sous réserve de disponibilité et de validation du périmètre. La majoration de 50 % est une proposition à confirmer avant publication.</p></div><aside class="estimate"><div class="estimate-top mono"><span><i class="status-dot"></i> VOTRE SITE. VOTRE PRIX.</span><span></span></div><p class="quote-subline">Estimation personnalisée</p><div class="estimate-body"><span class="estimate-label mono">Prix estimé (HT)</span><div class="total-number" id="total" aria-live="polite">229 <span>€</span></div><div class="estimate-rule"></div><div class="estimate-lines" id="summary"></div></div><div class="estimate-bottom"><a id="order" class="button button-primary" href="mailto:contact@sitewarrior.eu"><span>ENVOYER UNE DEMANDE</span><b>→</b></a><button id="copy-quote" class="copy-button">COPIER LE RÉCAPITULATIF <span>⧉</span></button><p>Ceci est une estimation. Nous confirmons le périmètre et la date de livraison avant de commencer. Une demande ne vaut pas commande.</p></div></aside></div></div></section>
<section id="faq" class="section faq-section"><div class="shell faq-grid"><div><p class="kicker">QUESTIONS ET RÉPONSES</p><h2>TOUT SAVOIR<br><span>AVANT DE COMMENCER.</span></h2><p>L’essentiel à savoir avant de commencer.</p></div><div class="faq-list">${faqs.map(([q,a],i)=>`<details ${i===0?'open':''}><summary><span class="mono">0${i+1}</span><b>${q}</b><span class="faq-plus">＋</span></summary><p>${a}</p></details>`).join('')}</div></div></section>
<section class="closing" id="start"><div class="shell closing-layout"><div class="closing-main"><p class="kicker">VOTRE PROCHAINE ÉTAPE</p><h2>DONNONS VIE À<br><em>VOTRE SITE.</em></h2><p class="closing-intro">Un site qui présente votre activité avec justesse, facile à prendre en main et accompagné de vrais conseils. Dès 229 € HT.</p><div class="closing-actions"><a class="closing-primary" href="#pricing"><span>CONFIGURER MON SITE</span><span class="closing-arrow" aria-hidden="true">→</span></a><a class="closing-secondary" href="mailto:contact@sitewarrior.eu?subject=Website%20enquiry">POSER UNE QUESTION <span aria-hidden="true">→</span></a></div></div><div class="closing-next"><p class="closing-next-label">COMMENT ÇA SE PASSE ?</p><div class="closing-steps" role="group" aria-label="Next steps"><button class="closing-step is-active" type="button" data-next="0" aria-pressed="true">01 <span>Choisir</span></button><button class="closing-step" type="button" data-next="1" aria-pressed="false">02 <span>Échanger</span></button><button class="closing-step" type="button" data-next="2" aria-pressed="false">03 <span>Lancer</span></button></div><p class="closing-step-detail" id="closing-step-detail" aria-live="polite">Choisissez votre formule et découvrez aussitôt votre estimation.</p><div class="closing-progress" aria-hidden="true"><span id="closing-progress-fill"></span></div></div></div><div class="closing-helmet" aria-hidden="true">${helmet('closing-mark')}</div></section>
</main><footer><div class="shell footer-top"><a class="wordmark" href="#top">${helmet('logo-icon')}<span>SITE<span class="brand-light">WARRIOR</span><small>BUILT TO PERFORM</small></span></a><a href="mailto:contact@sitewarrior.eu">CONTACT@SITEWARRIOR.EU →</a></div><div class="shell footer-bottom mono"><span>© <span id="year"></span> SITEWARRIOR.EU</span><span>CONÇU POUR SERVIR. PAS POUR DÉCORER.</span><a href="#top">REMONTER EN HAUT ↑</a></div><nav class="footer-legal" aria-label="Confidentialité et mentions légales"><a href="/fr/privacy/">Confidentialité</a><a href="/fr/terms/">Conditions</a></nav></footer>
<div id="toast" class="toast" role="status" aria-live="polite"></div>`;

const journeyStages = [{title:'La première impression',problem:'Le visiteur doit comprendre votre offre en quelques secondes.',fix:'Dites qui vous aidez et ce qui change pour eux — dès le premier écran.'},{title:'Pourquoi vous choisir',problem:'Sans bénéfice concret, difficile de donner envie d’en savoir plus.',fix:'Mettez en avant des avantages concrets, des preuves et une offre simple.'},{title:'La prochaine étape',problem:'Même un visiteur intéressé peut renoncer si le contact est compliqué.',fix:'Rendez une action principale visible et facile à réaliser.'}];
function updateJourney(){
  const traffic = Number($('#traffic').value);
  const current = Number($('#rate-current').value);
  const better = Number($('#rate-better').value);
  const base = Math.round(traffic * current / 100);
  const improved = Math.round(traffic * better / 100);
  $('#traffic-output').textContent = traffic.toLocaleString('fr-FR');
  $('#rate-current-output').textContent = current.toFixed(1) + '%';
  $('#rate-better-output').textContent = better.toFixed(1) + '%';
  $('#result-current').textContent = base;
  $('#result-better').textContent = improved;
  $('#result-gain').textContent = (improved - base > 0 ? '+' : '') + (improved-base);
  const max = Math.max(base, improved, 1);
  $('#bar-current').style.width = (base/max*100)+'%';
  $('#bar-better').style.width = (improved/max*100)+'%';
}
function showJourneyStage(index){
  const item = journeyStages[index];
  $('#journey-problem').textContent = item.problem;
  $('#journey-fix').textContent = item.fix;
  document.querySelectorAll('[data-stage]').forEach(button=>{const selected=Number(button.dataset.stage)===index;button.classList.toggle('active',selected);button.setAttribute('aria-pressed',String(selected));});
}
document.querySelectorAll('#traffic, #rate-current, #rate-better').forEach(el=>el.addEventListener('input',updateJourney));
document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>showJourneyStage(Number(button.dataset.stage))));
$('#journey-reset').addEventListener('click',()=>{$('#traffic').value=300;$('#rate-current').value=1;$('#rate-better').value=3;updateJourney();showJourneyStage(0);});
showJourneyStage(0);updateJourney();
const decisionContent = [{"index": "01 / LES 5 PREMIÈRES SECONDES", "title": "Les visiteurs doivent comprendre votre activité sans chercher d’explication.", "detail": "Une accroche claire, un bénéfice concret et un bouton facile à repérer."}, {"index": "02 / UN PARCOURS PLUS COURT", "title": "Trop de sections et de boutons dispersent l’attention.", "detail": "Une page ciblée qui guide du besoin à la décision."}, {"index": "03 / UNE RAISON D’AGIR", "title": "Un visiteur intéressé doit pouvoir vous joindre facilement.", "detail": "Des contacts visibles et un parcours de demande simple."}];
document.querySelectorAll('[data-decision]').forEach(button => button.addEventListener('click', () => {const i=Number(button.dataset.decision); const d=decisionContent[i];document.querySelectorAll('[data-decision]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});const display=document.querySelector('.decision-display');display.classList.remove('decision-flash');void display.offsetWidth;display.classList.add('decision-flash');$('#decision-index').textContent=d.index;$('#decision-title').textContent=d.title;$('#decision-detail').textContent=d.detail;display.style.setProperty('--angle', (i*115)+'deg');}));


function quoteData(){const selected=packages.find(x=>x.id===packageId);const selectedExtras=addons.filter(a=>selectedAddons.has(a.id));const subtotal=selected.price+selectedExtras.reduce((sum,a)=>sum+a.price,0);const rush=speed==='fast';return {selected,selectedExtras,total:Math.round(subtotal*(rush?1.5:1)),rush};}
function renderQuote(){const {selected,selectedExtras,total,rush}=quoteData();$('#packages').innerHTML=packages.map(p=>`<button type="button" class="package-row ${p.id===packageId?'selected':''}" data-package="${p.id}" aria-pressed="${p.id===packageId}"><span class="radio-circle"></span><span class="package-main"><strong>${p.name}</strong><small>${p.desc}</small></span><span class="package-price">${money(p.price)}</span>${p.tag?`<span class="package-tag mono">${p.tag}</span>`:''}</button>`).join('');$('#addons').innerHTML=addons.map(a=>`<label class="addon-row"><input type="checkbox" data-addon="${a.id}" ${selectedAddons.has(a.id)?'checked':''}/><span class="custom-check">✓</span><span>${a.name}</span><strong>+ ${money(a.price)}</strong></label>`).join('');$('#deadlines').innerHTML=`<button class="delivery-choice ${!rush?'selected':''}" data-speed="standard" aria-pressed="${!rush}"><span>7 JOURS</span><small>INCLUS</small></button><button class="delivery-choice ${rush?'selected':''}" data-speed="fast" aria-pressed="${rush}"><span>48 HEURES</span><small>EXPRESS +50 %*</small></button>`;$('#total').innerHTML=`${new Intl.NumberFormat('fr-FR').format(total)} <span>€</span>`;$('#total').classList.remove('price-pulse');void $('#total').offsetWidth;$('#total').classList.add('price-pulse');const lines=[selected.name,...selectedExtras.map(a=>a.name),`Livraison : ${rush?'48 heures':'7 jours'}`];$('#summary').innerHTML=lines.map(x=>`<div><span>${x}</span><span>→</span></div>`).join('');const quote=`SiteWarrior — demande de site web\n\n${lines.map(x=>'• '+x).join('\n')}\n\nPrix estimé HT : ${money(total)}\n\nMerci de me recontacter.`;$('#order').href='#pricing';$('#copy-quote').onclick=async()=>{try{await navigator.clipboard.writeText(quote);toast('Récapitulatif copié')}catch{toast('Copie impossible — utilisez le bouton de demande')}};document.querySelectorAll('[data-package]').forEach(b=>b.addEventListener('click',()=>{packageId=b.dataset.package;renderQuote()}));document.querySelectorAll('[data-addon]').forEach(c=>c.addEventListener('change',()=>{c.checked?selectedAddons.add(c.dataset.addon):selectedAddons.delete(c.dataset.addon);renderQuote()}));document.querySelectorAll('[data-speed]').forEach(b=>b.addEventListener('click',()=>{speed=b.dataset.speed;renderQuote()}));}
renderQuote();initOrderForm({labels:{"privacy": "Politique de confidentialité", "terms": "Conditions générales de service", "head": "Envoyer votre demande", "desc": "Votre formule et le montant estimé seront joints automatiquement.", "name": "Nom", "email": "Adresse e-mail", "phone": "Téléphone (facultatif)", "business": "Entreprise / marque (facultatif)", "message": "Parlez-nous de votre projet (facultatif)", "agree": "J’ai lu la politique de confidentialité et les conditions générales. Je comprends que mes données seront utilisées pour répondre à ma demande.", "submit": "Envoyer ma demande", "sending": "Envoi en cours…", "success": "Merci ! Votre demande a bien été envoyée. Nous vous répondrons par e-mail.", "failure": "Impossible d’envoyer votre demande. Réessayez ou écrivez à contact@sitewarrior.eu.", "close": "Fermer", "estimate": "Récapitulatif", "cancel": "Annuler", "required": "Veuillez remplir les champs obligatoires.", "subject": "Demande de site web — SiteWarrior"},language:'fr',getSelection:quoteData,money});$('#year').textContent=new Date().getFullYear();
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('visible');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>el.classList.remove('visible'),2900)}
// Responsive menu: closed by default; dismisses on link, outside click, Escape, and desktop resize.
const menuButton = $('#menu-toggle');
const mobileMenu = $('#navigation');
menuButton.setAttribute('aria-controls','navigation');
function setMobileMenu(open) {
  const expanded = Boolean(open) && window.innerWidth <= 800;
  mobileMenu.classList.toggle('open', expanded);
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Close menu' : 'Open menu');
}
setMobileMenu(false);
menuButton.addEventListener('click', () => setMobileMenu(!mobileMenu.classList.contains('open')));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMobileMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
    setMobileMenu(false); menuButton.focus();
  }
});
document.addEventListener('pointerdown', event => {
  if (!event.target.closest('.site-header') && mobileMenu.classList.contains('open')) setMobileMenu(false);
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 800 && mobileMenu.classList.contains('open')) setMobileMenu(false);
});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.section-heading,.process-card,.deliver-item,.faq-list,.manifesto,.hero-content > *').forEach(el=>{el.classList.add('reveal');observer.observe(el)});
if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){const obj=$('#hero-object');obj.addEventListener('pointermove',e=>{const r=obj.getBoundingClientRect();obj.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5)*13+'px');obj.style.setProperty('--my',((e.clientY-r.top)/r.height-.5)*13+'px')});obj.addEventListener('pointerleave',()=>{obj.style.setProperty('--mx','0px');obj.style.setProperty('--my','0px')});document.querySelectorAll('.interactive-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--x',`${e.clientX-r.left}px`);card.style.setProperty('--y',`${e.clientY-r.top}px`)}));}

// Lightweight scroll progress and magnetic motion; disabled for reduced motion.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let scheduled = false;
  const updateProgress = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    $('#motion-line').style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
    scheduled = false;
  };
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateProgress); } }, {passive:true});
  updateProgress();
  if (matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('pointermove', e => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty('--cursor-x', `${e.clientX - rect.left}px`);
        button.style.setProperty('--cursor-y', `${e.clientY - rect.top}px`);
      });
    });
  }
}

// Shared section IDs are intentionally language-independent.
// Preserve the current section when switching between localized pages.
const sectionIds = new Set(['benefits', 'process', 'pricing', 'faq']);
const legacySections = { arena: 'benefits', metoda: 'process', wycena: 'pricing' };
const requestedSection = decodeURIComponent(window.location.hash.slice(1));
const currentSection = legacySections[requestedSection] || requestedSection;
if (requestedSection !== currentSection) {
  history.replaceState(null, '', `${location.pathname}${location.search}#${currentSection}`);
}
for (const anchor of document.querySelectorAll('.lang-link')) {
  const baseHref = anchor.getAttribute('href').split('#')[0];
  if (sectionIds.has(currentSection)) anchor.setAttribute('href', `${baseHref}#${currentSection}`);
}

// CTA: useful, keyboard-accessible interaction instead of decorative animation.
const nextSteps = [
  'Choisissez votre formule et découvrez aussitôt votre estimation.',
  'Nous clarifions vos objectifs, répondons à vos questions et validons le périmètre.',
  'Nous créons, publions et vous montrons comment utiliser votre site.'
];
document.querySelectorAll('[data-next]').forEach(button => button.addEventListener('click', () => {
  const index = Number(button.dataset.next);
  document.querySelectorAll('[data-next]').forEach(item => {
    const active = item === button; item.classList.toggle('is-active', active); item.setAttribute('aria-pressed', String(active));
  });
  const detail = document.querySelector('#closing-step-detail');
  detail.textContent = nextSteps[index];
  detail.animate?.([{opacity:0,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
  document.querySelector('#closing-progress-fill').style.width = `${(index + 1) * 100 / 3}%`;
}));

// When a page is opened directly with a hash, the target only exists after JS renders it.
if (sectionIds.has(currentSection)) {
  requestAnimationFrame(() => {
    document.getElementById(currentSection)?.scrollIntoView({ block: 'start', behavior: 'instant' });
  });
}
