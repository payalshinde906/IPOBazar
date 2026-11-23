import { fireEvent, render } from '../../test-utils';
import { EmptyState } from '../EmptyState';
import { ErrorState } from '../ErrorState';
import { LoadingState } from '../LoadingState';

describe('LoadingState', () => {
  it('shows its message with a progressbar role', async () => {
    const { getByText, getByRole } = await render(<LoadingState message="Loading IPOs…" />);

    expect(getByText('Loading IPOs…')).toBeTruthy();
    expect(getByRole('progressbar', { name: 'Loading IPOs…' })).toBeTruthy();
  });
});

describe('EmptyState', () => {
  it('renders the title and optional call to action', async () => {
    const onActionPress = jest.fn();
    const { getByText, getByRole } = await render(
      <EmptyState
        title="No IPOs yet"
        message="Pull to refresh."
        actionLabel="Refresh"
        onActionPress={onActionPress}
      />,
    );

    expect(getByText('No IPOs yet')).toBeTruthy();
    expect(getByText('Pull to refresh.')).toBeTruthy();

    await fireEvent.press(getByRole('button', { name: 'Refresh' }));
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });
});

describe('ErrorState', () => {
  it('renders as an alert and fires the retry action', async () => {
    const onRetry = jest.fn();
    const { getByRole, getByText } = await render(
      <ErrorState title="Could not load" message="Network down" onRetry={onRetry} />,
    );

    expect(getByRole('alert')).toBeTruthy();
    expect(getByText('Could not load')).toBeTruthy();

    await fireEvent.press(getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
