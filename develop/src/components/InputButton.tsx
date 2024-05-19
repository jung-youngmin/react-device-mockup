import { CSSProperties, HTMLInputTypeAttribute, useEffect, useState } from "react";
import ColorButton from "./ColorButton";
import styles from "./styles.module.css";

interface IInputButtonProps {
	readonly label: string;
	readonly inputType: HTMLInputTypeAttribute;
	readonly defaultVal: string;
	readonly value?: string;
	readonly placeholder: string;
	readonly onClickSubmit: (inputVal: string) => void;
	readonly style?: CSSProperties;
	readonly className?: string;
}
export default function InputButton(props: IInputButtonProps) {
	const [text, setText] = useState(props.defaultVal);

	useEffect(() => {
		if (props.value !== undefined) {
			setText(props.value);
		}
	}, [props.value]);

	return (
		<div className={props.className} style={props.style}>
			<span className={styles.subLabel}>{props.label}</span>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<input
					type={props.inputType}
					value={text}
					placeholder={props.placeholder}
					className={styles.myInput}
					step={10}
					style={{
						width: 100,
						padding: 8,
						borderRadius: 12,
						marginRight: 8,
						borderWidth: 1,
						borderStyle: "solid",
						borderColor: "darkgray",
					}}
					onChange={e => {
						console.log(e.target.value);
						setText(e.target.value);
					}}
				/>
				<ColorButton
					label={"reset"}
					isActive={false}
					showIcon={false}
					style={{ marginRight: 4 }}
					onClick={() => {
						setText(props.defaultVal);
						props.onClickSubmit(props.defaultVal);
					}}
				/>
				<ColorButton
					label={"submit"}
					isActive
					showIcon={false}
					onClick={() => {
						if (text === "") {
							return;
						} else {
							props.onClickSubmit(text);
						}
					}}
				/>
			</div>
		</div>
	);
}
