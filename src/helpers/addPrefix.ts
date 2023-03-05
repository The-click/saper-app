export function addPrefix(num: number): string {
	if (num > 99) {
		return num + "";
	}
	if (num > 9) {
		return "0" + num;
	}
	return "00" + num;
}
