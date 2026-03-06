import { ZodError, ZodSafeParseResult, formatError, treeifyError } from "zod";

export function printZodError<T>(parseResult: ZodSafeParseResult<T>) {
	if (parseResult.success) return "";

	const messages = parseResult.error.issues
		.map((issue) => {
			const field = issue.path.join(".");
			const message = issue.message;
			console.log(message)
			return `${field}: ${message.replace(/\n/g, " ")}`;
		})
		.join("; ");

	return messages;
}