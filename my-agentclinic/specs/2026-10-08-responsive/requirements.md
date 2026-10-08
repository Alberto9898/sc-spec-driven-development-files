# Base responsive: Requisiti

Branch: `replanning`
Riferimenti: [missione](../mission.md#principi), [stack tecnologico](../tech-stack.md#responsive-design),
[roadmap](../roadmap.md), [Fase 1](../2026-10-06-hello-hono/requirements.md)

## Contesto

Il responsive design è diventato un requisito di prodotto: la UI deve funzionare da 320px di larghezza in su.
Prima era previsto solo nella Fase 9 (oggi Fase 6), come rifinitura. Rimandarlo avrebbe significato riscrivere il CSS di
ogni pagina alla fine; spostarlo in ogni fase costa poco ora, perché c'è un solo layout e una sola pagina.

Il layout della Fase 1 era già quasi responsive (viewport meta, `max-width` fluido, nessuna larghezza fissa).
Questo intervento formalizza i criteri e chiude le lacune rimaste. Su desktop cambia poco: l'`<h1>`
passa da 32px a 40px e le spaziature laterali crescono fino a 2rem; la struttura resta la stessa.

## Perimetro

### Incluso
- Criteri e approccio responsive in [tech-stack.md](../tech-stack.md#responsive-design); principio in
  [mission.md](../mission.md); requisito trasversale e indicazioni per fase in [roadmap.md](../roadmap.md).
- `static/styles.css` riscritto mobile-first:
  - custom property `--gutter` (spaziatura laterale fluida con `clamp()`), `--content-max`, `--tap-min`;
  - `min-height: 100dvh` (con fallback `100vh`), così su mobile il footer non finisce sotto la barra del browser;
  - `overflow-wrap: break-word` sul body e `max-width: 100%` per immagini, SVG e video;
  - `<h1>` con dimensione fluida (`clamp()`);
  - header in flex con `flex-wrap`, pronto per la navigazione della Fase 2;
  - link del brand con altezza minima di 44px;
  - da `40rem` in su, più spazio verticale nel `main`.
- Un test Vitest che verifica il viewport meta senza `maximum-scale` né `user-scalable`.

### Escluso
- Menu di navigazione, hero, palette e branding (Fase 2).
- Test automatici del layout nel browser (es. Playwright).
- Stili per tabelle e form: non ci sono ancora; i criteri sono fissati in tech-stack.md per le fasi 7 e 8 (oggi 4 e 5).

## Decisioni

| Decisione | Motivazione |
|---|---|
| Responsive come requisito di ogni fase, non della Fase 9 (oggi Fase 6) | Costa meno farlo subito su poche pagine che riscriverle alla fine; la fase di rifinitura resta solo come verifica d'insieme. |
| 320px come larghezza minima | È il riferimento del reflow WCAG 2.1 (1.4.10) e copre gli smartphone più stretti in uso. |
| Breakpoint `40rem` / `64rem` | Pochi e legati al contenuto; in `rem`, così rispettano la dimensione del font scelta dall'utente. |
| Target touch di 44px | Valore delle linee guida Apple e del criterio WCAG 2.5.5 (AAA); più prudente del minimo AA (24px). |
| Solo CSS, nessun JavaScript | Coerente con server-first e progressive enhancement. |
| Verifica visiva manuale | Vitest non esegue il layout; un browser headless sarebbe uno strumento in più, non giustificato per una pagina. |

## Punti aperti / rischi
- **La verifica visiva resta manuale.** Con molte pagine (dalla tappa 2c, agenti, in poi) controllarle a mano a 3 larghezze
  diventa costoso e facile da saltare. Se succede, valutare Playwright con un controllo automatico dello scroll orizzontale.
- **`100dvh`** non è supportato da browser vecchi; il fallback `100vh` copre il caso, con il solo difetto
  della barra del browser mobile.
