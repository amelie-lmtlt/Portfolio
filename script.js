/* Animations (GSAP) — coupées si "réduire les animations" est activé */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.gsap && !reduce) {
  gsap.registerPlugin(ScrollTrigger);
  // Nom : les lettres jaillissent
  document.querySelectorAll('#heroName .line').forEach(l => {
    l.innerHTML = [...l.textContent.trim()].map(c => `<span class="ch">${c}</span>`).join('');
  });
  gsap.from('#heroName .ch', { yPercent: 120, rotate: () => gsap.utils.random(-25, 25), duration: 1, ease: 'power4.out', stagger: .06, delay: .2 });
  gsap.from('.role-tag', { scale: 0, rotate: -12, duration: .7, ease: 'back.out(2)', delay: 1.1 });
  gsap.from('.round, .portrait, .note', { scale: 0, opacity: 0, duration: .5, ease: 'back.out(2)', stagger: .15, delay: 1.3 });
  // Parallax : data-speed="0.3" (négatif = descend)
  gsap.utils.toArray('[data-speed]').forEach(el => gsap.to(el, {
    y: () => parseFloat(el.dataset.speed) * innerHeight * -1, ease: 'none',
    scrollTrigger: { trigger: el.closest('section, header'), start: 'top bottom', end: 'bottom top', scrub: true }
  }));
  // Apparition au scroll : class="reveal"
  gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, { y: 60, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } }));
  // Titre "lettres de rançon" : les papiers tombent
  gsap.from('.ransom span', { y: -80, opacity: 0, rotate: () => gsap.utils.random(-20, 20), duration: .7, ease: 'bounce.out', stagger: .12, scrollTrigger: { trigger: '.ransom', start: 'top 80%' } });
  // Cartes projets
  gsap.utils.toArray('.work').forEach(c => gsap.from(c, { scale: .85, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 88%' } }));
  // Lignes de compétences
  gsap.utils.toArray('.skills .row').forEach(r => { const d = parseFloat(r.dataset.dir);
    gsap.fromTo(r, { x: d * -150 }, { x: d * 150, ease: 'none', scrollTrigger: { trigger: '.skills', start: 'top bottom', end: 'bottom top', scrub: true } }); });
}

/* Mini Tamagotchi */
const p = { hu: 70, jo: 80, en: 80, zz: false };
const $ = id => document.getElementById(id), cl = v => Math.max(0, Math.min(100, v));
function show(msg, face) {
  if (msg) $('msg').textContent = msg;
  if (face) $('face').textContent = face;
  ['hu', 'jo', 'en'].forEach(k => $(k).textContent = p[k]);
  $('mood').textContent = p.zz ? 'SLEEPING' : p.hu >= 80 ? 'HUNGRY' : p.en <= 20 ? 'TIRED' : p.jo >= 80 ? 'HAPPY' : 'OKAY';
}
document.querySelectorAll('[data-a]').forEach(b => b.onclick = () => {
  const a = b.dataset.a;
  if (a === 'sleep') { p.zz = !p.zz; if (p.zz) return show('GOOD NIGHT ♡', '(-_-) zZ'); p.en = cl(p.en + 35); return show("I'M BACK!!", '(˶ᵔ ᵕ ᵔ˶)'); }
  if (p.zz) return show("SHHH... I'M SLEEPING", '(-_-) zZ');
  if (a === 'feed') { p.hu = cl(p.hu - 25); p.jo = cl(p.jo + 5); return show('NOM NOM NOM ♡', '(๑ᵔ⤙ᵔ๑)'); }
  if (p.en < 15) return show("I'M TOO TIRED...", '(=_=)');
  p.jo = cl(p.jo + 20); p.en = cl(p.en - 15); p.hu = cl(p.hu + 10); show('BEST DAY EVER!!', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧');
});
setInterval(() => { if (p.zz) p.en = cl(p.en + 5); else { p.hu = cl(p.hu + 2); p.en = cl(p.en - 1); p.jo = cl(p.jo - 1); } show(); }, 15000);
show();