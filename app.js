// Инициализация данных пользователя
let userName = "Имя пользователя";
let userCoins = {
    TON: 0,
    NOT: 0,
    DOGS: 0
};

// Получение информации из Telegram Web App
Telegram.WebApp.ready();

if (Telegram.WebApp.initDataUnsafe && Telegram.WebApp.initDataUnsafe.user) {
    userName = Telegram.WebApp.initDataUnsafe.user.first_name;
}

// Обновление интерфейса с именем пользователя и монетами
document.getElementById('user-name').innerText = userName;
document.getElementById('ton-coins').innerText = userCoins.TON;
document.getElementById('not-coins').innerText = userCoins.NOT;
document.getElementById('dogs-coins').innerText = userCoins.DOGS;

// Функция открытия модального окна
function openModal(chestName) {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-chest-name').innerText = chestName;
    document.getElementById('modal-coin-count').innerText = userCoins[chestName];
    let maxCoins = chestName === 'TON' ? '10M' : chestName === 'NOT' ? '5M' : '3M';
    document.getElementById('modal-coin-max').innerText = maxCoins;

    // Обработчик клика на сундук в модальном окне
    document.getElementById('modal-chest').onclick = function() {
        userCoins[chestName]++;
        document.getElementById('modal-coin-count').innerText = userCoins[chestName];
        updateUserCoins();
    };
}

// Функция закрытия модального окна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Функция обновления монет пользователя на главном экране
function updateUserCoins() {
    document.getElementById('ton-coins').innerText = userCoins.TON;
    document.getElementById('not-coins').innerText = userCoins.NOT;
    document.getElementById('dogs-coins').innerText = userCoins.DOGS;

    // Отправка данных в бота для сохранения
    Telegram.WebApp.sendData(JSON.stringify(userCoins));
}

// Функция навигации
function navigate(page) {
    // Здесь реализуйте переключение между страницами
    alert('Переход на страницу: ' + page);
}

// Функция подключения кошелька
function connectWallet() {
    // Здесь реализуйте подключение к кошельку Tonkeeper
    alert('Подключение кошелька');
}

// Функция "Boost"
function boost() {
    // Здесь реализуйте функционал буста
    alert('Буст активирован!');
}
