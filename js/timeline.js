(function () {
  const track = document.getElementById('timelineTrack');
  if (!track) return;

  const slides = [...track.querySelectorAll('.timeline-slide')];
  const prevBtn = document.querySelector('.timeline-prev');
  const nextBtn = document.querySelector('.timeline-next');
  const scrubber = document.getElementById('timelineScrubber');

  // Build the clickable scrubber (year + mini title per slide) from the slide content
  const spots = slides.map((slide, i) => {
    const year = slide.querySelector('.timeline-year')?.textContent.trim() || '';
    const title = slide.querySelector('h3')?.textContent.trim() || '';

    const spot = document.createElement('button');
    spot.type = 'button';
    spot.className = 'timeline-spot';
    spot.setAttribute('aria-label', `Ir para ${title}, ${year}`);
    spot.innerHTML = `
      <span class="timeline-spot-year">${year}</span>
      <span class="timeline-spot-dot"></span>
      <span class="timeline-spot-title">${title}</span>
    `;
    spot.addEventListener('click', () => scrollToIndex(i));
    scrubber?.appendChild(spot);
    return spot;
  });

  function updatePadding() {
    const viewportWidth = track.parentElement.clientWidth;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const pad = Math.max((viewportWidth - slideWidth) / 2, 16);
    track.style.paddingLeft = pad + 'px';
    track.style.paddingRight = pad + 'px';
  }

  function closestIndex() {
    const trackRect = track.getBoundingClientRect();
    const center = trackRect.left + trackRect.width / 2;
    let closest = 0;
    let closestDist = Infinity;
    slides.forEach((slide, i) => {
      const r = slide.getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - center);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  }

  function updateActive() {
    const idx = closestIndex();
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === idx));
    spots.forEach((spot, i) => spot.classList.toggle('is-active', i === idx));
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.disabled = idx === slides.length - 1;
    spots[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  function scrollToIndex(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    const target = slides[i];
    const targetCenter = target.offsetLeft + target.offsetWidth / 2;
    track.scrollTo({ left: targetCenter - track.clientWidth / 2, behavior: 'smooth' });
  }

  let scrollTicking = false;
  track.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateActive();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    updatePadding();
    scrollToIndex(closestIndex());
  });

  prevBtn?.addEventListener('click', () => scrollToIndex(closestIndex() - 1));
  nextBtn?.addEventListener('click', () => scrollToIndex(closestIndex() + 1));

  // Mouse drag-to-scroll (desktop, where there's no touch swipe)
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    dragged = false;
    track.classList.add('is-dragging');
    startX = e.pageX;
    startScroll = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
    scrollToIndex(closestIndex());
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 4) dragged = true;
    track.scrollLeft = startScroll - dx;
  });

  // Prevent the click-through on a slide right after a drag
  track.addEventListener('click', (e) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  updatePadding();
  updateActive();
})();
