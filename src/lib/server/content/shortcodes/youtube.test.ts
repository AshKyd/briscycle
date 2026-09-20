import { describe, expect, it } from 'vitest';
import { renderYoutube } from './youtube.ts';

describe('renderYoutube', () => {
	it('embeds a plain watch URL', () => {
		const html = renderYoutube('"https://www.youtube.com/watch?v=Mcr6yTCc14Y", "A title"');
		expect(html).toContain('https://www.youtube.com/embed/Mcr6yTCc14Y?rel=0');
		expect(html).toContain('start=0');
		expect(html).not.toContain('list=');
	});

	it('carries a playlist and index through', () => {
		const html = renderYoutube(
			'"https://www.youtube.com/watch?v=K8-k3Qt0sLw&list=PLNAiX&index=1", "Riding around Brisbane"'
		);
		expect(html).toContain('list=PLNAiX&index=1&loop=1');
	});

	it('carries a start time through', () => {
		const html = renderYoutube('"https://www.youtube.com/watch?v=abc&t=412s", "Macleay"');
		expect(html).toContain('start=412');
	});

	it('escapes quotes in the title', () => {
		expect(renderYoutube('"https://www.youtube.com/watch?v=a", "He said \\"hi\\""')).toContain(
			'title="He said &quot;hi&quot;"'
		);
	});
});
