let currentBoardData = [];
let initialBoardData = [];
let currentQuestionObj = null;
let selectedCellIndex = null;
let currentSize = 9;

// 頁面初始化
document.addEventListener("DOMContentLoaded", () => {
  renderLevelMenu();
});

// 獲取通關紀錄 (從瀏覽器 LocalStorage)
function getCompletedLevels() {
  const data = localStorage.getItem("sudoku_completed_levels");
  return data ? JSON.parse(data) : [];
}

// 標記關卡為已完成
function saveCompletedLevel(levelKey) {
  const completed = getCompletedLevels();
  if (!completed.includes(levelKey)) {
    completed.push(levelKey);
    localStorage.setItem("sudoku_completed_levels", JSON.stringify(completed));
  }
}

// 渲染首頁的關卡按鈕
function renderLevelMenu() {
  const row6x6 = document.getElementById("row-6x6");
  const row9x9 = document.getElementById("row-9x9");
  const completedLevels = getCompletedLevels();

  row6x6.innerHTML = "";
  row9x9.innerHTML = "";

  // 生成 6x6 按鈕
  questions6x6.forEach((q) => {
    const levelKey = `6x6_${q.id}`;
    const btn = document.createElement("button");
    btn.className = "level-btn";
    btn.innerText = q.name;
    
    // 如果已經通關，加上綠剔 CSS class
    if (completedLevels.includes(levelKey)) {
      btn.classList.add("completed");
    }

    btn.onclick = () => loadGame(6, q);
    row6x6.appendChild(btn);
  });

  // 生成 9x9 按鈕
  questions9x9.forEach((q) => {
    const levelKey = `9x9_${q.id}`;
    const btn = document.createElement("button");
    btn.className = "level-btn";
    btn.innerText = q.name;

    // 如果已經通關，加上綠剔 CSS class
    if (completedLevels.includes(levelKey)) {
      btn.classList.add("completed");
    }

    btn.onclick = () => loadGame(9, q);
    row9x9.appendChild(btn);
  });
}

// 載入遊戲關卡
function loadGame(size, questionObj) {
  currentSize = size;
  currentQuestionObj = questionObj;
  initialBoardData = [...questionObj.board];
  currentBoardData = [...questionObj.board];
  selectedCellIndex = null;

  document.getElementById("game-title").innerText = `${size}x${size} - ${questionObj.name}`;
  document.getElementById("home-screen").classList.remove("active");
  document.getElementById("game-screen").classList.add("active");

  renderBoard();
  renderKeypad();
  checkIfBoardFull(); // 檢查是否已滿
}

// 返回首頁
function showHomeScreen() {
  document.getElementById("game-screen").classList.remove("active");
  document.getElementById("home-screen").classList.active = false;
  document.getElementById("home-screen").classList.add("active");
  renderLevelMenu(); // 重新渲染選單以刷新綠剔狀態
}

// 渲染數獨棋盤
function renderBoard() {
  const boardEl = document.getElementById("sudoku-board");
  boardEl.innerHTML = "";
  boardEl.className = `sudoku-board grid-${currentSize}`;

  // 獲取當前選取格子的信息 (如果有的話)
  let selectedRow = null;
  let selectedCol = null;
  let selectedNum = null;

  if (selectedCellIndex !== null) {
    selectedRow = Math.floor(selectedCellIndex / currentSize);
    selectedCol = selectedCellIndex % currentSize;
    selectedNum = currentBoardData[selectedCellIndex];
  }

  // 遍歷並渲染每一個格子
  currentBoardData.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    
    // 1. 基礎數字顯示
    const isGiven = initialBoardData[idx] !== 0;
    if (isGiven) {
      cell.classList.add("given");
      cell.innerText = val;
    } else if (val !== 0) {
      cell.classList.add("user-filled");
      cell.innerText = val;
    }

    // 2. 處理高亮邏輯 (只有在有格子被選取時才計算)
    if (selectedCellIndex !== null) {
      const currentRow = Math.floor(idx / currentSize);
      const currentCol = idx % currentSize;

      // A. 選取格本身
      if (idx === selectedCellIndex) {
        cell.classList.add("selected");
      }
      
      // B. 同數字高亮 (如果選取格有數字，且不是空格)
      else if (selectedNum !== 0 && val === selectedNum) {
        cell.classList.add("highlight-same-num");
      }

      // C. 同行或同列高亮 (相關格)
      else if (currentRow === selectedRow || currentCol === selectedCol) {
        cell.classList.add("highlight-related");
      }
    }

    // 3. 點擊格子事件
    cell.onclick = () => {
      // 無論是否預設數字，點擊都選取，以便查看高亮
      selectedCellIndex = idx;
      renderBoard(); // 重新渲染以更新高亮
    };

    boardEl.appendChild(cell);
  });
}

// 渲染數字鍵盤
function renderKeypad() {
  const keypadEl = document.getElementById("keypad");
  keypadEl.innerHTML = "";

  for (let i = 1; i <= currentSize; i++) {
    const btn = document.createElement("button");
    btn.className = "num-btn";
    btn.innerText = i;
    btn.onclick = () => fillNumber(i);
    keypadEl.appendChild(btn);
  }

  const clearBtn = document.createElement("button");
  clearBtn.className = "num-btn clear-btn";
  clearBtn.innerHTML = "&#129529;"; // 橡皮擦 (Eraser) Icon SVG / Unicode
  clearBtn.title = "清除數字";
  clearBtn.onclick = () => fillNumber(0);
  keypadEl.appendChild(clearBtn);
}

// 輸入數字
function fillNumber(num) {
  if (selectedCellIndex === null) return;
  
  if (initialBoardData[selectedCellIndex] === 0) {
    currentBoardData[selectedCellIndex] = num;
    renderBoard();
    checkIfBoardFull();
  }
}

// 檢查是否所有格子都已填滿 (不包含 0)
function checkIfBoardFull() {
  const submitBtn = document.getElementById("submit-btn");
  const isFull = !currentBoardData.includes(0);

  // 填滿時顯示提交按鈕，否則隱藏
  submitBtn.style.display = isFull ? "block" : "none";
}


// 檢查答案
function checkAnswer() {
  if (!currentQuestionObj || !currentQuestionObj.answer) {
    showModal("⚠️", "缺少答案", "題目未設定正確答案！", false);
    return;
  }

  let isCorrect = true;
  for (let i = 0; i < currentBoardData.length; i++) {
    if (currentBoardData[i] !== currentQuestionObj.answer[i]) {
      isCorrect = false;
      break;
    }
  }

  if (isCorrect) {
    // 記下該題目 (例如 "6x6_1" 或 "9x9_2")
    const levelKey = `${currentSize}x${currentSize}_${currentQuestionObj.id}`;
    saveCompletedLevel(levelKey);
    
    // 顯示成功彈窗
    showModal("🎉", "挑戰成功！", "恭喜你，答案完全正確！", true);
  } else {
    // 顯示失敗彈窗
    showModal("❌", "答案有誤", "還有些數字不對，再檢查一下吧！", false);
  }
}

// 顯示彈窗 Div
function showModal(icon, title, msg, isSuccess) {
  isCurrentAnswerCorrect = isSuccess;
  
  document.getElementById("modal-icon").innerText = icon;
  document.getElementById("modal-title").innerText = title;
  document.getElementById("modal-msg").innerText = msg;

  document.getElementById("result-modal").classList.add("active");
}

// 關閉彈窗 Div
function closeModal() {
  document.getElementById("result-modal").classList.remove("active");

  // 如果答對，關閉彈窗後自動返回封面（並刷新綠剔）
  if (isCurrentAnswerCorrect) {
    showHomeScreen();
  }
}
