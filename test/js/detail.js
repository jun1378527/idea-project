const files = document.querySelectorAll('li');
const codeContainer = document.querySelector('.code-container');
const reviewContainer = document.querySelector('.review-container');

let fileNum = 1;
let isReviewCreated = false;
let reviewIndex = 0;

const init = () => {
    const createBtn = document.querySelector('.create-btn');
    createBtn.addEventListener('click', handleClickCreateBtn);
    files.forEach((file) => {
        file.addEventListener('click', handleClickFile)
    })
    // 코드 라인 생성(최대 50줄)
    for(i=0; i<50; i++) {
        const line = document.createElement('div');
        const lineNum = document.createElement('span');
        const lineContent = document.createElement('span');

        line.classList.add('line');
        line.dataset.key = i+1;
        lineNum.dataset.key = i+1;
        lineNum.innerText = i+1;
        lineNum.classList.add('num', 'left-space')
        lineContent.innerText = ``;
        lineContent.classList.add('code');
        
        const plusBtn = document.createElement('button');
        plusBtn.textContent = '+';
        plusBtn.classList.add('plus-btn', 'hidden');
        plusBtn.addEventListener('click', handleClickPlusBtn);
        
        line.append(plusBtn, lineNum, lineContent);
        codeContainer.appendChild(line);
    }
    paintCode(fileNum);
};

const handleClickCreateBtn = (e) => {
    const fileContent = fileContents[fileNum];
    const lines = document.querySelectorAll('.left-container>.code-container>.line');
    for(i=0; i<50; i++) {
        if (fileContent[i]) {
            const plusBtn = lines[i].querySelector('button');
            const lineNum = lines[i].querySelector('.num');
            plusBtn.classList.remove('hidden');
            lineNum.classList.remove('left-space');
        } else {
            break;
        }
    }
    if (!isReviewCreated) {
        const reviewBox = document.createElement('form');
        reviewBox.classList.add('review-box');
        reviewBox.dataset.key = reviewIndex;
        reviewBox.addEventListener("submit", handleSubmit);

        const reviewedCode = document.createElement('div');
        reviewedCode.classList.add('reviewed-code');

        const reviewText = document.createElement('textarea');
        reviewText.classList.add('review-text');
        reviewText.placeholder = '여기에 리뷰를 입력해주세요.'

        const addBtn = document.createElement('button');
        addBtn.innerText = '제출';
        addBtn.type = 'submit';
        addBtn.classList.add('add-btn');

        reviewBox.append(reviewedCode, reviewText, addBtn);
        reviewContainer.append(reviewBox);

        isReviewCreated = true;
        reviewIndex += 1;
    }
};

const handleSubmit = (e) => {
    e.preventDefault();
    const reviewBox = e.target;
    const text = document.createElement('p');
    text.innerText = e.target.querySelector('textarea').value;

    const newReview = reviewBox.cloneNode(true);
    const textarea = newReview.querySelector('textarea');
    const addBtn = newReview.querySelector('button');

    const editBtn = document.createElement('button');
    editBtn.innerText = '수정';
    editBtn.classList.add('edit-btn');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '삭제';
    deleteBtn.classList.add('delete-btn');
    /**
     * editBtn, deleteBtn에 수정, 삭제 이벤트 핸들러 만들어주시면 됩니다.
     */

    addBtn.remove();
    newReview.replaceChild(text, textarea);
    newReview.append(editBtn, deleteBtn);
    reviewBox.remove();
    reviewContainer.appendChild(newReview);
    isReviewCreated = false;
};

const handleClickFile = (e) => {
    clearCode(fileNum);
    fileNum = e.target.dataset.key;
    paintCode(fileNum)
};

const handleClickPlusBtn = (e) => {
    const selectedLine = e.target.parentNode;
    let reviewedCode;

    reviewedCode = document.querySelector('.reviewed-code');
    const newLine = document.createElement('div');
    newLine.classList.add('line');
    const contents = selectedLine.querySelectorAll('span');
    contents.forEach((content) => {
        newLine.appendChild(content.cloneNode(true));
        reviewedCode.appendChild(newLine)
    });
}

const paintCode = (fileNum) => {
    const fileContent = fileContents[fileNum];
    const lines = document.querySelectorAll('.left-container>.code-container>.line');
    for(i=0; i<50; i++) {
        if (fileContent[i]) {
            const lineContent = lines[i].querySelector('.code');
            lineContent.innerText = fileContent[i];
        } else {
            break;
        }
    }
}

const clearCode = (fileNum) => {
    const fileContent = fileContents[fileNum];
    const lines = document.querySelectorAll('.left-container>.code-container>.line');
    for(i=0; i<50; i++) {
        if (fileContent[i]) {
            const plusBtn = lines[i].querySelector('button');
            const lineNum = lines[i].querySelector('.num');
            const lineContent = lines[i].querySelector('.code');
            lineContent.innerText = ``;
            const hasClass = plusBtn.classList.contains('hidden');
            if (!hasClass) {
                plusBtn.classList.add('hidden');
                lineNum.classList.add('left-space');
            }
        } else {
            break;
        }
    }
};

init();