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

export function getRandomMomentInNext24h(): string {
    const HOURS_IN_DAY = 24;

    const now = new Date();
    const hours = now.getHours();
    const newHours = hours + Math.random() * HOURS_IN_DAY;

    now.setHours(newHours);

    return now.toISOString();
}

export function b64toUrl(data: string): string {
    const byteString = window.atob(data);
    const charCodeArr = byteString.split("").map((char) => char.charCodeAt(0));
    const blobPart = new Uint8Array(charCodeArr).buffer;
    const jpgBlob = new Blob([blobPart], { type: "image/jpg" });
    const url = window.URL.createObjectURL(jpgBlob);

    return url;
}
