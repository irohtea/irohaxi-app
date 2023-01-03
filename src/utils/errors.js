const ERROR_CODES = {
    EMAIL_NOT_FOUND: 'Почта не найдена',
    INVALID_PASSWORD: 'Неправильный пароль',
    auth: 'Пожалуйста войдите в систему!',
    'Could not validate credentials': 'Could not valiadadadate credentials'
}

export function error(code) {
    return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}