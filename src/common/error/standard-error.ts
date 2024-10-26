export class StandardError extends Error {
    private readonly status: number;

    private constructor(message: string, status: number) {
        super(message);
        this.name = "ErrorStandard";
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    static badRequest(message: string) {
        return new StandardError(message, 400);
    }

    static conflict(message: string) {
        return new StandardError(message, 409);
    }

    static forbidden(message: string) {
        return new StandardError(message, 403);
    }

    static notFound(message: string) {
        return new StandardError(message, 404);
    }

    static unauthorized(message: string) {
        return new StandardError(message, 401);
    }

    static unprocessableEntity(message: string) {
        return new StandardError(message, 422);
    }
}