'use client';

import { useEffect, useRef, useState } from 'react';

type EditMenuProps = {
	webEditorUrl: string;
	githubUrl: string;
};

export function EditMenu({ webEditorUrl, githubUrl }: EditMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handlePointerDown = (event: PointerEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOpen(false);
			}
		};

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div ref={menuRef} className="relative">
			<button
				type="button"
				onClick={() => setIsOpen((prev) => !prev)}
				aria-expanded={isOpen}
				aria-haspopup="menu"
				className="cursor-pointer rounded-md border bg-fd-secondary px-3 py-1.5 text-sm font-medium text-fd-secondary-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
			>
				编辑
			</button>
			{isOpen ? (
				<div
					role="menu"
					className="absolute bottom-full left-0 z-20 mb-2 min-w-44 overflow-hidden rounded-lg border bg-fd-popover p-1 text-sm text-fd-popover-foreground shadow-lg"
				>
					<a
						href={webEditorUrl}
						target="_blank"
						rel="noreferrer"
						role="menuitem"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
					>
						网页编辑器
					</a>
					<a
						href={githubUrl}
						target="_blank"
						rel="noreferrer"
						role="menuitem"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-2 rounded-md px-3 py-2 transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
					>
						GitHub
					</a>
				</div>
			) : null}
		</div>
	);
}

