# Patrón Factoría: Notificaciones

## Concepto

El **Patrón Factoría (Factory Pattern)** es un patrón de diseño creacional que proporciona una interfaz para crear objetos en una superclase, mientras permite a las subclases alterar el tipo de objetos que se crearán.

En este sistema de notificaciones, utilizamos el patrón factoría para encapsular la lógica de creación de los distintos tipos de notificadores (Email, SMS, Push). Esto nos permite:

1.  **Desacoplamiento**: El código cliente (nuestro componente Vue) no necesita saber cómo instanciar cada clase de notificador específica (`new EmailNotifier()`, etc.). Solo necesita saber qué tipo de notificación quiere.
2.  **Extensibilidad**: Podemos añadir nuevos tipos de notificadores sin modificar el código que los utiliza (Open/Closed Principle).
3.  **Centralización**: La lógica de "qué clase usar para qué tipo" está en un solo lugar (`notificationFactory`).

## La Interfaz INotifier

La interfaz `INotifier` define el contrato común que todos los notificadores deben cumplir. Esto garantiza que cualquier notificador que creemos tendrá un método `send`.

```typescript
export interface INotifier {
  send(message: string): void
}
```

## La notificationFactory

La función `notificationFactory` es el núcleo de nuestro patrón. Recibe un tipo de notificación y devuelve una instancia de la clase correspondiente.

```typescript
export function notificationFactory(type: NotificationType): INotifier {
  switch (type) {
    case 'email':
      return new EmailNotifier()
    case 'sms':
      return new SmsNotifier()
    case 'push':
      return new PushNotifier()
    default:
      // Verificación de exhaustividad para atrapar errores en tiempo de compilación
      const exhaustiveCheck: never = type
      throw new Error(`Tipo de notificación no soportado: ${exhaustiveCheck}`)
  }
}
```

## Cómo Añadir un Nuevo Notificador (Ej. WhatsApp)

Gracias al patrón factoría, añadir un nuevo tipo de notificación es un proceso estructurado y seguro:

1.  **Crear la nueva clase**:
    Crea `WhatsAppNotifier.ts` que implemente `INotifier`.

    ```typescript
    export class WhatsAppNotifier implements INotifier {
      send(message: string): void {
        console.log(`[WHATSAPP] Enviando a: "${message}"`)
      }
    }
    ```

2.  **Actualizar el tipo**:
    Añade `'whatsapp'` al tipo `NotificationType` en `notificationFactory.ts`.

    ```typescript
    export type NotificationType = 'email' | 'sms' | 'push' | 'whatsapp'
    ```

3.  **Actualizar la factoría**:
    Añade el caso en el `switch` de `notificationFactory`.

    ```typescript
    case 'whatsapp':
      return new WhatsAppNotifier();
    ```

4.  **Actualizar la UI (Opcional)**:
    Añade la opción en el `<select>` de `NotificationComposer.vue` para que el usuario pueda seleccionarlo.

El resto del sistema (el componente Vue que envía el mensaje) **no necesita ningún cambio** para soportar este nuevo tipo.
