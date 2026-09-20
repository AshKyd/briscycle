import type { ParamMatcher } from '@sveltejs/kit';

/** A path segment ending in an extension, e.g. `icon.svg` or `route.geo.json`. */
const HAS_EXTENSION = /\.[a-z0-9]+$/i;

/**
 * Only match paths that could be a page.
 *
 * Without this the catch-all route claims asset URLs too, so a missing image is answered by the
 * router rather than 404ing outright — and because the site forces trailing slashes, a request
 * for `/images/icons/tree.svg` redirects to `/images/icons/tree.svg/` and fails there instead.
 * That reports the missing file as a broken link to itself, which says nothing about the page
 * that actually references it.
 */
export const match: ParamMatcher = (param) => !HAS_EXTENSION.test(param);
