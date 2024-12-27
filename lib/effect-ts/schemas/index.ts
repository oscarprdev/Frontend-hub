import { Category } from './category';
import { CreatedAt } from './created-at';
import { Description } from './description';
import { Id } from './id';
import { ImageURL } from './image-url';
import { Title } from './title';
import { UpdatedAt, UpdatedAtStr } from './updated-at';
import { URL } from './url';
import { Schema } from 'effect';

export class Resource extends Schema.Class<Resource>('Resource')({
    id: Id,
    title: Title,
    description: Description,
    category: Category,
    url: URL,
    imageUrl: ImageURL,
    updatedAt: UpdatedAtStr,
}) {}

export class ResourceDb extends Schema.Class<ResourceDb>('ResourceDb')({
    id: Id,
    title: Title,
    description: Description,
    category: Category,
    url: URL,
    imageurl: ImageURL,
    updatedat: UpdatedAt,
    createdat: CreatedAt,
}) {}

export const FormatDate = Schema.transform(Schema.ValidDateFromSelf, Schema.String, {
    decode: from =>
        from.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
    encode: to => new Date(to),
});

export const DescribeResourceBySearchInput = Schema.Struct({
    title: Title,
});
