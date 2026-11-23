import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';

import { Button } from '../../components/Button';
import { ThemeProvider, useTheme } from '../ThemeProvider';

function Probe() {
  const { mode, theme, isDark, toggle } = useTheme();
  return (
    <>
      <Text testID="state">{`${mode}:${theme}:${isDark}`}</Text>
      <Button label="toggle" onPress={toggle} />
    </>
  );
}

describe('ThemeProvider', () => {
  it('resolves the light theme', async () => {
    const { getByTestId } = await render(
      <ThemeProvider initialMode="light">
        <Probe />
      </ThemeProvider>,
    );

    expect(getByTestId('state')).toHaveTextContent('light:light:false');
  });

  it('resolves the dark theme', async () => {
    const { getByTestId } = await render(
      <ThemeProvider initialMode="dark">
        <Probe />
      </ThemeProvider>,
    );

    expect(getByTestId('state')).toHaveTextContent('dark:dark:true');
  });

  it('toggles from light to dark', async () => {
    const { getByTestId, getByRole } = await render(
      <ThemeProvider initialMode="light">
        <Probe />
      </ThemeProvider>,
    );

    await fireEvent.press(getByRole('button', { name: 'toggle' }));

    expect(getByTestId('state')).toHaveTextContent('dark:dark:true');
  });

  it('throws when useTheme is used outside a provider', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(render(<Probe />)).rejects.toThrow('useTheme must be used within a ThemeProvider');

    consoleError.mockRestore();
  });
});
