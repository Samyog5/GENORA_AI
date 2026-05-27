const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const heroText = document.getElementById("hero-text");

const frameCount = 240;
const currentFrame = index => (
  `ezgif-4c7aa135e05c3b21-jpg/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
img.onload = function(){
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  // Calculate max scroll for the animation (600vh - 100vh = 500vh)
  const maxAnimationScroll = window.innerHeight * 5;
  
  // Calculate fraction based only on the first 500vh of scrolling
  let scrollFraction = scrollTop / maxAnimationScroll;
  // Clamp between 0 and 1 so it doesn't exceed frameCount when scrolling past
  scrollFraction = Math.max(0, Math.min(1, scrollFraction));
  
  // Calculate which frame to show
  const frameIndex = Math.min(
    frameCount,
    Math.max(1, Math.ceil(scrollFraction * frameCount))
  );
  
  // Fade out hero text after 25% of animation
  let textOpacity = 1;
  if (scrollFraction > 0.25) {
      // Fade out completely over the next 10% of scroll
      textOpacity = 1 - ((scrollFraction - 0.25) / 0.1);
  }
  heroText.style.opacity = Math.max(0, textOpacity);
  
  requestAnimationFrame(() => updateImage(frameIndex));
});

// Preload the images so there is no flickering during scrolling
preloadImages();

// Simple scroll effect for nav
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('bg-surface/80', 'shadow-lg');
            nav.classList.remove('bg-transparent');
        } else {
            nav.classList.remove('bg-surface/80', 'shadow-lg');
            nav.classList.add('bg-transparent');
        }
    }
});
