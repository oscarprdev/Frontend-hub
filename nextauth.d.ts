import { DefaultUser } from 'next-auth';

interface IUser extends DefaultUser {
	id: string;
}

declare module 'next-auth' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface User extends IUser {}
	interface Session {
		user?: User;
	}
}
declare module 'next-auth/jwt' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface JWT extends IUser {}
}
