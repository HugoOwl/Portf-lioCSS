class IntersectionObserverList {
    constructor() {
      this.mapping = new Map();
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const callback = this.mapping.get(entry.target);
            callback && callback(entry.isIntersecting);
          });
        },
        {
          rootMargin: "300px 0px 300px 0px",
        }
      );
    }
  
    add(element, callback) {
      this.mapping.set(element, callback);
      this.observer.observe(element);
    }
  
    remove(element) {
      this.mapping.delete(element);
      this.observer.unobserve(element);
    }
  }
  
  const observer = new IntersectionObserverList();
  
  document.addEventListener("mousemove", (e) => {
    const cursor = document.getElementById("cursor");
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  document.querySelectorAll('[data-animate="true"]').forEach((element) => {
    observer.add(element, (isIntersecting) => {
      if (isIntersecting) {
        element.classList.add("animate-slide-down");
      } else {
        element.classList.remove("animate-slide-down");
      }
    });
  });
  