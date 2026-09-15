/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import WelcomeScreen from '../src/screens/auth/WelcomeScreen';

test('renders correctly', async () => {
  let component!: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    component = ReactTestRenderer.create(<App />);
  });

  await ReactTestRenderer.act(() => {
    component.unmount();
  });
});

test('welcome tap hint remains visible above decorative elements', async () => {
  let component!: ReactTestRenderer.ReactTestRenderer;

  await ReactTestRenderer.act(() => {
    component = ReactTestRenderer.create(
      <WelcomeScreen navigation={{ navigate: jest.fn() }} />,
    );
  });

  const hint = component.root.findByProps({ children: 'Tap anywhere to continue' });
  const styles = Array.isArray(hint.props.style)
    ? hint.props.style
    : [hint.props.style];

  expect(styles.some((style) => style && style.zIndex === 2)).toBe(true);
  expect(styles.some((style) => style && style.color === '#4B5B6B')).toBe(true);

  await ReactTestRenderer.act(() => {
    component.unmount();
  });
});
