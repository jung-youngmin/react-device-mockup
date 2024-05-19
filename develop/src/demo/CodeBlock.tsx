import { CSSProperties, useEffect, useState } from "react";
import Highlight from "react-highlight";
import ColorButton from "../components/ColorButton";
import demoStyle from "./demo.module.css";

interface ICodeBlockProps {
	readonly title: string;
	readonly sampleCode: string;
	readonly language?: string;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function CodeBlock(props: ICodeBlockProps) {
	const { sampleCode } = props;

	const [isCopied, setIsCopied] = useState(false);
	useEffect(() => {
		if (isCopied) {
			setTimeout(() => {
				setIsCopied(false);
			}, 1500);
		}
	}, [isCopied]);

	return (
		<div
			className={props.className}
			style={{ display: "flex", flexDirection: "column", ...props.style }}>
			{props.title !== "" && <h3 className={demoStyle.cardTitle}>{props.title}</h3>}
			<div
				className={demoStyle.card}
				style={{
					display: "flex",
					flex: 1,
					flexDirection: "column",
					backgroundColor: "#1e1e1e",
				}}>
				<div className={demoStyle.flexRowWrap} style={{ alignItems: "center" }}>
					<ColorButton
						label={"📑 Copy "}
						isActive
						showIcon={false}
						onClick={async () => {
							await window.navigator.clipboard.writeText(sampleCode);
							setIsCopied(true);
						}}
					/>
					{isCopied && (
						<code style={{ color: "lightgray", marginLeft: 16 }}>Copied!</code>
					)}
				</div>
				<Highlight className={props.language === undefined ? "react" : props.language}>
					{sampleCode}
				</Highlight>
			</div>
		</div>
	);
}
