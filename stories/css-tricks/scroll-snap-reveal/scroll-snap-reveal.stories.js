import '../../../src/components/css-tricks/scroll-snap-reveal/scroll-snap-reveal.css';

export default {
  title: 'CSS-Tricks/ScrollSnapReveal',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => `
    <div class="scroll-snap-reveal-demo">
      <div class="snap-reveal-banner">
        <strong>Scroll-State Snapped Query</strong> — This carousel uses <code>@container scroll-state(snapped)</code>. No JavaScript or Intersection Observers! When a card snaps into the center, the browser applies the "active" animations natively via CSS. Note: Requires Chrome 133+.
      </div>
      
      <div class="snap-reveal-carousel">
        
        <div class="snap-reveal-item">
          <div class="snap-reveal-card">
            <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80');"></div>
            <h3>Retro Gaming</h3>
            <p>Experience the classics reborn.</p>
          </div>
        </div>
        
        <div class="snap-reveal-item">
          <div class="snap-reveal-card">
            <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80');"></div>
            <h3>Abstract Depth</h3>
            <p>Visualizations driven by scroll magic.</p>
          </div>
        </div>
        
        <div class="snap-reveal-item">
          <div class="snap-reveal-card">
            <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80');"></div>
            <h3>Circuit Board</h3>
            <p>Hacking the browser rendering engine.</p>
          </div>
        </div>
        
        <div class="snap-reveal-item">
          <div class="snap-reveal-card">
            <div class="card-image" style="background-image: url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80');"></div>
            <h3>Modern UI</h3>
            <p>Pushing the limits of CSS containers.</p>
          </div>
        </div>
        
      </div>
    </div>
  `,
};
