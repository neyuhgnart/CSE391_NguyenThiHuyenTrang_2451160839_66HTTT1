const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;
let maxAvg = -1;
let minAvg = 11;
let bestStudent = "";
let worstStudent = "";
let totalMath = 0, totalPhysics = 0, totalCS = 0;
let totalAvgMale = 0, countMale = 0;
let totalAvgFemale = 0, countFemale = 0;

const resultTable = [];

for (let i = 0; i < students.length; i++) {
    const s = students[i];
    //1. Tính **điểm trung bình** (math×0.4 + physics×0.3 + cs×0.3) cho mỗi sinh viên
    const avg = Number((s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3).toFixed(1));

    //2. Xếp loại: ≥8.0 Giỏi, ≥6.5 Khá, ≥5.0 Trung bình, <5.0 Yếu, Đếm số SV mỗi xếp loại
    let rank = "";
    if (avg >= 8.0) {
        rank = "Giỏi";
        countGioi++; 
    } else if (avg >= 6.5) {
        rank = "Khá";
        countKha++;   
    } else if (avg >= 5.0) {
        rank = "Trung bình";
        countTB++;    
    } else {
        rank = "Yếu";
        countYeu++;   
    }

    resultTable.push({ stt: i + 1, name: s.name, avg: avg.toFixed(1), rank: rank });

    //5. Tìm SV có điểm TB cao nhất và thấp nhất
    if (avg > maxAvg) {
        maxAvg = avg;
        bestStudent = s.name;
    }
    if (avg < minAvg) {
        minAvg = avg;
        worstStudent = s.name;
    }

    //6. Tính điểm TB toàn lớp cho từng môn
    totalMath += s.math;
    totalPhysics += s.physics;
    totalCS += s.cs;

    //7. **Bonus:** Tính điểm TB theo giới tính
    if (s.gender === "M") {
        totalAvgMale += avg;
        countMale++;
    } else if (s.gender === "F") {
        totalAvgFemale += avg;
        countFemale++;
    }
}
// in kq
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");
for (let i = 0; i < resultTable.length; i++) {
    const row = resultTable[i];
    const sttStr = row.stt.toString().padEnd(3);
    const nameStr = row.name.padEnd(6);
    const avgStr = row.avg.padEnd(4);
    const rankStr = row.rank.padEnd(11);
    console.log(`| ${sttStr} | ${nameStr} | ${avgStr} | ${rankStr} |`);
}
console.log("\n---------------------------------------------\n");

// 4. In số lượng SV mỗi xếp loại
console.log("4. Số lượng sinh viên theo từng xếp loại:");
console.log(`- Giỏi: ${countGioi} SV`);
console.log(`- Khá: ${countKha} SV`);
console.log(`- Trung bình: ${countTB} SV`);
console.log(`- Yếu: ${countYeu} SV`);
console.log("\n---------------------------------------------\n");

// 5. In SV có điểm TB cao nhất và thấp nhất
console.log("5. Sinh viên có điểm TB cao nhất và thấp nhất:");
console.log(`- Cao nhất: ${bestStudent} (${maxAvg.toFixed(1)} điểm)`);
console.log(`- Thấp nhất: ${worstStudent} (${minAvg.toFixed(1)} điểm)`);
console.log("\n---------------------------------------------\n");

// 6. In điểm TB toàn lớp cho từng môn
const classAvgMath = (totalMath / students.length).toFixed(2);
const classAvgPhysics = (totalPhysics / students.length).toFixed(2);
const classAvgCS = (totalCS / students.length).toFixed(2);
console.log("6. Điểm trung bình toàn lớp theo từng môn:");
console.log(`- Môn Toán (Math): ${classAvgMath}`);
console.log(`- Môn Vật lý (Physics): ${classAvgPhysics}`);
console.log(`- Môn Tin học (CS): ${classAvgCS}`);
console.log("\n---------------------------------------------\n");

// 7. Bonus: Điểm TB theo giới tính
const avgMaleResult = countMale > 0 ? (totalAvgMale / countMale).toFixed(2) : 0;
const avgFemaleResult = countFemale > 0 ? (totalAvgFemale / countFemale).toFixed(2) : 0;
console.log("7. Bonus - Điểm trung bình theo giới tính:");
console.log(`- Nam (M): ${avgMaleResult}`);
console.log(`- Nữ (F): ${avgFemaleResult}`);