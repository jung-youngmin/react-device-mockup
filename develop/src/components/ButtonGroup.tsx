import { CSSProperties, useCallback, useMemo } from "react";
import ColorButton from "./ColorButton";

type TData = { label: string; isActive: boolean; onClick: () => void };

interface IButtonGroupProps {
	readonly buttonData: TData[];
	readonly style?: CSSProperties;
}

export default function ButtonGroup(props: IButtonGroupProps) {
	const buttonGroupStyle = useMemo<CSSProperties>(() => {
		return {
			boxSizing: "border-box",
			justifyContent: "center",
			width: 70,
		};
	}, []);

	const lastIndex = useMemo(() => {
		return props.buttonData.length - 1;
	}, [props.buttonData]);

	const renderButtons = useCallback(
		(item: TData, index: number) => {
			const isFirst = index === 0;
			const isLast = index === lastIndex;

			let styles: CSSProperties;
			if (isFirst) {
				styles = { borderTopRightRadius: 0, borderBottomRightRadius: 0 };
			} else if (isLast) {
				styles = {
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0,
					borderLeft: "0.5px solid darkgray",
				};
			} else {
				styles = {
					borderRadius: 0,
					borderLeft: "0.5px solid darkgray",
				};
			}

			return (
				<ColorButton
					label={item.label}
					isActive={item.isActive}
					showIcon={false}
					style={{
						...buttonGroupStyle,
						...styles,
					}}
					onClick={item.onClick}
				/>
			);
		},
		[lastIndex, buttonGroupStyle],
	);

	return (
		<div style={{ display: "flex", ...props.style }}>{props.buttonData.map(renderButtons)}</div>
	);
}
