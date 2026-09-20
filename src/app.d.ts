declare global {
	namespace App {
		interface Locals {
			/** Class applied to `<body>`, set per page from front matter `classNames`. */
			bodyClass?: string;
		}
	}
}

export {};
