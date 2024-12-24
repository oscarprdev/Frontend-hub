import Link from 'next/link';
import { Suspense } from 'react';
import {
	ResourceListSidebar,
	ResourceListSidebarFallback,
} from '~/components/resouce-list-sidebar';
import { ResourceList, ResourceListFallback } from '~/components/resource-list';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '~/components/ui/accordion';
import { RESOURCE_CATEGORY } from '~/lib/types/resources';
import { cn } from '~/lib/utils';

export default function Home({ searchParams }: { searchParams: { category?: string } }) {
	const category = searchParams?.category as RESOURCE_CATEGORY;

	return (
		<div className="size-screen grid grid-cols-8 p-5">
			{/* Sidebar */}
			<aside className="col-span-2 h-screen pr-8">
				<Accordion
					type="single"
					collapsible
					className="w-full"
					defaultValue={Object.values(RESOURCE_CATEGORY)[0]}>
					{Object.values(RESOURCE_CATEGORY).map(category => (
						<AccordionItem key={crypto.randomUUID()} value={category} className="-mb-4">
							<AccordionTrigger className="text-lg font-bold capitalize">
								{category.toLowerCase()}
							</AccordionTrigger>
							<AccordionContent>
								<Suspense fallback={<ResourceListSidebarFallback />}>
									<ResourceListSidebar category={category} />
								</Suspense>
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</aside>
			{/* Main content */}
			<section className="col-span-6 flex flex-col gap-5">
				<div className="ml-2 flex w-full flex-wrap items-center gap-2">
					{Object.values(RESOURCE_CATEGORY).map(cat => (
						<Link
							key={crypto.randomUUID()}
							href={cat === category ? `/` : `/?category=${cat}`}
							className={cn(
								cat === category
									? 'border-transparent bg-accent text-white hover:bg-accent-dark'
									: 'bg-transparent hover:bg-accent-foreground',
								'grid place-items-center rounded-full border px-3 py-2 text-xs capitalize duration-300'
							)}>
							{cat}
						</Link>
					))}
				</div>
				<Suspense fallback={<ResourceListFallback />}>
					<ResourceList category={category} />
				</Suspense>
			</section>
		</div>
	);
}
