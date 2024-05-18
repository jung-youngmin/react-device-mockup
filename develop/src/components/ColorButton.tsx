import { CSSProperties, useMemo, useState } from "react";

interface ICheckButtonProps {
	readonly label: string;
	readonly isActive: boolean;
	readonly showIcon: boolean;
	readonly onClick: () => void;
	readonly style?: CSSProperties;
	readonly className?: string;
}
export default function ColorButton(props: ICheckButtonProps) {
	const [hover, setHover] = useState(false);
	const icon = useMemo(() => {
		if (props.showIcon) {
			if (props.isActive) {
				return "⭕";
			} else {
				return "❌";
			}
		} else {
			return null;
		}
	}, [props.isActive, props.showIcon]);

	return (
		<button
			className={props.className}
			style={{
				display: "flex",
				alignItems: "center",
				boxSizing: "border-box",
				backgroundColor: props.isActive ? "dodgerblue" : "#e0e0e0e0",
				color: props.isActive ? "white" : "slategray",
				border: "none",
				padding: 0,
				paddingRight: 12,
				borderRadius: 12,
				textWrap: "nowrap",
				opacity: hover ? 0.6 : 1,
				overflow: "hidden",
				...props.style,
			}}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={props.onClick}>
			{icon !== null && (
				<span
					style={{
						padding: 8,
						paddingLeft: 12,
						backgroundColor: props.isActive ? "#99ccff" : "lightgray",
					}}>
					{icon}
				</span>
			)}
			<span style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: props.showIcon ? 8 : 12 }}>
				{props.label}
			</span>
		</button>
	);
}
