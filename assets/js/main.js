// swiper
const swiper01 = new Swiper(".swiper01", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 2,
    breakpoints: {
        575: {
            slidesPerView: 3,
        },
    },
    centeredSlides: true,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
});

const swiper02 = new Swiper(".swiper02", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 3.5,
    breakpoints: {
        575: {
            slidesPerView: 5.8,
        },
    },
    centeredSlides: true,
    spaceBetween: 30,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
});

const swiper03 = new Swiper(".swiper03", {
    direction: "horizontal",
    loop: true,
    slidesPerView: 3.5,
    breakpoints: {
        575: {
            slidesPerView: 5.8,
        },
    },
    centeredSlides: true,
    spaceBetween: 30,
    speed: 6000,
    allowTouchMove: false,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
    },
});


// モーダルを開く
document.addEventListener('DOMContentLoaded', function () {
    /**
     * 指定IDのモーダルを開く
     * @param {string} id - data-solution の値
     */
    function openModalById(id) {
        // いったん全モーダルを閉じる（念のため）
        document.querySelectorAll('.p-solution__modal.is-active').forEach(modal => {
            modal.classList.remove('is-active');
        });

        const targetModal = document.querySelector(`.p-solution__modal[data-solution="${id}"]`);
        if (targetModal) {
            targetModal.classList.add('is-active');
        }
    }

    /**
     * モーダルを閉じる
     * @param {HTMLElement} modalElm - .p-solution__modal 要素
     */
    function closeModal(modalElm) {
        modalElm.classList.remove('is-active');
    }

    // ▼ 「詳しく見る」ボタン → 対応するモーダルを開く
    const solutionItems = document.querySelectorAll('.p-solution__item');

    solutionItems.forEach(item => {
        const id = item.dataset.solution;
        const openBtn = item.querySelector('.p-solution__item-btn');

        if (!id || !openBtn) return;

        openBtn.addEventListener('click', function () {
            openModalById(id);
        });
    });

    // ▼ ✕ボタン → モーダルを閉じる
    const closeButtons = document.querySelectorAll('.p-solution__modal-close');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation(); // 背景クリック扱いにならないように
            const modal = btn.closest('.p-solution__modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // ▼ 背景クリック → モーダルを閉じる
    const modals = document.querySelectorAll('.p-solution__modal');

    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            // .p-solution__modal-content の外側（背景）をクリックしたときだけ閉じる
            if (!e.target.closest('.p-solution__modal-content')) {
                closeModal(modal);
            }
        });
    });

    // ▼ ESCキー → 開いているモーダルをすべて閉じる
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            document.querySelectorAll('.p-solution__modal.is-active').forEach(modal => {
                closeModal(modal);
            });
        }
    });
});

// ドクター紹介
document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('.js-open-modal');
    const modals = document.querySelectorAll('.p-doctor__modal');

    // 全モーダルを閉じる
    const closeAllModals = () => {
        modals.forEach(modal => modal.classList.remove('is-active'));
        document.body.style.overflow = '';
    };

    // index指定で開く
    const openModalByIndex = (index) => {
        closeAllModals();
        const modal = document.querySelector(
            `.p-doctor__modal[data-doctor-index="${index}"]`
        );
        if (!modal) return;

        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    };

    // 開く（Swiper内ボタン）
    openButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.doctorIndex;
            openModalByIndex(index);
        });
    });

    // 閉じる（×ボタン）
    document.addEventListener('click', (e) => {
        if (e.target.closest('.p-doctor__modal-close')) {
            closeAllModals();
        }
    });

    // 背景クリックで閉じる
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (!e.target.closest('.p-doctor__modal-content')) {
            closeAllModals();
            }
        });
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
});