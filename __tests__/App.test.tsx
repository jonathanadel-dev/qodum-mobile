/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import WelcomeScreen from '../src/screens/auth/WelcomeScreen';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});

test('welcome tap hint remains visible above decorative elements', () => {
  const component = ReactTestRenderer.create(
    <WelcomeScreen navigation={{ navigate: jest.fn() }} />,
  );

  const hint = component.root.findByProps({ children: 'Tap anywhere to continue' });
  const styles = Array.isArray(hint.props.style)
    ? hint.props.style
    : [hint.props.style];

  expect(styles.some((style) => style && style.zIndex === 2)).toBe(true);
  expect(styles.some((style) => style && style.color === '#4B5B6B')).toBe(true);
});
