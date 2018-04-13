# drone-cafe
Система автоматизации ресторана
* Тестовая версия системы: https://loev-drone-cafe.herokuapp.com/

## Описание системы
В системе автоматизации два основных интерфейса:

1. Интерфейс клиента, в котором можно оформить заказ и отслеживать его состояние. Открывается на главной странице (/)
2. Интерфейс повара, в котором отображаются заказанные блюда и есть возможность стартовать приготовление блюда и отмечать его готовность. Открывается по адресу /kitchen

## Исходные данные
Меню ресторана со списком блюд доступных для заказа с ценами предоставлен в файле menu.json

## Описание интерфейсов
### Интерфейс клиента
Для входа в интерфейс клиент должен указать своё имя и адрес электронной почты. Адрес электронной почты должен быть валидным. Никаких других проверок не требуется.

Если клиент с таким адресом электронной почты еще не был в системе, то создается новый аккаунт, и на его счет начисляется 100 Галактических кредитов (валюта, которая в ходу в той местности где расположено заведение).

После входа в интерфейсе отображается два основных блока. Информация об аккаунте, в котором имя и баланс и кнопка «пополнить». И состояние заказа, в котором отображается список заказанных блюд и кнопка «добавить».

Клиент может: 1. Пополнить счет. 2. Добавить блюдо к заказу. 3. Видеть список заказанных блюд и их состояние.

Пополнение счета
Пополнение счета реализуем в виде заглушки. Клик на кнопку «пополнить» просто добавляет 100 Галактических кредитов на счет клиента.

Заказ
При добавлении блюда открывается список доступных блюд с указанием цены. Если цена блюда не превышает баланс клиента, то отображается кнопка «заказать». Иначе отображается сообщение пополните баланс на X, где X недостающая сумма для заказа этого блюда.

После клика на кнопку «заказать» сумма списывается со счета клиента. А блюдо отображаются в списке. Начальное состояние блюда «заказано». Когда состояние того или иного блюда меняется, это должно отображаться в интерфейсе.

### Интерфейс повара
Отображается два списка. В первом заказанные блюда. Во втором те которые сейчас готовятся.

У заказанных блюд доступна кнопка «начать готовить». Клик на эту кнопку меняет её состояние на «готовится». И оно должно теперь отобразится в списке готовящихся блюд.

У блюд во втором списке есть кнопка «готово». Клик на эту кнопку меняет состояние блюда на «доставляется». Блюдо больше не отображается в интерфейсе повара.

Доставка блюд
Реализацией части системы управления дронами которые осуществляют доставку занимается другая команда. И они уже неплохо преуспели. Вам достаточно подключить в своём коде модуль предоставляющий простой интерфейс управления дронами netology-fake-drone-api.

Пока в нем доступна только одна функция deliver. Она принимает объект клиента и объект блюда, и возвращает промис. Промис будет разрешен успешно, если блюдо успешно доставлено клиенту. И будет отклонен, если при доставке возникли сложности. Например, дрон врезался в стену, или уронил блюдо. Да, дроны пока не на 100% совершенны и могут уничтожить доставляемое блюдо.

Вам нужно «передать» блюдо на доставку по факту готовности. И поменять состояние блюда когда оно будет успешно доставлено на «подано». В случае неуспешной доставки поменять статус на «возникли сложности». Так же при проблеме с доставкой необходимо вернуть стоимость блюда в качестве компенсации, на счет клиента.

## Состояния блюда и переходы
* Заказано
* Готовится
* Доставляется
* Возникли сложности
* Подано

В состояние «заказано» блюда приводит клиент, заказав блюда в интерфейсе.

В состояние «готовится» из состояния «заказано» блюдо переводит повар в списке заказанных блюд кликнув на «начать готовить».

В состояние «доставляется» из «готовится» тоже переводит повар, кликнув «готово» в списке блюд которые готовятся.

В состояние «подано» из «доставляется» блюдо переводит система при успешной доставке блюда дроном.

В состояние «возникли сложности» из «доставляется» блюда переводит система автоматически при не успешной доставке блюда дроном.

Из состояния «подано» и «возникли сложности» блюдо полностью удаляется через 2 минуты с момента перехода в это состояние.

## Дополнительные задачи
1. Снабдить заказанные блюда в интерфейсе клиента таймером, который стартует когда блюда заказано и останавливается когда «подано».
2. Снабдить блюда в интерфейсе повара в списке готовятся таймером, который стартует с момента начала приготовления и останавливается при завершении.
3. Дать возможность клиенту выбрать что делать с блюдом доставка которого не состоялась. Отменить заказ. Или повторить со скидкой 5%.