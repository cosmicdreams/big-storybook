import '../../../src/components/css-tricks/scroll-switchback/scroll-switchback.css';

export default {
  title: 'CSS-Tricks/ScrollSwitchback',
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  render: () => `
    <div class="scroll-switchback-demo">
      <div class="switchback-banner">
        <strong>Non-Linear Switchback Container</strong> — This uses <code>@container scroll-state</code> to detect when you hit the rightmost horizontal boundary, and then magically flips <code>overflow-y</code> to allow scrolling downwards. Note: Requires Chrome 133+.
      </div>
      
      <div class="switchback-viewport">
        <div class="switchback-container">
          <!-- The massive content wrapper -->
          <div class="switchback-content-w">
            <div class="switchback-panel panel-1">
              <h3>Start Journey</h3>
              <p>Swipe or scroll Right →</p>
            </div>
            
            <div class="switchback-panel panel-2">
              <h3>Almost There</h3>
              <p>Keep going Right →</p>
            </div>
            
            <div class="switchback-panel panel-corner">
              <h3>The Corner</h3>
              <p>You've hit the right wall.</p>
              <div class="corner-msg"></div>
            </div>
          </div>
          
          <!-- The vertical downward path (only accessible once corner is reached) -->
          <div class="vertical-track">
            <!-- Space filler -->
             <div style="height: 100cqh;"></div>
             <div class="switchback-panel panel-vertical-end">
               <h3>Level 2 Reached!</h3>
               <p>Welcome to the vertical dimension.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  `,
};
