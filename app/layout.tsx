import './globals.css';
import { Layers2 } from 'lucide-react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '~/components/theme-provider';
import ThemeToggle from '~/components/theme-toggle';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'frontend/hub',
	description: 'A place to find and rediscover frontend resources',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<header className="flex h-16 items-center justify-between border-b border-border-foreground px-4">
						<div className="flex items-center gap-2">
							<Layers2 />
							<h1 className="font-bold">frontend/hub</h1>
						</div>
						<ThemeToggle />
					</header>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
