export type ActionResponse<T> = {
    success: boolean;
    errors: Record<keyof T, string> | null;
    state: T | null;
    message: string;
};
