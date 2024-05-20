import { useMemo } from "react";
import styles from "./styles.module.css";

interface ITouchableTitleProps {
	readonly title: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
}

export default function TouchableTitle(props: ITouchableTitleProps) {
	const icon = useMemo(() => {
		return props.isActive ? " 🔻 " : " 🔺 ";
	}, [props.isActive]);

	return (
		<h2 className={styles.title} onClick={props.onClick}>
			{icon + props.title + icon}
		</h2>
	);
}
