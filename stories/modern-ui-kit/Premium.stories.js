import '../../css/modern-ui-kit/globals.css';
import '../../css/modern-ui-kit/components.css';
import '../../css/modern-ui-kit/premium.css';

export default {
    title: 'Modern UI Kit/Premium Visuals',
    parameters: {
        layout: 'centered',
    },
};

export const BorderBeam = {
    render: () => `
    <div class="premium-border-beam" style="width: 300px; padding: 2rem; background: hsl(var(--card)); box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
        <h3 class="ui-card-title">Border Beam</h3>
        <p class="ui-card-description" style="margin-top: 1rem;">A glowing beam traveling along the bounding box. Uses CSS @property.</p>
    </div>
  `
};

export const BentoGrid = {
    render: () => {
        const container = document.createElement('div');
        container.className = 'premium-bento-grid';

        const items = [
            { class: 'bento-1', title: 'Main Feature', desc: 'Powerful analytics' },
            { class: 'bento-2', title: 'Integrations', desc: 'Sync with 100+ tools' },
            { class: 'bento-3', title: 'Security', desc: 'Enterprise Grade' },
            { class: 'bento-4', title: 'API', desc: 'Restful Support' },
        ];

        container.innerHTML = items.map(item => `
            <div class="bento-item ${item.class}">
                <div class="bento-glow"></div>
                <h4 style="margin: 0; font-size: 1.1rem; font-weight: 600;">${item.title}</h4>
                <p style="margin: 0.5rem 0 0; font-size: 0.875rem; color: hsl(var(--muted-foreground));">${item.desc}</p>
            </div>
        `).join('');

        container.querySelectorAll('.bento-item').forEach(item => {
            item.onmousemove = (e) => {
                const rect = item.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                item.style.setProperty('--x', `${x}%`);
                item.style.setProperty('--y', `${y}%`);
            };
        });

        return container;
    }
};

export const RetroGrid = {
    render: () => `
        <div class="premium-retro-grid">
            <div class="retro-grid-lines"></div>
            <div class="retro-sun"></div>
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;">
                <h2 style="color: #ff0080; font-size: 3rem; font-weight: 900; font-style: italic; text-shadow: 0 0 20px #ff0080; letter-spacing: 0.1em;">OVERDRIVE</h2>
            </div>
        </div>
    `
};

export const MeteorsEffect = {
    render: (args) => {
        const container = document.createElement('div');
        container.style.cssText = `
        position: relative;
        width: 600px;
        height: 300px;
        background: #0f172a;
        border-radius: var(--radius);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    `;

        const meteorContainer = document.createElement('div');
        meteorContainer.className = 'premium-meteors-container';

        for (let i = 0; i < args.count; i++) {
            const meteor = document.createElement('span');
            meteor.className = 'meteor';
            meteor.style.top = Math.random() * 100 + '%';
            meteor.style.left = Math.random() * 100 + '%';
            meteor.style.animationDelay = Math.random() * (0.8 - 0.2) + 0.2 + 's';
            meteor.style.animationDuration = Math.floor(Math.random() * (10 - 2) + 2) + 's';
            meteorContainer.appendChild(meteor);
        }

        container.appendChild(meteorContainer);
        container.innerHTML += `
        <h2 style="color: white; font-weight: 800; z-index: 10; font-size: 2.5rem; letter-spacing: -0.05em;">METEORS</h2>
    `;

        return container;
    },
    args: {
        count: 20
    }
};

export const ShimmerButtons = {
    render: () => `
    <div style="display: flex; gap: 2rem;">
        <button class="premium-shimmer-btn">Shimmer Dark</button>
        <button class="premium-shimmer-btn" style="--bg-color: #6366f1;">Shimmer Purple</button>
    </div>
  `
};

export const AuroraText = {
    render: () => `
    <div style="text-align: center;">
        <h1 class="premium-aurora-text" style="font-size: 5rem; line-height: 1;">AESTHETIC</h1>
        <p style="margin-top: 1rem; color: #64748b; font-weight: 500;">Native CSS Animated Gradients</p>
    </div>
  `
};
