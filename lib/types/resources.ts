export type Resource = {
    id: string;
    title: string;
    description: string;
    url: string;
    imageUrl: string;
    category: RESOURCE_CATEGORY;
    updatedAt?: string;
};

export type ResourceInfra = {
    id: string;
    title: string;
    description: string;
    url: string;
    imageurl: string;
    category: RESOURCE_CATEGORY;
    updatedat?: Date;
};

export enum RESOURCE_CATEGORY {
    FRONTEND = 'FRONTEND',
    BACKEND = 'BACKEND',
}
