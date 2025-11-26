export class Pila<T> {
  private elementos: T[] = []

  push(elemento: T): void {
    this.elementos.push(elemento)
  }

  pop(): T | undefined {
    return this.elementos.pop()
  }

  peek(): T | undefined {
    return this.elementos[this.elementos.length - 1]
  }

  size(): number {
    return this.elementos.length
  }

  isEmpty(): boolean {
    return this.elementos.length === 0
  }

  getElementos(): T[] {
    return [...this.elementos] // Retorna una copia para no mutar la referencia interna
  }

  // Método extra útil para vaciar la pila rápidamente
  clear(): void {
    this.elementos = []
  }
}
