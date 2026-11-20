(function () {
  var blank = document.getElementById('blank');
  var buttons = document.querySelectorAll('#options button');
  var words = Array.prototype.map.call(buttons, function (b) { return b.textContent; });
  words.push('to be decided');

  document.getElementById('year').textContent = new Date().getFullYear();

  var timer = null;
  var index = 0;

  function show(text) {
    blank.classList.add('is-out');
    setTimeout(function () {
      blank.textContent = text;
      blank.classList.remove('is-out');
    }, 350);
  }

  function cycle() {
    show(words[index]);
    index = (index + 1) % words.length;
  }

  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Rotate the blank once the page has settled, unless motion is reduced.
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) {
    setTimeout(function () {
      cycle();
      timer = setInterval(cycle, 2400);
    }, 1600);
  }

  // Choosing a field stops the rotation and keeps that choice.
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.setAttribute('aria-pressed', 'false');
    btn.addEventListener('click', function () {
      stop();
      Array.prototype.forEach.call(buttons, function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      blank.textContent = btn.textContent;
    });
  });
})();

/* Photo slider: swaps every 5 seconds */
(function () {
  var folder = 'images/gallery/';
  var files = ['photo1.svg', 'photo2.svg', 'photo3.svg', 'photo4.svg', 'photo5.svg'];
  var delay = 5000;

  var slider = document.getElementById('slider');
  if (!slider) return;

  var slides = files.map(function (name, i) {
    var img = new Image();
    img.src = folder + name;
    img.alt = '';
    if (i > 0) img.loading = 'lazy';
    slider.appendChild(img);
    return img;
  });

  var current = 0;
  var timer = null;
  slides[0].classList.add('is-active');

  function next() {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }
  function start() { if (!timer) timer = setInterval(next, delay); }
  function stop()  { clearInterval(timer); timer = null; }

  start();
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', function () {
    document.hidden ? stop() : start();
  });
})();
