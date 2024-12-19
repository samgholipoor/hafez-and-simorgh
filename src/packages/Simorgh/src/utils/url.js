import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const generateUrl = (to, queryParams = {}) => {
	const link = new URL(to.startsWith('http') ? to : `${window.location.origin}${to}`);

	Object.keys(queryParams).forEach((key) => {
		link.searchParams.set(key, queryParams[key]);
	});

	return link;
};

export const useCurrentLocation = () => {
	const location = useLocation();
	return useMemo(() => new URL(window.location), [location]);
};

export const getUrlHref = (url, inApp = true) =>
	inApp ? url.href.replace(url.origin, '') : url.href;
