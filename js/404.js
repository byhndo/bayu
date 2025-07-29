window.addEventListener("load", function () {

window.addEventListener("pageshow", ()=>{
	
const feBlur = document.querySelector(`#noise feGaussianBlur`);
const feDisplacementMap = document.querySelector(`#noise feDisplacementMap`);

let primitiveValues = { stdDeviation: 0, scale: 0 };
 
const tl = gsap.timeline({
    defaults: {
      duration: 2,
      ease: 'expo.out',
},
  onUpdate: function () {
      feBlur.setAttribute('stdDeviation', primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute('scale', primitiveValues.scale); 
    }
  });

tl.to(primitiveValues, { 
    startAt: { stdDeviation: 40, scale: 100 },  
    stdDeviation: 0,  
    scale: 0 
  }, 0)

.to(".box", {
    startAt: {
      autoAlpha: 0,
      opacity: 0,  
      scale: .6     
    },
      autoAlpha:1,
      opacity: 1,  
      scale: 1 
  }, 0)
});

(function () {
  const arrOpts = [    
    {
      direction: 'bottom',
      duration: 1000,
      easing: 'easeInExpo'
    }
  ];

  const items = document.querySelectorAll(".main");

  items.forEach((el, pos) => {
    let bttn = el.querySelector("button.particles-button");

    if (!bttn) return; 

    let particlesOpts = arrOpts[pos];
    const particles = new Particles(bttn, particlesOpts);

    let tl = gsap.timeline()
window.addEventListener("pageshow", ()=> {	 
    tl.to(bttn, {
      autoAlpha: 0,
      onComplete: () => {
        particles.integrate({
          duration: 900,
          easing: "easeOutSine"
        });

        gsap.to(bttn, {
          duration: 1,	  
          onComplete: () => {
            bttn.style.opacity = "1";
            bttn.style.visibility = "visible";
	    bttn.style.pointerEvents = "none"; 
	    gsap.to(bttn, {
              onComplete: () => {
                bttn.style.pointerEvents = "none"; 
                gsap.to(bttn, {
                  onComplete: () => {
                  bttn.style.pointerEvents = "auto"; 
                }
              });
             }
            }); 
          }
        })
      }
    }, ">1.5")
});

      bttn.addEventListener("click", () => {
      particles.disintegrate();
    });
  });
})();

const btn = document.getElementById("btn404");
if (btn) {
  btn.addEventListener("click", () => {
    setTimeout(() => {
      location.replace('/');
    }, 2500);
  });
}
	
});
