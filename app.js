function calcDogAge(birthDate) {
    const now = new Date();
    const birth = new Date(birthDate);

    if (isNaN(birth.getTime()) || birth > now) {
        return { dogYears: 0, humanYears: 0, invalid: true };
    }

    const diffMs = now - birth;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const dogYears = diffDays / 365.25;

    let humanYears = 0;
    if (dogYears <= 0) {
        humanYears = 0;
    } else if (dogYears <= 1) {
        humanYears = dogYears * 15;
    } else if (dogYears <= 2) {
        humanYears = 15 + (dogYears - 1) * 9;
    } else {
        humanYears = 24 + (dogYears - 2) * 5;
    }

    return {
        dogYears,
        humanYears,
        invalid: false
    };
}

function formatDogAge(dogYears) {
    if (dogYears <= 0) return "未滿 1 個月";

    const totalMonths = Math.floor(dogYears * 12);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const yearText = years > 0 ? `${years} 歲` : "";
    const monthText = months > 0 ? `${months} 個月` : "";

    if (yearText && monthText) return `${yearText} ${monthText}`;
    if (yearText) return yearText;
    return monthText;
}

document.addEventListener("DOMContentLoaded", function () {
    const birthInput = document.getElementById("birthDate");
    const calcBtn = document.getElementById("calcBtn");
    const dogAgeText = document.getElementById("dogAgeText");
    const humanAgeText = document.getElementById("humanAgeText");

    // ============================
    // 1. 讀取 localStorage 的值
    // ============================
    const savedBirth = localStorage.getItem("dogBirthDate");

    if (savedBirth) {
        birthInput.value = savedBirth;

        // 載入後自動計算
        const result = calcDogAge(savedBirth);
        if (!result.invalid) {
            const dogAgeStr = formatDogAge(result.dogYears);
            const humanYearsRounded = Math.round(result.humanYears * 10) / 10;

            dogAgeText.textContent = `妙麗現在大約 ${dogAgeStr} 狗年齡，`;
            humanAgeText.textContent = `換算人類年齡約是 ${humanYearsRounded} 歲。`;
        }
    }

    // =========================================
    // 2. 按下計算按鈕 → 計算＋寫入 localStorage
    // =========================================
    calcBtn.addEventListener("click", function () {
        const birthValue = birthInput.value;

        // **存入 localStorage**
        localStorage.setItem("dogBirthDate", birthValue);

        const result = calcDogAge(birthValue);
        if (result.invalid) {
            dogAgeText.textContent = "妙麗現在大約 —";
            humanAgeText.textContent = "換算人類年齡約是 — 歲。";
            return;
        }

        const dogAgeStr = formatDogAge(result.dogYears);
        const humanYearsRounded = Math.round(result.humanYears * 10) / 10;

        dogAgeText.textContent = `妙麗現在大約 ${dogAgeStr} 狗年齡，`;
        humanAgeText.textContent = `換算人類年齡約是 ${humanYearsRounded} 歲。`;
    });
});
