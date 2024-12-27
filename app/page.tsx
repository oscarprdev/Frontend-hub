import Link from 'next/link';
import { Suspense } from 'react';
import {
	ResourceListSidebar,
	ResourceListSidebarFallback,
} from '~/components/resouce-list-sidebar';
import { ResourceList, ResourceListFallback } from '~/components/resource-list';
import ResourceSearch from '~/components/resource-search';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '~/components/ui/accordion';
import { ITEMS_PER_PAGE } from '~/lib/constants';
import { RESOURCE_CATEGORY } from '~/lib/schemas/resource';
import { cn } from '~/lib/utils/cn';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
	const { category, items } = (await searchParams) as {
		category: RESOURCE_CATEGORY;
		items: string;
	};

	return (
		<main className="relative grid max-h-screen w-screen grid-cols-8 overflow-hidden">
			{/* Sidebar */}
			<aside className="hidden h-full min-h-screen pl-5 md:col-span-2 md:block">
				<ResourceSearch />
				<div aria-label="scroll" className="h-[calc(100vh-100px)] overflow-y-scroll">
					<Accordion
						type="single"
						collapsible
						className="h-full w-full"
						defaultValue={Object.values(RESOURCE_CATEGORY)[0]}>
						{Object.values(RESOURCE_CATEGORY).map(category => (
							<AccordionItem key={crypto.randomUUID()} value={category}>
								<AccordionTrigger className="text-md font-bold capitalize">
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
				</div>
			</aside>
			{/* Resources */}
			<section
				aria-label="scroll"
				className="col-span-8 flex h-[calc(100vh-50px)] flex-col gap-5 overflow-y-scroll p-5 pt-2 md:col-span-6">
				<div className="col-span-6 ml-2 flex w-full flex-wrap items-center gap-2">
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
					<ResourceList
						category={category}
						items={isNaN(Number(items)) ? ITEMS_PER_PAGE : Number(items)}
					/>
				</Suspense>
			</section>
		</main>
	);
}
