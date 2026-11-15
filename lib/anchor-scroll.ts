/*
  Якорь навигациясы: бөлімге шапканың астына дәл, кішкене аралықпен скролл.
  Офсет CSS-тегі section[id] { scroll-margin-top } мәнінен алынады —
  мобильді/десктоп мәндері тек globals.css-те анықталады (бір дереккөз).
*/

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Бөлімнің басы шапкадан төмен тұруы үшін қажетті scrollY. */
function targetY(el: HTMLElement) {
  if (el.id === "top") return 0;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const y = el.getBoundingClientRect().top + window.scrollY - margin;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(y, max));
}

function waitForScrollEnd(): Promise<void> {
  return new Promise((resolve) => {
    let last = window.scrollY;
    let still = 0;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scrollend", finish);
      resolve();
    };
    window.addEventListener("scrollend", finish, { once: true });
    /* scrollend қолдамайтын браузерлерге (ескі Safari) қосымша тексеру */
    const tick = () => {
      if (done) return;
      const y = window.scrollY;
      still = y === last ? still + 1 : 0;
      last = y;
      if (still >= 6) finish();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(finish, 2000);
  });
}

let token = 0;

/**
 * Бөлімге плавно скроллдайды. Скролл кезінде жоғарыдағы контент
 * (суреттер, т.б.) биіктігін өзгертсе, соңында позицияны түзетеді.
 */
export async function scrollToSection(id: string, { smooth = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return false;
  const my = ++token;
  const behavior: ScrollBehavior = smooth && !prefersReducedMotion() ? "smooth" : "instant";

  window.scrollTo({ top: targetY(el), behavior });
  for (let i = 0; i < 3; i++) {
    await waitForScrollEnd();
    if (my !== token) return true; // жаңа навигация басталды
    const y = targetY(el);
    if (Math.abs(window.scrollY - y) <= 1) break;
    window.scrollTo({ top: y, behavior: "instant" });
  }
  return true;
}

/** Мобильді мәзір жабылып, body скролл-құлпы алынғанша күту (2 кадр). */
export function afterNextPaint(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
}
