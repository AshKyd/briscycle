import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import ArticleHeader from './ArticleHeader.svelte';

describe('ArticleHeader', () => {
	it('uses the compact treatment for a short title', () => {
		const { container } = render(ArticleHeader, { title: 'The Riverwalk' });
		expect(container.querySelector('.article-header--short')).toBeTruthy();
	});

	it('uses the tall treatment for a title that will wrap', () => {
		const { container } = render(ArticleHeader, {
			title: 'Queensland Bicycle Laws and Guidelines'
		});
		expect(container.querySelector('.article-header--long')).toBeTruthy();
	});
});
