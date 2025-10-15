import React from 'react';
import { render } from '@testing-library/react-native';
import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<LoadingIndicator />);
    
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should render with custom size', () => {
    const { getByTestId } = render(<LoadingIndicator size="large" />);
    
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should render with custom color', () => {
    const { getByTestId } = render(<LoadingIndicator color="#ff0000" />);
    
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('should render with custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(<LoadingIndicator style={customStyle} />);
    
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
});