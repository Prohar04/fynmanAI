type AuthSocialButtonProps = {
	href: string;
	label: string;
};

function GoogleIcon() {
	return (
		<svg viewBox="0 0 24 24" className="w-4 h-4 grayscale opacity-70">
			<path
				fill="currentColor"
				d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"
			/>
			<path
				fill="currentColor"
				d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23Z"
			/>
			<path
				fill="currentColor"
				d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.44.35-2.09V7.06H2.18A11 11 0 0 0 1 12c0 1.77.43 3.45 1.18 4.94l3.66-2.85Z"
			/>
			<path
				fill="currentColor"
				d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38Z"
			/>
		</svg>
	);
}

export function AuthSocialButton({ href, label }: AuthSocialButtonProps) {
	return (
		<a
			href={href}
			className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-label-md transition-all active:scale-[0.98] border border-outline-variant text-on-surface-variant hover:border-primary hover:text-on-surface py-4 px-6 no-underline"
		>
			<GoogleIcon />
			{label}
		</a>
	);
}
