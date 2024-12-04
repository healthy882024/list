const data = {
    "2024-01-01": {
        amount: 100,
        details: [
            {
                name: "京东",
                amount: 10,
                details: [
                    { name: "袜子", amount: 2 },
                    { name: "手套", amount: 3 },
                    { name: "玩具", amount: 5 }
                ]
            },
            {
                name: "淘宝",
                amount: 30,
                details: []
            },
            {
                name: "叮咚",
                amount: 50,
                details: []
            }
        ]
    },
    "2024-01-02": {
        amount: 200,
        details: [
            {
                name: "京东",
                amount: 50,
                details: []
            },
            {
                name: "淘宝",
                amount: 80,
                details: []
            },
            {
                name: "叮咚",
                amount: 70,
                details: []
            }
        ]
    }
};

const mainContainer = document.getElementById('main');

function renderMain() {
    mainContainer.innerHTML = '';
    for (const [date, entry] of Object.entries(data)) {
        const entryDiv = document.createElement('div');
        entryDiv.classList.add('entry');
        entryDiv.innerHTML = `
            <span>${date}</span> <span class="amount">￥${entry.amount}</span>
        `;
        entryDiv.addEventListener('click', () => openModal(date));
        mainContainer.appendChild(entryDiv);
    }
}

// 打开模态窗口
function openModal(date) {
    const entry = data[date];

    // 创建模态窗口
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.innerHTML = `
        <span class="close">&times;</span>
        <h2>${date} - ￥${entry.amount}</h2>
    `;

    const modalDetails = document.createElement('div');
    modalDetails.id = 'modal-details';

    entry.details.forEach((detail) => {
        const detailDiv = document.createElement('div');
        detailDiv.classList.add('detail');
        detailDiv.innerHTML = `
            <span>${detail.name}</span> <span class="amount">￥${detail.amount}</span>
        `;
        detailDiv.addEventListener('click', () => openSubModal(detail, modalDetails));
        modalDetails.appendChild(detailDiv);
    });

    modalContent.appendChild(modalDetails);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // 关闭模态窗口
    const closeModalButton = modal.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
        closeModal(modal);  // 使用关闭动画
    });

    // 显示模态窗口
    modal.style.display = 'block';
}

// 关闭模态窗口并添加退出动画
function closeModal(modal) {
    modal.querySelector('.modal-content').style.animation = 'fadeOut 0.3s ease-in-out';  // 退出动画
    setTimeout(() => {
        modal.remove();  // 移除模态窗口
    }, 300);  // 动画持续时间后关闭窗口
}

// 打开子项详情
function openSubModal(detail, modalDetails) {
    const subModal = document.createElement('div');
    subModal.classList.add('modal');

    const subModalContent = document.createElement('div');
    subModalContent.classList.add('modal-content');
    subModal.innerHTML = `
        <span class="close">&times;</span>
        <h3>${detail.name} - ￥${detail.amount}</h3>
    `;

    const subDetails = document.createElement('div');
    subDetails.id = 'modal-details';

    detail.details.forEach((subDetail) => {
        const subDetailDiv = document.createElement('div');
        subDetailDiv.classList.add('detail');
        subDetailDiv.innerHTML = `
            <span>${subDetail.name}</span> <span class="amount">￥${subDetail.amount}</span>
        `;
        subDetails.appendChild(subDetailDiv);
    });

    subModalContent.appendChild(subDetails);
    subModal.appendChild(subModalContent);
    document.body.appendChild(subModal);

    // 关闭子项模态窗口
    const closeSubModalButton = subModal.querySelector('.close');
    closeSubModalButton.addEventListener('click', () => {
        closeModal(subModal);  // 使用关闭动画
    });

    // 显示子项模态窗口
    subModal.style.display = 'block';
}

renderMain();
