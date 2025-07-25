const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/css/404.css';
document.head.appendChild(link);

const script = document.createElement('script');
script.src = '/js/404.js';
script.defer = true;
document.head.appendChild(script);

const notfound = {
  template: `
    <div>
      <div class="container">
        <div class="main theme-404">
          <svg class="hidden">
            <defs>
              <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 14 -1" result="goo"></feColorMatrix>
                <feTurbulence type="fractalNoise" baseFrequency="0.009 1" numOctaves="1" seed="1" result="noise"></feTurbulence>
                <feDisplacementMap in="goo" in2="noise" scale="0" result="displacement"></feDisplacementMap>
                <feComposite in="SourceGraphic" in2="displacement" operator="atop"></feComposite>
              </filter>
            </defs>
          </svg>
          <div class="box">404</div>
          <button id="btn404" class="particles-button">Home</button>
        </div>
      </div>
    </div>`
};
