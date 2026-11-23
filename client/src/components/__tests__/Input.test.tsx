import { fireEvent, render } from '../../test-utils';
import { Input } from '../Input';

describe('Input', () => {
  it('renders its label', async () => {
    const { getByText } = await render(<Input label="Full name" />);

    expect(getByText('Full name')).toBeTruthy();
  });

  it('calls onChangeText with typed value', async () => {
    const onChangeText = jest.fn();
    const { getByTestId } = await render(
      <Input label="PAN" testID="pan-input" onChangeText={onChangeText} />,
    );

    await fireEvent.changeText(getByTestId('pan-input'), 'ABCDE1234F');

    expect(onChangeText).toHaveBeenCalledWith('ABCDE1234F');
  });

  it('shows the error message when invalid', async () => {
    const { getByText } = await render(<Input label="Email" error="Invalid email" />);

    expect(getByText('Invalid email')).toBeTruthy();
  });
});
