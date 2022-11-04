import React from 'react';

interface Props {
	border?: string;
	color?: string;
	backgroundColor?: string;
	children: React.ReactNode;
	height?: string;
	onClick?: () => void;
	radius?: string;
	width?: string;
	padding?: string;
}

const Button: React.FC<Props> = ({
	border,
	backgroundColor,
	color,
	children,
	height,
	onClick,
	radius,
	width,
	padding,
}) => {
	return (
		<button
			onClick={onClick}
			style={{
				backgroundColor: backgroundColor,
				color: color,
				padding: padding,
				border: border,
				borderRadius: radius,
				height,
				width,
			}}>
			{children}
		</button>
	);
};

export default Button;
