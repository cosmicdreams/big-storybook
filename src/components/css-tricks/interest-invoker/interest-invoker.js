// Feature detect Interest Invoker API
const supportsInterestInvoker = 'interestTargetElement' in HTMLElement.prototype;

export function initInterestInvoker(container) {
  if (supportsInterestInvoker) {
    // Native — nothing needed, CSS handles it
    container.querySelectorAll('[data-interest-badge]').forEach(el => {
      el.textContent = 'Native API';
      el.classList.add('is-native');
    });
    return;
  }

  // Polyfill: simulate interest-show-delay / interest-hide-delay with setTimeout
  container.querySelectorAll('[interesttarget]').forEach(trigger => {
    const targetId = trigger.getAttribute('interesttarget');
    const target = document.getElementById(targetId);
    if (!target) return;

    const showDelay = parseInt(
      getComputedStyle(trigger).getPropertyValue('--interest-show-delay') || '200',
    );
    const hideDelay = parseInt(
      getComputedStyle(trigger).getPropertyValue('--interest-hide-delay') || '300',
    );

    let showTimer, hideTimer;

    trigger.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
      showTimer = setTimeout(() => target.showPopover?.(), showDelay);
    });

    trigger.addEventListener('mouseleave', () => {
      clearTimeout(showTimer);
      hideTimer = setTimeout(() => target.hidePopover?.(), hideDelay);
    });

    target.addEventListener('mouseenter', () => clearTimeout(hideTimer));

    target.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => target.hidePopover?.(), hideDelay);
    });
  });

  container.querySelectorAll('[data-interest-badge]').forEach(el => {
    el.textContent = 'JS Polyfill';
    el.classList.add('is-polyfill');
  });
}
