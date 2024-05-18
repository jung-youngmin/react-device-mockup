import styles from "./styles.module.css";

interface ITouchableTitleProps {
	readonly title: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
}

export default function TouchableTitle(props: ITouchableTitleProps) {
	// <h1>AndroidMockup 🔻🔺 </h1>
	return (
		<h2 className={styles.title} onClick={props.onClick}>
			{(props.isActive ? "🔻 " : "🔺 ") + props.title}
		</h2>
	);
}
