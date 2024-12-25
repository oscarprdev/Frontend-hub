import { createResourceAction } from './actions/createResource';
import './globals.css';
import { Layers2, Plus } from 'lucide-react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ResourceForm from '~/components/resource-form';
import ResourceSearch from '~/components/resource-search';
import { ThemeProvider } from '~/components/theme-provider';
import ThemeToggle from '~/components/theme-toggle';
import { Button } from '~/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog';

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
			<body className={`${geistSans.variable} ${geistMono.variable} h-screen overflow-hidden`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
					<header className="sticky top-0 z-10 flex h-12 items-center justify-between gap-2 border-b border-border-foreground bg-background px-4">
						<div className="flex items-center gap-2">
							<Layers2 />
							<h1 className="hidden font-bold sm:block">Frontend/hub</h1>
						</div>
						<div className="flex items-center gap-2">
							<div className="grid place-items-center md:hidden">
								<ResourceSearch />
							</div>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant={'outline'} size={'icon'}>
										<Plus />
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Add new Resource</DialogTitle>
										<ResourceForm submitAction={createResourceAction} />
									</DialogHeader>
								</DialogContent>
							</Dialog>
							<ThemeToggle />
						</div>
					</header>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
