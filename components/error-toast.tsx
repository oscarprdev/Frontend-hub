'use client';

import React from 'react';
import { toast } from 'sonner';

const ErrorToast = ({ error }: { error: string }) => {
	React.useEffect(() => {
		toast.error(error);
	}, [error]);

	return <></>;
};

export default ErrorToast;
