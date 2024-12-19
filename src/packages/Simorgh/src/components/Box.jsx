import { mergeClassNames } from '@/utils/classname';

export default function Box({
	children,
	className,
	component,
	header,
	footer,
	...props
}) {
	const Component = component;
	return (
		<Component
			className={mergeClassNames('bg-base-100 rounded-md shadow-sm', className)}
			{...props}
		>
			{header && (
				<div className="text-base font-semibold text-base-content text-opacity-90 p-4 h-14 flex items-center justify-center whitespace-nowrap">
					{header}
				</div>
			)}
			{children}
			{footer && (
				<div className="text-xs text-gray-400 py-2 px-4 flex items-center border-t">
					{footer}
				</div>
			)}
		</Component>
	);
}

Box.defaultProps = {
	component: 'div',
};
