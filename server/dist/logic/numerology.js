export function calculateLifePath(date) {
    const digits = date.replace(/\D/g, "").split("").map(Number);
    const sum = digits.reduce((acc, n) => acc + n, 0);
    return reduceToDigit(sum);
}
function reduceToDigit(value) {
    let current = value;
    while (current > 9) {
        current = current
            .toString()
            .split("")
            .map(Number)
            .reduce((acc, n) => acc + n, 0);
    }
    return Math.max(1, current);
}
