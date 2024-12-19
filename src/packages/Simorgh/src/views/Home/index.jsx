import { Navigate } from 'react-router-dom';

export default function Home() {
	return <Navigate to="/clusters" />;
}

Home.routerConfig = {
	path: '/',
};
