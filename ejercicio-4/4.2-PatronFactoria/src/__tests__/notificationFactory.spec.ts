import { describe, it, expect } from 'vitest'
import { notificationFactory, type NotificationType } from '../notifications/notificationFactory'
import { EmailNotifier } from '../notifications/EmailNotifier'
import { SmsNotifier } from '../notifications/SmsNotifier'
import { PushNotifier } from '../notifications/PushNotifier'

describe('notificationFactory', () => {
  it('Crear un tipo email', () => {
    const notifier = notificationFactory('email')
    expect(notifier).toBeInstanceOf(EmailNotifier)
  })

  it('Crear un tipo sms', () => {
    const notifier = notificationFactory('sms')
    expect(notifier).toBeInstanceOf(SmsNotifier)
  })

  it('Crear un tipo push', () => {
    const notifier = notificationFactory('push')
    expect(notifier).toBeInstanceOf(PushNotifier)
  })

  it('Lanzar un error para tipos invalidos', () => {
    expect(() => notificationFactory('telegram' as unknown as NotificationType)).toThrow()
  })
})
