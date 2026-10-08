
import { webcrypto } from 'node:crypto'
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import { emitKeypressEvents } from 'node:readline'

const { subtle } = webcrypto

const inputDir = 'private-tickets'
const outputDir = 'public/tickets'
const encoder = new TextEncoder()

async function askPassword() {
    if (!process.stdin.isTTY) {
        throw new Error('Run this script in an interactive terminal')
    }

    return new Promise((resolve, reject) => {
        const stdin = process.stdin
        let password = ''

        process.stdout.write('Encryption password: ')

        emitKeypressEvents(stdin)
        stdin.setRawMode(true)
        stdin.resume()

        function cleanup() {
            stdin.setRawMode(false)
            stdin.off('keypress', onKeypress)
            stdin.pause()
            process.stdout.write('\n')
        }

        function onKeypress(char, key) {
            if (key?.ctrl && key.name === 'c') {
                cleanup()
                reject(new Error('Cancelled'))
            } else if (key?.name === 'return' || key?.name === 'enter') {
                cleanup()
                if (!password) reject(new Error('Password cannot be empty'))
                else resolve(password)
            } else if (key?.name === 'backspace') {
                password = password.slice(0, -1)
            } else if (char && !key?.ctrl && !key?.meta) {
                password += char
            }
        }

        stdin.on('keypress', onKeypress)
    })
}

async function deriveKey(password, salt) {
    const baseKey = await subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveKey'],
    )

    return subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt,
            iterations: 600_000,
            hash: 'SHA-256',
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt'],
    )
}

async function encryptPdf(filename, password) {
    const original = await readFile(join(inputDir, filename))

    const salt = webcrypto.getRandomValues(new Uint8Array(16))
    const iv = webcrypto.getRandomValues(new Uint8Array(12))
    const key = await deriveKey(password, salt)

    const encrypted = await subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        original,
    )

    const output = Buffer.concat([
        Buffer.from('STG1'),
        Buffer.from(salt),
        Buffer.from(iv),
        Buffer.from(encrypted),
    ])

    const outputName = `${parse(filename).name}.enc`

    await writeFile(join(outputDir, outputName), output)

    console.log(`Encrypted: ${filename} -> ${outputName}`)
}

async function main() {
    const files = (await readdir(inputDir))
        .filter((file) => file.toLowerCase().endsWith('.pdf'))

    if (files.length === 0) {
        console.log('No PDF files found.')
        return
    }

    const password = await askPassword()
    await mkdir(outputDir, { recursive: true })

    for (const file of files) {
        await encryptPdf(file, password)
    }

    console.log(`Done! ${files.length} PDF(s) encrypted.`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
