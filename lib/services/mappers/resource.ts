import { Resource } from '~/lib/schemas/resource';
import { ResourceDb } from '~/lib/schemas/resource-db';
import { dateToString } from '~/lib/utils/dates';

export const mapResourceDbToApplication = (resource: ResourceDb): Resource => {
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

export const handleResourcesDb = (result: ResourceDb[]): Resource[] => {
  return result.length > 0 ? result.map(res => mapResourceDbToApplication(res)) : [];
};
