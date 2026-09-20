import prettier from 'eslint-config-prettier';
import path from 'node:path';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

const gitignorePath = path.resolve(import.meta.dirname, '.gitignore');

export default defineConfig(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	ts.configs.recommended,
	svelte.configs.recommended,
	prettier,
	svelte.configs.prettier,
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		}
	},
	{
		/*
			Page prose is now real markup rather than an `{@html}` blob, so the linter finally sees
			the several hundred editorial links inside it. They are plain, static, root-relative
			hrefs on a prerendered site with no `base` path, and a link test asserts that each one
			resolves to a real page and carries its trailing slash. Wrapping them in `resolve()`
			would buy nothing and would defeat that test, which rejects computed hrefs precisely so
			a broken link cannot hide behind an expression. The rule still applies everywhere else,
			including every `goto()`.
		*/
		files: ['src/routes/**/+page.svelte'],
		rules: { 'svelte/no-navigation-without-resolve': 'off' }
	}
);
