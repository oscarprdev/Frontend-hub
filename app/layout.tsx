import './globals.css';
import type { Metadata } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import Header from '~/components/header';
import { ThemeProvider } from '~/components/theme-provider';

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
	params: { session },
}: Readonly<{
	children: React.ReactNode;
	params: { session: Session };
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} h-screen overflow-hidden`}>
				<SessionProvider session={session}>
					<ThemeProvider
						attribute="class"
						defaultTheme="dark"
						enableSystem
						disableTransitionOnChange>
						<Header />
						{children}
					</ThemeProvider>
					<Toaster richColors />
				</SessionProvider>
			</body>
		</html>
	);
}
