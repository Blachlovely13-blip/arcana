export function buildDestinyMatrix(birthDate) {
    const digits = birthDate.replace(/\D/g, "").split("").map(Number);
    const dayPart = birthDate.slice(8, 10).replace(/\D/g, "");
    const monthPart = birthDate.slice(5, 7).replace(/\D/g, "");
    const yearPart = birthDate.slice(0, 4).replace(/\D/g, "");
    const coreNumber = reduceToDigit(digits.reduce((acc, n) => acc + n, 0));
    const soulNumber = reduceToDigit(sumDigits(dayPart) + sumDigits(monthPart));
    const fateNumber = reduceToDigit(sumDigits(yearPart) + coreNumber);
    const matrixDigits = [
        ...digits,
        coreNumber,
        soulNumber,
        fateNumber,
        reduceToDigit(coreNumber + soulNumber),
        reduceToDigit(soulNumber + fateNumber),
        reduceToDigit(coreNumber + fateNumber)
    ];
    const matrix = [matrixDigits.slice(0, 3), matrixDigits.slice(3, 6), matrixDigits.slice(6, 9)];
    return {
        coreNumber,
        soulNumber,
        fateNumber,
        matrix,
        interpretation: [
            `Центр матрицы: ${coreNumber} — основной вектор характера и решений.`,
            `Число души: ${soulNumber} — внутренний мотив и эмоциональный фокус.`,
            `Число судьбы: ${fateNumber} — долгосрочный путь и стиль реализации.`
        ]
    };
}
function sumDigits(value) {
    return value
        .split("")
        .map((item) => Number(item))
        .reduce((acc, n) => acc + n, 0);
}
function reduceToDigit(value) {
    let current = Math.max(1, value);
    while (current > 9) {
        current = current
            .toString()
            .split("")
            .map(Number)
            .reduce((acc, n) => acc + n, 0);
    }
    return current;
}
