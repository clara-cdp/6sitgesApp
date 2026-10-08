
const encoder = new TextEncoder()

async function deriveKey(
    password: string,
    salt: Uint8Array<ArrayBuffer>,
): Promise<CryptoKey> {
    const baseKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveKey'],
    )

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt,
            iterations: 600_000,
            hash: 'SHA-256',
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt'],
    )
}

export async function decryptTicket(
    encryptedFile: ArrayBuffer,
    password: string,
): Promise<Blob> {
    const bytes = new Uint8Array(encryptedFile)

    const header = new TextDecoder().decode(bytes.slice(0, 4))

    if (header !== 'STG1') {
        throw new Error('Invalid ticket file format')
    }

    const salt = bytes.slice(4, 20)
    const iv = bytes.slice(20, 32)
    const encryptedData = bytes.slice(32)

    const key = await deriveKey(password, salt)

    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encryptedData,
    )

    return new Blob([decrypted], { type: 'application/pdf' })
}
