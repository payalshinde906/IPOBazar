import { Text } from 'react-native';

import { render } from '../../test-utils';
import { Card } from '../Card';

describe('Card', () => {
  it('renders its children', async () => {
    const { getByText } = await render(
      <Card>
        <Text>Card content</Text>
      </Card>,
    );

    expect(getByText('Card content')).toBeTruthy();
  });

  it('uses the surface background token', async () => {
    const { getByTestId } = await render(
      <Card testID="card">
        <Text>child</Text>
      </Card>,
    );

    const style = getByTestId('card').props.style;
    const flat = Array.isArray(style) ? style.flat(Infinity) : [style];
    expect(flat).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: '#FFFFFF' })]),
    );
  });
});
