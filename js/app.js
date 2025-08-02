window.addEventListener("load", function () {
	
var width = 100,
  perfData = window.performance.timing,
  EstimatedTime = Math.abs(perfData.loadEventEnd - perfData.navigationStart),
  time = Math.floor((EstimatedTime / 1000) % 60) * 100;

$(".loadbar").animate({
  width: width + "%"
}, time);

var PercentageID = $("#precent"),
  start = 0,
  end = 100,
  duration = time;
animateValue(PercentageID, start, end, duration);

function animateValue(id, start, end, duration) {
  var range = end - start,
    current = start,
    increment = end > start ? 1 : -1,
    stepTime = Math.abs(Math.floor(duration / range)),
    obj = $(id);

  var timer = setInterval(function () {
    current += increment;
    $(obj).text(current);
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
} 

async function animateLoader() {
  await new Promise((resolve) => setTimeout(resolve, time));
	
  let percentBar = document.getElementById("precent");
  let loadingBar = document.getElementById("loader");

  const DOM = {};
  DOM.intro = document.querySelector(".preloader-wrap");
  DOM.shape = DOM.intro.querySelector("svg.shape");
  DOM.path = DOM.intro.querySelector("path.goey");	
  let tl = gsap.timeline({
  paused: true,
  onComplete: () => {
    contentShow(); 
    ScrollTrigger.refresh(); 
   }
  });
		    	
  tl.to(".percentage", {
    autoAlpha: 0,
    duration: 1,
    delay: 1,
    ease: "none",
    onComplete: () => {
      percentBar.style.display = "none";
      tl.to("#loader", {
        autoAlpha: 0,
        duration: 1,
        ease: "quart.out",
        onComplete: () => {
          loadingBar.style.display = "none";
          tl.to(DOM.intro, {
            y: "-200vh",
            delay: 0.1,
            duration: 2,
            ease: "quad.inOut"
          });
          gsap.to(DOM.path, {
            duration: 1.2,
            ease: "linear",
            attr: { d: DOM.path.getAttribute("pathdata:id") }
          });
        }
      });
    }
  });  
	    	  	
  (function show() {
    const arrOpts = [{      
      direction: 'bottom',
      duration: 1000,
      easing: 'easeInExpo'
    }];

    const it = document.querySelectorAll(".wrapbtnloader");
    it.forEach((il, pos) => {
      let bttn = il.querySelector("button.particles-button");
      if (!bttn) return;
      let particlesOpts = arrOpts[pos];
      const particles = new Particles(bttn, particlesOpts);

      gsap.to(bttn, {
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
          });
        }
      });

      gsap.to(bttn, {
        onComplete: () => {
          bttn.addEventListener("click", function () {
            particles.disintegrate();
            tl.play();
          });
        }
      });
    });
  })();
}

animateLoader();

gsap.registerPlugin(ScrollTrigger, SplitText);
function contentShow() {
const easing = "expoScale(0.5,7,none)";
const dur = 1;
const once = "play none none reset";
const delaytl = .5;

$('html, body').css({
  'overflow': 'auto',
  'height': 'auto'
});	

function preloadImages(container) {
  const images = container.querySelectorAll("img");
  const promises = [];
  images.forEach((img) => {
    if (img.complete) return;
    promises.push(new Promise((resolve) => {
      img.onload = img.onerror = resolve;
    }));
  });
  return Promise.all(promises);
}
	
const { createApp, ref, watch, onMounted, nextTick } = Vue;
const { createRouter, createWebHistory, useRoute, useRouter } = VueRouter;

const app = createApp({
  setup() {
    const route = useRoute();
    const router = useRouter();
    
    const bg = ref('bio');
    const firstLoad = ref(true);

    const btnNav1 = ref(null);
    const btnNav2 = ref(null);

const updateButtonColors = (path) => {
  if (!btnNav1.value || !btnNav2.value) return;

  let bgColor, textColor;

  if (path === '/bio') {
    bgColor = '#3C4048';   
    textColor = '#e6e7eb'; 
  } else if (path === '/photos') {
    bgColor = '#e6e7eb';   
    textColor = '#3C4048'; 
  } 

  gsap.to([btnNav1.value, btnNav2.value], {
    backgroundColor: bgColor,
    color: textColor,
    duration: .9,
    delay: 1.03
  });
};
	  
    const beforeEnter = async (el, done) => {
      await preloadImages(el);       
      await nextTick();                    
      ScrollTrigger.refresh();
      done();
    };

    const afterEnter = async (el, done) => {                              
      await nextTick();
      setupReveal(el);
      ScrollTrigger.refresh();
      done();                       
    };
	  
    const afterLeave = (el) => {
      if (el.ctx) {
        el.ctx.revert();
        delete el.ctx;	      
      }
};

   const goToBio = () => {
      if (route.path === '/bio') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      
      } else {
        bg.value = 'bio';
        router.push('/bio');
      }
    };

    const goToPhotos = () => {
      if (route.path === '/photos') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
     
      } else {
        bg.value = 'photos';
        router.push('/photos');
     }
    };

    const triggerAnimation = () => {
    animePath(bg.value);      
    };

    onMounted(() => {	    
      if (route.path !== '/bio') {
        router.replace('/bio');
        bg.value = 'bio';
      }
      nextTick(() => {
	updateButtonColors(route.path); 
        triggerAnimation();
        firstLoad.value = false;
      });
    });

    watch(
      () => route.path,
      (newPath) => {
        if (firstLoad.value) return;

        if (newPath === '/bio') {
          bg.value = 'bio';
        } else if (newPath === '/photos') {
          bg.value = 'photos';
        }

	nextTick(() => {
	updateButtonColors(newPath);
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        triggerAnimation();
        });
       }
    );

    return {
      bg,
      goToBio,
      goToPhotos,
      beforeEnter,
      afterEnter,
      afterLeave,
      btnNav1,
      btnNav2
    };
  },
});

app.use(router);
app.mount("#app");
				
const title = document.querySelector("h1");
const feBlur = document.querySelector(`#noisetitle feGaussianBlur`);
const feDisplacementMap = document.querySelector(`#noisetitle feDisplacementMap`);

let primitiveValues = { stdDeviation: 0, scale: 0 };

const titletl = gsap.timeline({
    defaults: {
      duration: 2.3,
      ease: "quart.out"
    },

    onUpdate: () => {
      feBlur.setAttribute("stdDeviation", primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute("scale", primitiveValues.scale);
    }
  })
	
.to(primitiveValues, { 
    startAt: { stdDeviation: 50, scale: 250 },  
    stdDeviation: 0,  
    scale: 0  
  }, 0)

.to(title, { 
    startAt: {
      autoAlpha:0,
      opacity: 0  
    },
      autoAlpha:1,
      opacity: 1
}, 0);    
	  
let subtitle = SplitText.create(".sub-title", { type: "chars, words" });
  
gsap.set(subtitle.chars, {
  autoAlpha:0,
  opacity:0
});
gsap.to(subtitle.chars, {
    duration: 2,
    autoAlpha:1,
    opacity: 1,
    ease: "quart.out",
    stagger: { from: "random", each: 0.03}
  }, "<");
gsap.set(".sub-title", {
  autoAlpha:1,
  opacity:1
});
	    
(function () {
  const arrOpts = [
    {
      color: "#068FFF",
      direction: "right",
      duration: 1000,
      easing: "easeInOutCubic"
    },

    {
      color: "#068FFF",
      direction: "left",
      duration: 1000,
      easing: "easeInOutCubic"
    }
  ];

  const items = document.querySelectorAll(".nav");

  items.forEach((el, pos) => {
    let bttn = el.querySelector(".particles-button");    
    bttn.style.pointerEvents = "none";    
    let particlesOpts = arrOpts[pos];
    const particles = new Particles(bttn, particlesOpts);
    let tl = gsap.timeline();
tl.to(items, {autoAlpha: 1});     
  bttn.addEventListener("click", () => {    
    tl.to(bttn,{
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
          });
        }
      },">1");
     }); 

bttn.addEventListener("click", () => {      
      tl.to(items, {autoAlpha: 1});
      tl.to(bttn,{
          autoAlpha: 0,
          onUpdate: () => {
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
            });
          }
        },"+=1.5");
      }); 

      tl.to(bttn,{
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
          });
        }
      },pos + 1.3);
    
    bttn.addEventListener("click", () => {      
      particles.disintegrate();               
    });
  });
})();

gsap.set('.indicator', {
 y:-100	
});
	
gsap.to('.indicator', {
 y:0,
 duration:dur,
 autoAlpha: 1,
 ease: easing,
 onComplete: () => {
 gsap.fromTo('.indicator', {
  autoAlpha: 1,
  y:0,
  ease: easing
 }, {
  autoAlpha: 0,
  y:-100,
  duration: dur,
  ease: easing,
  scrollTrigger: {
  scrub: 3,
  trigger: '.indicator',
  start: 'center 40%',
  end: 'center 70%'					
  }
 });
}
}, "+=2");
                    
gsap.to('.header', {  
 onComplete: () => {
  gsap.to(".header", {  
   y: "5dvh",
   ease: "cubic.out",
   scrollTrigger: {
    scrub: 3.5,
    trigger: '.header',
    start: 'top top'
  }
  })
    }
});

function animePath(bg){
const bioPath = document.getElementById("bioPath");
const photosPath = document.getElementById("photosPath");

const paths = {
    step1: {
      unfilled: "M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z",
      inBetween: "M 0 0 h 33 c -30 54 113 65 0 100 H 0 V 0 Z",             
      filled: "M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z"
    },

    step2: {
      unfilled: "M 100 0 h 0 c 0 50 0 50 0 100 H 100 V 0 Z",  
      inBetween: "M 100 0 h -33 c 30 54 -113 65 0 100 H 100 V 0 Z",
      filled: "M 100 0 h -100 c 0 50 0 50 0 100 H 100 V 0 Z"
    }
};
	
if (bg === 'bio' && bioPath) {

 const tl1 = gsap.timeline()
 
    .set(bioPath, {attr: { d: paths.step1.unfilled }})
    .to(bioPath,{duration: 1.1, ease: "power3.in", attr: { d: paths.step1.inBetween }}, 0)
    .to(bioPath, {duration: .5, ease: "power1", attr: { d: paths.step1.filled } });

}
else if (bg === 'photos' && photosPath) {

 const tl2 = gsap.timeline() 
  
    .set(photosPath, {attr: { d: paths.step2.unfilled }})
    .to(photosPath, {duration: 1.1, ease: "power3.in", attr: { d: paths.step2.inBetween }}, 0)
    .to(photosPath, {duration: .5, ease: "power1", attr: { d: paths.step2.filled } });  

}
}
	
const lenis = new Lenis({
 duration: 2,
 easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
 orientation: "vertical",
 direction: "vertical",
 gestureDirection: "vertical",
 smooth: 2,
 smoothWheel: 2,
 touchMultiplier: 2,
 wheelMultiplier: 2, 
 touchInertiaMultiplier: 35,
 syncTouch: true,
 autoResize: true
});

lenis.on('scroll', (e) => {
  console.log(e);
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0);

	
function setupReveal(container) {
container.ctx = gsap.context(() => {	
	
const RevealBoxsme = container.querySelectorAll(".boxme");
   RevealBoxsme.forEach((boxme, a) => { 	   	   
    const aboutme = boxme.querySelectorAll(".aboutme");
    let tl = gsap.timeline({
    scrollTrigger: {
     trigger: boxme,
     toggleActions: once
     }, delay:delaytl
     }); 

tl.set(aboutme, {
 y:50	
});
	   
tl.to(aboutme, {
 autoAlpha: 1,
 opacity: 1,
 y:0,
 duration:dur,
 stagger:.07,
 ease: easing
}, a * .2);

});	  
	 
const RevealBoxs = container.querySelectorAll(".box");
   RevealBoxs.forEach((box, g) => { 	   	   
    const gr = box.querySelectorAll(".gr");
    let tl = gsap.timeline({
    scrollTrigger: {
     trigger: box,
     toggleActions: once
     }, delay:delaytl
     }); 

tl.set(gr, {
 autoAlpha:1
});
	   
tl.to(gr, {
 duration:dur,	
 width:"100%",
 stagger:.07,
 ease:easing
}, g * .2);	

});	  
	 
const RevealBoxsline = container.querySelectorAll(".boxline");
   RevealBoxsline.forEach((boxline, l) => { 	   	   
    const line = boxline.querySelectorAll(".line");
    let tl = gsap.timeline({
    scrollTrigger: {
     trigger: boxline,
     toggleActions: once
     }, delay:delaytl
     }); 

tl.set(line, {
 autoAlpha:1
});
	   
tl.to(line, {
 duration: dur,	
 width: "100%",
 stagger: .07,
 ease: easing
}, l * .2);	

});	  
	 
const RevealBoxs1 = container.querySelectorAll(".box1");
RevealBoxs1.forEach((box1) => { 	
const one = box1.querySelectorAll(".one"); 
const feBlur = box1.querySelector(`#noiseone feGaussianBlur`);
const feDisplacementMap = box1.querySelector(`#noiseone feDisplacementMap`);
          
let primitiveValues = { stdDeviation: 0, scale: 0 };
 
const tl = gsap.timeline({
    defaults: {
      duration: 2,
      ease: 'expo.out'
},
  
  onUpdate: () => {
      feBlur.setAttribute('stdDeviation', primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute('scale', primitiveValues.scale);
    },  
    
  scrollTrigger: {
     trigger: box1, 
     toggleActions: once
    }, delay:delaytl
  });

tl.to(primitiveValues, { 
    startAt: { stdDeviation: 35, scale: 250 },  
    stdDeviation: 0,  
    scale: 0 
  }, 0)

.to(one, { 
    duration: 1.3,
    startAt: {
      opacity: 0, 
      autoAlpha:0,
      scale: 0.8,
      yPercent: 20
    },
    opacity: 1, 
    autoAlpha:1,
    scale: 1,
    yPercent: 0  
  }, 0);

});

const revealvline = container.querySelectorAll(".vline");
revealvline.forEach((vline) => {
  const vl = vline.querySelectorAll(".vl");             
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: vline,
      toggleActions: once,
      scrub: 2,
      start: "top bottom",
      end : "bottom 50%"
    }, delay:delaytl
  });

tl.set(vl, {
 autoAlpha:1
});
	
tl.to(vl, {
 height:"200px"
})
  
});

const rboxs = container.querySelectorAll(".rbox");
rboxs.forEach((rbox) => { 	
const one2 = rbox.querySelectorAll(".one2"); 
const feBlur = rbox.querySelector(`#noisetwo feGaussianBlur`);
const feDisplacementMap = rbox.querySelector(`#noisetwo feDisplacementMap`);
          
let primitiveValues = { stdDeviation: 0, scale: 0 };
 
const tl = gsap.timeline({
    defaults: {
      duration: 2,
      ease: 'expo.out'
},
  
  onUpdate: () => {
      feBlur.setAttribute('stdDeviation', primitiveValues.stdDeviation);
      feDisplacementMap.setAttribute('scale', primitiveValues.scale);
    },  
    
  scrollTrigger: {
     trigger: rbox, 
     toggleActions: once
    }, delay:delaytl
  });

tl.to(primitiveValues, { 
    startAt: { stdDeviation: 35, scale: 250 },  
    stdDeviation: 0,  
    scale: 0 
  }, 0)

.to(one2, { 
    duration: 1.3,
    startAt: {
      opacity: 0, 
      autoAlpha:0,
      scale: 0.8,
      yPercent: 20
    },
    opacity: 1, 
    autoAlpha:1,
    scale: 1,
    yPercent: 0  
  }, 0);

});
		 
const RevealBoxs2 = container.querySelectorAll(".box2");
 RevealBoxs2.forEach((box2, i) => { 	   	   
 const two = box2.querySelectorAll(".two");
 let tl = gsap.timeline({
  scrollTrigger: {
   trigger: box2,
   toggleActions: once
   }, delay:delaytl
   });
	 
tl.set(two, {
 y:50	
});
	 
tl.to(two, {
 autoAlpha: 1,
 opacity: 1,
 y:0,
 duration: dur,
 stagger:.07,
 ease: easing
}, i * .2);
	   
});      
      	 
document.fonts.ready.then(() => {
const RevealBoxs3 = container.querySelectorAll(".box3");
 RevealBoxs3.forEach((box3) => {
 const quote = box3.querySelector(".quote");
      
 if (quote.splitText) {
    quote.splitText.revert();
 }
   
 const split = SplitText.create(quote, { type: "chars, words" });    
 quote.splitText = split; 
   
 let tl = gsap.timeline({
 scrollTrigger: {
  trigger: box3,
  toggleActions: once,
  scrub:2,
  start: "top bottom",
  end : "bottom 50%"
 }, delay:delaytl
 })
 
.set(split.chars, { autoAlpha: 0 })
.set(quote, { autoAlpha: 1 })
   
.to(split.chars, {
 ease: "expo.in",
 autoAlpha:1,
 opacity: 1,
  stagger: { from: "random", each: 0.01 }
}) 
});  
});
	 
const revealContainers = container.querySelectorAll(".item"); 
 revealContainers.forEach((el, i) => {
 let tl = gsap.timeline({ 
 scrollTrigger: {
  trigger: el,
  toggleActions: once
  }, delay:delaytl
 });
	 
tl.to(el, {
 autoAlpha: 1,
 "--x": "-98.75%",
 ease: "steps(39)",
 duration: 2
}, i * .02);

});

const items = container.querySelectorAll(".sc");
  items.forEach((soc) => {
    const item = soc.querySelectorAll(".item-soc");                              
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: soc,
        toggleActions: once
      }, delay:delaytl
    });
	  	  
tl.to(item, {
 autoAlpha:1,
 duration: dur,
 ease: easing
});	  
          
})
        	 
const RevealBoxs4 = container.querySelectorAll(".box4");
 RevealBoxs4.forEach((box4) => {
 const footer = box4.querySelectorAll(".footer");                              
 let tl = gsap.timeline({
 scrollTrigger: {
  trigger: box4,
  toggleActions: once
 }, delay:delaytl
 });  
	 
tl.to(footer, {
 autoAlpha:1,
 duration:dur,
 ease: easing
}); 
		 	                                                                                                                  
});	
	
}, container); /* ctx */
		
} /* setupReveal */
	 
}
	
})
