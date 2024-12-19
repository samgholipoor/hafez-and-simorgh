import { mergeClassNames } from '@/utils/classname';
import { Icon } from '@burna/monster-design-system';
import { useState } from 'react';

const Accordion = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="overflow-hidden border rounded-lg cursor-pointer">
			<div
				onClick={handleToggle}
				className="bg-indigo-100 p-2 py-4 rounded-t-lg flex items-center gap-4"
			>
				<Icon
					type={isOpen ? 'minus' : 'plus'}
					className={mergeClassNames(
						'block w-6 h-6 bg-purple-900 transition-all duration-300',
						{
							'transform -rotate-180': isOpen,
						},
					)}
				/>
				<span className="text-base select-none">{title}</span>
			</div>

			<div
				className={mergeClassNames('transition-all', {
					'h-auto': isOpen,
					'h-0': !isOpen,
				})}
			>
				{children}
			</div>
		</div>
	);
};

export default Accordion;
