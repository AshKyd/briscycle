import { describe, expect, it } from 'vitest';
import { normalisePermalink, resolveAgainstPage, toContentPath, urlFromContentFile } from './paths.ts';

describe('urlFromContentFile', () => {
	it.each([
		['index.md', '/'],
		['map/index.md', '/map/'],
		['brisbane-city/riverwalk/index.md', '/brisbane-city/riverwalk/'],
		['legal/privacy-policy.md', '/legal/privacy-policy/']
	])('%s becomes %s', (file, url) => expect(urlFromContentFile(file)).toBe(url));
});

describe('normalisePermalink', () => {
	it('adds the trailing slash a directory URL needs', () => {
		expect(normalisePermalink('/privacy-policy')).toBe('/privacy-policy/');
	});

	it('leaves a filename alone', () => {
		expect(normalisePermalink('/404.html')).toBe('/404.html');
	});
});

describe('toContentPath', () => {
	// The three spellings the content uses must all key the image manifest identically.
	it.each([
		['./site/brisbane-city/foo.jpg', '', 'brisbane-city/foo.jpg'],
		['/brisbane-city/foo.jpg', '', 'brisbane-city/foo.jpg'],
		['foo.jpg', 'brisbane-city', 'brisbane-city/foo.jpg']
	])('%s resolves to %s', (src, directory, expected) =>
		expect(toContentPath(src, directory)).toBe(expected)
	);
});

describe('resolveAgainstPage', () => {
	it('resolves a page-relative asset', () => {
		expect(resolveAgainstPage('gateway.geo.json', '/moreton-bay/gateway-bridge-cycleway/')).toBe(
			'/moreton-bay/gateway-bridge-cycleway/gateway.geo.json'
		);
	});

	it('leaves an absolute path alone', () => {
		expect(resolveAgainstPage('/a/b.geo.json', '/c/')).toBe('/a/b.geo.json');
	});
});
