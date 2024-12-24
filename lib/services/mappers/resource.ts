import { Resource, ResourceInfra } from '~/lib/types/resources';
import { dateToString } from '~/lib/utils/dates';

export const mapResourceInfraToApplication = (resource: ResourceInfra): Resource => {
	return {
		id: resource.id,
		title: resource.title,
		description: resource.description,
		url: resource.url,
		imageUrl: resource.imageurl,
		category: resource.category,
		updatedAt: resource.updatedat ? dateToString(resource.updatedat) : '-',
	};
};
