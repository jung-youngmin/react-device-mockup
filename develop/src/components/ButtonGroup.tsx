import { CSSProperties, useCallback, useMemo } from "react";
import ColorButton from "./ColorButton";
import styles from "./styles.module.css";

type TData = { label: string; isActive: boolean; onClick: () => void };

interface IButtonGroupProps {
	readonly buttonData: TData[];
	readonly title: string;
	readonly buttonSize?: number;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function ButtonGroup(props: IButtonGroupProps) {
	const buttonGroupStyle = useMemo<CSSProperties>(() => {
		const size = props.buttonSize === undefined ? 70 : props.buttonSize;
		return {
			boxSizing: "border-box",
			justifyContent: "center",
			width: size,
		};
	}, [props.buttonSize]);

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
					key={item.label}
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
		<div className={props.className} style={{ ...props.style }}>
			<div className={styles.subLabel}>{props.title}</div>
			<div style={{ display: "flex" }}>{props.buttonData.map(renderButtons)}</div>
		</div>
	);
}
