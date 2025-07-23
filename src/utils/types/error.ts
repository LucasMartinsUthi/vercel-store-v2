export class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public body?: unknown
  ) {
    super(`${status} - ${statusText}`)
    this.name = 'HttpError'
  }
}
