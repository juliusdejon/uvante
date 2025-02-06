import React from 'react';
import { render } from '@testing-library/react-native';
import Dot from 'components/Dot';

describe('Dot Component', () => {
  it('renders correctly with the expected styles', () => {
    const { getByTestId } = render(<Dot />);
    const dotElement = getByTestId('u-dot');

    expect(dotElement).toBeTruthy();
    expect(dotElement.props.className).toContain('w-5 h-5 rounded-full bg-blue-500 border-2 border-white');
  });
});
