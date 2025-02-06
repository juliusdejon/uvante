import { render } from '@testing-library/react-native';

import Dot from '../components/Dot';

describe('<Dot />', () => {
  test('Text renders correctly on Dot', () => {
    const { getByText } = render(<Dot />);

    getByText('Welcome!');
  });
});