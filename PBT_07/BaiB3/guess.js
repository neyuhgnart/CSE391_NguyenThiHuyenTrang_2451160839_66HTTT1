const targetNumber = Math.floor(Math.random() * 100) + 1;

const MAX_GUESSES = 7; 
let guessCount = 0;    
const guessedNumbers = []; 
let isWin = false;   

alert("Chào mừng bạn đến với Mini Game: Đoán số!\nMáy đã chọn ngẫu nhiên một số từ 1 đến 100. Bạn có tối đa 7 lượt đoán. Hãy bắt đầu chơi!");

while (guessCount < MAX_GUESSES) {
    let currentLượt = guessCount + 1;
    let input = prompt(`[Lượt đoán ${currentLượt}/${MAX_GUESSES}] Nhập một số từ 1 đến 100:`);

    if (input === null) {
        alert("Bạn đã thoát trò chơi.");
        break;
    }

    let userGuess = parseInt(input.trim(), 10);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        alert("Lỗi: Vui lòng chỉ nhập một số nằm trong khoảng từ 1 đến 100!");
        continue; 
    }

    let isDuplicated = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === userGuess) {
            isDuplicated = true;
            break;
        }
    }

    if (isDuplicated) {
        alert(`Bạn đã đoán số ${userGuess} này rồi!`);
        continue; 
    }

    guessedNumbers.push(userGuess);
    guessCount++;

    if (userGuess === targetNumber) {
        isWin = true;
        alert("Đúng rồi!");
        alert(`Chúc mừng! Bạn đoán đúng sau ${guessCount} lần!`);
        break; 
    } else if (userGuess > targetNumber) {
        alert("Thấp hơn"); 
    } else {
        alert("Cao hơn"); 
    }
}

if (!isWin && guessCount === MAX_GUESSES) {
    alert(`Đã hết lượt đoán! Bạn đã thua cuộc.\nĐáp án chính xác là: ${targetNumber}`);
}