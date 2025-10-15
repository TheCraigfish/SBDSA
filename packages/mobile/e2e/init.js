import 'detox/init';

// Set up global test environment
global.device = device;
global.expect = expect;
global.element = element;
global.by = by;

// Add custom matchers if needed
expect.extend({
  toBeVisible(received) {
    const pass = received !== null;
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be visible`,
      pass,
    };
  },
});