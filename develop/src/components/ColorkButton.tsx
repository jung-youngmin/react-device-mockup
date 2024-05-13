import { CSSProperties, useMemo, useState } from "react";

interface ICheckButtonProps {
	readonly label: string;
	readonly isActive: boolean;
	readonly showIcon: boolean;
	readonly onClick: () => void;
	readonly style?: CSSProperties;
}
export default function ColorkButton(props: ICheckButtonProps) {
	const [hover, setHover] = useState(false);
	const label = useMemo(() => {
		if (props.showIcon) {
			if (props.isActive) {
				return "⭕ " + props.label;
			} else {
				return "❌ " + props.label;
			}
		} else {
			return props.label;
		}
	}, [props.isActive, props.showIcon, props.label]);

	return (
		<button
			style={{
				backgroundColor: props.isActive ? "dodgerblue" : "lightgray",
				color: props.isActive ? "white" : "slategray",
				border: "none",
				padding: 8,
				paddingRight: 12,
				paddingLeft: 12,
				borderRadius: 12,
				textWrap: "nowrap",
				opacity: hover ? 0.6 : 1,
				...props.style,
			}}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={props.onClick}>
			{label}
		</button>
	);
}
