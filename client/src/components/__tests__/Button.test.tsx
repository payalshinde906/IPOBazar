import { fireEvent, render } from '../../test-utils';
import { Button } from '../Button';

describe('Button', () => {
  it('renders its label and exposes the button role', async () => {
    const { getByText, getByRole } = await render(<Button label="Submit" onPress={() => {}} />);

    expect(getByText('Submit')).toBeTruthy();
    expect(getByRole('button', { name: 'Submit' })).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(<Button label="Go" onPress={onPress} />);

    await fireEvent.press(getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled while loading', async () => {
    const { getByRole } = await render(<Button label="Go" onPress={() => {}} loading />);

    expect(getByRole('button')).toBeDisabled();
  });

  it('is disabled when the disabled prop is set', async () => {
    const { getByRole } = await render(<Button label="Go" onPress={() => {}} disabled />);

    expect(getByRole('button')).toBeDisabled();
  });
});
