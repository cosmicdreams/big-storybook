/**
 * Proximity polyfill — sets CSS custom properties on `el` based on cursor distance.
 *
 * --proximity : 1 (touching) … 0 (far away / beyond maxDistance)
 * --distance  : raw px distance from pointer to nearest edge of bounding box
 */

export function initProximity(el, maxDistance = 300) {
  let pointerX = -9999;
  let pointerY = -9999;
  let rafId = null;

  function distanceToRect(px, py, rect) {
    // Clamp pointer to nearest point on the bounding box
    const cx = Math.max(rect.left, Math.min(px, rect.right));
    const cy = Math.max(rect.top, Math.min(py, rect.bottom));
    const dx = px - cx;
    const dy = py - cy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function update() {
    rafId = null;
    const rect = el.getBoundingClientRect();
    const dist = distanceToRect(pointerX, pointerY, rect);
    const proximity = Math.max(0, 1 - dist / maxDistance);

    el.style.setProperty('--proximity', proximity.toFixed(4));
    el.style.setProperty('--distance', dist.toFixed(0));

    // Update readouts if they exist inside the demo container
    const demo = el.closest('.proximity-demo') || el.parentElement;
    if (demo) {
      const dReadout = demo.querySelector('[data-readout="distance"]');
      const pReadout = demo.querySelector('[data-readout="proximity"]');
      const zReadout = demo.querySelector('[data-readout="zone"]');
      if (dReadout) dReadout.textContent = `${dist.toFixed(0)}px`;
      if (pReadout) pReadout.textContent = proximity.toFixed(2);
      if (zReadout) {
        if (dist < 100) zReadout.textContent = 'Very close';
        else if (dist < 200) zReadout.textContent = 'Close';
        else zReadout.textContent = 'Far';
      }
    }
  }

  function onPointerMove(e) {
    pointerX = e.clientX;
    pointerY = e.clientY;
    if (!rafId) {
      rafId = requestAnimationFrame(update);
    }
  }

  document.addEventListener('mousemove', onPointerMove);

  // Return a cleanup function so callers can tear down if needed
  return function destroy() {
    document.removeEventListener('mousemove', onPointerMove);
    if (rafId) cancelAnimationFrame(rafId);
  };
}
