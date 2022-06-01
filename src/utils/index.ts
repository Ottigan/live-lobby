export function getDateDiff(from: Date, to: Date): string | null {
    const diff = to.getTime() - from.getTime();

    function padTime(value: number) {
        return value < 10 ? String(value).padStart(2, "0") : String(value).padEnd(2, "0");
    }

    if (diff > 0) {
        const minutesMS = diff % 3600000;
        const secondsMS = minutesMS % 60000;

        const hours = (diff - minutesMS) / 3600000;
        const minutes = (minutesMS - secondsMS) / 60000;
        const seconds = Math.floor(secondsMS / 1000);

        return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
    }

    return null;
}
