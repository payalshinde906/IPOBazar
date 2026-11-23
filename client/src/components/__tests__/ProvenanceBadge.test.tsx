import { render } from '../../test-utils';
import { ProvenanceBadge } from '../ProvenanceBadge';

describe('ProvenanceBadge', () => {
  it('labels OFFICIAL data and shows the updated timestamp', async () => {
    const { getByText } = await render(
      <ProvenanceBadge provenance="official" updatedAt="23 Nov 2026, 10:00 IST" />,
    );

    expect(getByText('OFFICIAL')).toBeTruthy();
    expect(getByText('Updated 23 Nov 2026, 10:00 IST')).toBeTruthy();
  });

  it('labels ESTIMATED data', async () => {
    const { getByText } = await render(<ProvenanceBadge provenance="estimated" />);

    expect(getByText('ESTIMATED')).toBeTruthy();
  });

  it('labels SAMPLE data', async () => {
    const { getByText } = await render(<ProvenanceBadge provenance="sample" />);

    expect(getByText('SAMPLE DATA')).toBeTruthy();
  });

  it('exposes the source to assistive technology', async () => {
    const { getByLabelText } = await render(<ProvenanceBadge provenance="official" source="NSE" />);

    expect(getByLabelText('OFFICIAL — source: NSE')).toBeTruthy();
  });
});
