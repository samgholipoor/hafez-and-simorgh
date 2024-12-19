import Box from '@/components/Box';
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';

export default function Error({ code, message }) {
	const handleReloadButtonClick = useCallback(() => {
		window.location.reload();
	});

	return (
		<div className="h-full min-h-screen flex justify-center bg-base-300">
			<Box className="container my-auto max-w-xs">
				<div className="text-center my-1 p-3">
					<div>
						{/* <Icon name="error_outline_black_24dp" className="w-14 h-14" /> */}
					</div>
					<h1 className="text-2xl font-bold text-gray-700 flex items-center justify-center">
						<span>
							{'Error '}
							{code || '500'}
						</span>
					</h1>
					<p className="text-sm text-gray-500">{message || 'Bad Things Happened!'}</p>
				</div>
				<div className="p-3 pt-0 text-center flex flex-row items-center justify-center gap-2">
					<NavLink className="btn btn-link" to={-1}>
						{/* <Icon name="arrow_back_black_24dp" className="w-4 h-4 mr-1" /> Go Back */}
					</NavLink>
					<button
						type="button"
						className="btn btn-link"
						onClick={handleReloadButtonClick}
					>
						{/* <Icon name="refresh_black_24dp" className="w-4 h-4 mr-1" /> Reload */}
					</button>
				</div>
			</Box>
		</div>
	);
}
