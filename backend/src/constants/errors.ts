export const COMMON_ERRORS = {
	INTERNAL_SERVER: "Internal server error",
	VALIDATION_ERRORS: (messages: string, source: string) => `${source} validation error => ${messages}`,
	TOKEN_VALIDATION: "Error during token valiadation",
	NOT_FOUND: "Not found",
	NOT_AUTHENTICATED: "Authentication required",
	FORBIDDEN: "Access forbiden",
	BAD_REQUEST: "Invalid request",
	NO_TOKEN: "No Token found"
};
