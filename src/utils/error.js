const ERROR_CODES = {
    'Incorrect username or password': 'Неправильынй пароль'
}

export function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}