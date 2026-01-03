// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Declare module types for @gsap/svelte components
declare module '@gsap/svelte/components/*.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

// Explicit declarations for each component
declare module '@gsap/svelte/components/GSAPContainer.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@gsap/svelte/components/GsapDraggable.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@gsap/svelte/components/GsapAnimate.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@gsap/svelte/components/GsapFade.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@gsap/svelte/components/GsapSlide.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

declare module '@gsap/svelte/components/GsapScale.svelte' {
	import type { Component } from 'svelte';
	const component: Component;
	export default component;
}

export {};
