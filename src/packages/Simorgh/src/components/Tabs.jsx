import { mergeClassNames } from '@/utils/classname';
import React, { Children, isValidElement, useMemo } from 'react';

function TabItem({ children, onClick, isSelected }) {
	return (
		<span
			onClick={onClick}
			className={mergeClassNames(
				'transition-all text-sm w-28 text-center py-2 inline-block border-r select-none',
				{
					'bg-indigo-100': isSelected,
				},
			)}
		>
			{children}
		</span>
	);
}

function Tab({ tabIndex, children }) {
	const bodyChildren = useMemo(
		() =>
			Children.toArray(children)
				.filter((child) => {
					if (child && isValidElement(child)) {
						return child.type === TabItem;
					}
				})
				.map((child, index) => ({
					...child,
					props: {
						...child.props,
						isSelected: tabIndex === index,
					},
				})),
		[children, tabIndex],
	);

	return (
		<div className="border rounded-md m-auto w-fit cursor-pointer">{bodyChildren}</div>
	);
}

Tab.Item = TabItem;

export default Tab;
