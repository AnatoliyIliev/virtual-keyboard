# virtual-keyboard

Максимальный балл за задание: 110

-- Minimal scope:

- реализована генерация DOM-элементов. body в index.html пусто (может содержать
  только script тег):+20
- нажатие клавиши на физической клавиатуре выделяет клавишу на виртуальной
  клавиатуре (вы должны проверить нажатия цифр, букв, знаков препинания,
  backspace, del(если они есть), enter, shift, alt, ctrl, tab, caps lock, space,
  клавиши со стрелками:+10

-- Basic scope:

- реализовано переключение раскладки клавиатуры между английским и другим
  языком. Выбранный язык следует сохранить и использовать при перезагрузке
  страницы. На странице должна быть указана комбинация клавиш для переключения
  языка:+15
- щелчки мышью по кнопкам виртуальной клавиатуры или нажатия кнопок на
  физической клавиатуре вводят символы в поле ввода (текстовое поле):+15 Extra

-- scope:

- реализована анимация нажатия клавиши:+15

-- Technical requirements:

- использование функций ES6+ (классы, деструктуризация свойств и т. д.):+15
- использование ESLint:+10
- требования к репозиторию, коммитам и пулреквестам соблюдены:+10

-- Penalties:

- там ошибки связанные с исполняемым кодом (ошибки вроде favicon.ico: Failed to
  load resource: the server responded with a status of 404не учитываются) или
  есть предупреждения eslint-config-airbnb-base:-15
