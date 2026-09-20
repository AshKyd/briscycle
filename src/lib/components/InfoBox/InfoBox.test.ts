import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import InfoBox from './InfoBox.svelte';
import { facetsFor } from '$lib/facets';

describe('InfoBox', () => {
	it('shows a badge for each attribute tag', () => {
		const { getByText } = render(InfoBox, {
			facets: facetsFor(['brisbane', 'separated', 'uphill'])
		});
		expect(getByText('Separated path')).toBeTruthy();
		expect(getByText('Uphill')).toBeTruthy();
	});

	// The legacy template keyed off the presence of `tags`, so a page tagged only for
	// collection membership rendered an empty aside.
	it('renders nothing when a page has only collection tags', () => {
		const { container } = render(InfoBox, { facets: facetsFor(['brisbane', 'bridge']) });
		expect(container.querySelector('.infobox')).toBeNull();
	});

	it('shows an under-construction badge when the route has not opened', () => {
		const { getByText } = render(InfoBox, { facets: [], openDate: 'August 2024' });
		expect(getByText('Under construction')).toBeTruthy();
		expect(getByText(/August 2024/)).toBeTruthy();
	});
});
