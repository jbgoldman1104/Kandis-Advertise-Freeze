import styles from "./TimeBox.module.scss";
import { FC, useEffect, useState } from "react";

interface TimeBoxProps {
	hours: number;
	minutes: number;
	seconds: number;
}

interface TimeState {
	hours: number;
	minutes: number;
	seconds: number;
}

const TimeBox: FC<TimeBoxProps> = ({ hours, minutes, seconds }) => {
	const [time, setTime] = useState<TimeState>({
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	});

	useEffect(() => {
		const resetTime = () => {
			setTime({ hours: hours, minutes: minutes, seconds: seconds });
		};

		resetTime();

		const countdown = setInterval(() => {
			if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
				clearInterval(countdown);
			} else {
				setTime((prevTime: TimeState) => {
					let newHours = prevTime.hours;
					let newMinutes = prevTime.minutes;
					let newSeconds = prevTime.seconds - 1;

					if (newSeconds < 0) {
						newSeconds = 59;
						newMinutes--;
					}

					if (newMinutes < 0) {
						newMinutes = 59;
						newHours--;
					}

					return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
				});
			}
		}, 1000);

		return () => {
			clearInterval(countdown);
		};
	}, [hours, minutes, seconds]);

	return (
		<div className={styles.timeBox}>
			<p className={styles.timeLeft}>Time left</p>
			<div className={styles.timeLive}>
				<span>{time.hours.toString().padStart(2, "0")}</span>:
				<span>{time.minutes.toString().padStart(2, "0")}</span>:
				<span>{time.seconds.toString().padStart(2, "0")}</span>
			</div>
		</div>
	);
};

export default TimeBox;