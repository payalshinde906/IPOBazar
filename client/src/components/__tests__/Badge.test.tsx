import { render } from '../../test-utils';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders its label', async () => {
    const { getByText } = await render(<Badge label="OPEN" />);

    expect(getByText('OPEN')).toBeTruthy();
  });

  it('uses a solid fill for the solid variant', async () => {
    const { getByTestId } = await render(
      <Badge label="OPEN" tone="success" variant="solid" testID="badge" />,
    );

    const style = getByTestId('badge').props.style;
    const flat = Array.isArray(style) ? style.flat(Infinity) : [style];
    // light-theme success token
    expect(flat).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: '#16A34A' })]),
    );
  });
});
