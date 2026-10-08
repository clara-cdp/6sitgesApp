
export function validatePassword(password: string): string | null {

    if (password.length === 0) {
        return 'Introdueix la contrasenya.'
    }

    if (password.length > 256) {
        return 'La contrasenya és massa llarga.'
    }

    return null
}
