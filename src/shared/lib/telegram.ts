function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing env ${name}`)
  }

  return value
}

export async function sendTelegramMessage(text: string) {
  const token = getRequiredEnv('TELEGRAM_BOT_TOKEN')
  const chatId = getRequiredEnv('TELEGRAM_CHAT_ID')

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(`Telegram API error: ${response.status} ${errorText}`)
  }
}
