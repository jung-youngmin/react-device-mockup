import { CSSProperties, useMemo, useState } from "react";
import ButtonGroup from "../components/ButtonGroup";
import CodeBlock from "./CodeBlock";
import demoStyle from "./demo.module.css";

export default function InstallDemo() {
	const [isReact, setIsReact] = useState(true);

	const installStr = useMemo(() => {
		return (
			"# using npm\n" +
			(isReact ? "npm install react-device-mockup" : "npm install react-native-device-mockup")
		);
	}, [isReact]);

	const yarnAddStr = useMemo(() => {
		return (
			"# using yarn\n" +
			(isReact ? "yarn add react-device-mockup" : "yarn add react-native-device-mockup")
		);
	}, [isReact]);

	const importStr = useMemo(() => {
		const base =
			"import {" +
			"\n  AndroidMockup," +
			"\n  AndroidTabMockup," +
			"\n  IPhoneMockup," +
			"\n  IPadMockup," +
			"\n}" +
			"\nfrom ";

		if (isReact) {
			return base + `"react-device-mockup"`;
		} else {
			return base + `"react-native-device-mockup"`;
		}
	}, [isReact]);

	const codeMaxWidth = useMemo<CSSProperties>(() => {
		return { maxWidth: "90vw" };
	}, []);

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<ButtonGroup
				title=""
				buttonSize={120}
				buttonData={[
					{
						label: "React",
						isActive: isReact,
						onClick: () => setIsReact(true),
					},
					{
						label: "React Native",
						isActive: !isReact,
						onClick: () => setIsReact(false),
					},
				]}
			/>
			<div className={demoStyle.cardTitle}>
				{isReact ? (
					<a
						href="https://github.com/jung-youngmin/react-device-mockup"
						target="_blank"
						rel="noopener noreferrer"
						className={demoStyle.repoLink}>
						🌐 react-device-mockup
					</a>
				) : (
					<a
						href="https://github.com/jung-youngmin/react-native-device-mockup"
						target="_blank"
						rel="noopener noreferrer"
						className={demoStyle.repoLink}>
						🌐 react-native-device-mockup
					</a>
				)}
			</div>
			<div className={demoStyle.flexRowWrap}>
				<div
					className={demoStyle.flexColWrap}
					style={{ flex: 1, marginRight: 8, marginLeft: 8, boxSizing: "border-box" }}>
					<CodeBlock
						title="Install"
						language="bash"
						sampleCode={installStr}
						style={codeMaxWidth}
					/>
					<CodeBlock
						title=""
						language="bash"
						sampleCode={yarnAddStr}
						style={{ marginTop: 8, ...codeMaxWidth }}
					/>
				</div>
				<CodeBlock
					title="import"
					language="ts"
					sampleCode={importStr}
					style={{
						flex: 1,
						marginRight: 8,
						marginLeft: 8,
						boxSizing: "border-box",
						...codeMaxWidth,
					}}
				/>
			</div>
		</div>
	);
}
