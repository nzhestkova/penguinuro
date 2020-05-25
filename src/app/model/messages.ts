export const minute = 60 * 1000;

export const messages = {
  notification: {
    haveNotNewNotifications: "нет новых уведомлений",
  },
  welcomeMessage: "Привет! Добро пожаловать в сервис.",
  welcomeOwner: "Приложение",
  validation: {
    requireError: "Нужно заполнить поле",
    loginExistError: "Логин занят",
    patternError: "Недопустимые символы",
    loginMinLengthError: "Логин слишком короткий",
    usernameMinLengthError: "Имя слишком короткое",
    passwordMinLengthError: "Пароль слишком короткий",
    passwordDoesntMatch: "Пароли не совпадают",
  },
  authentication: {
    loginDoesntExist: "Пользователя с таким логином не существует",
    passwordDoesntMatch: "Неверный пароль",
  },
  confirmation: {
    deleteAccountQuestion: "Действительно удалить аккаунт?",
    deleteAccountInfo: "Действие нельзя отменить - страница будет удалена без возможности восстановления",
    deleteAccountConfirm: "Удалить",
    deleteAccountCancel: "Отменить",
  },
  education: {
    materials: {
      empty: "нет материалов",
      add: "Новый материал",
      filter: [
        "все",
        "загруженные",
        "сохраненные",
      ],
      sortOrder: [
        "сначала новые",
        "сначала старые",
      ],
    },
    tasks: {
      empty: "нет заданий",
      add: "Новое задание",
      filter: [
        "невыполненные",
        "выполненные",
      ],
      sortOrder: [
        "сначала новые",
        "сначала старые",
      ],
      types: {
        hint: "Наведите на значок задания, чтобы посмотреть описание",
        simple: "Письменное задание",
        simpleDescription: "Задание в свободной форме: проверяется преподавателем",
        control: "Тестовое задание",
        controlDescription: "Задание в тестовой форме: тестовая часть проверяется автоматически," +
          " письменная (если есть) - преподавателем",
      }
    },
    materialsFilter: [
      "все",
      "загруженные",
      "сохраненные",
    ],
    tasksFilter: [
      "невыполненные",
      "выполненные",
    ],
    sortOrder: [
        "сначала новые",
        "сначала старые",
    ],
    materialsEmpty: "нет материалов",
    materialsAddPhrase: "Новый материал",
    tasksEmpty: "нет заданий",
    tasksAddPhrase: "Новое задание",
  },
  testCreator: {
    questionTip: "Придумайте вопрос..?",
    answerTip: "Запишите вариант ответа",
    addAnswerPhrase: "Добавить вариант ответа",
    completeCreatingAnswer: "Сохранить вопрос"
  }
};
