import { z } from "zod";

export const schemaRsvp = z
	.object({
		firstName: z.string({
			required_error: "First Name Can't be empty",
		}),
		lastName: z.string({
			required_error: "Last Name Can't be empty",
		}),
		phoneNumber: z
			.string({
				required_error: "Phone Number Can't be empty",
			})
			.regex(/(^08)(\d{3,4}-?){2}\d{2,3}$/, "Phone Number is Invalid"),
		email: z
			.string({
				required_error: "Email Can't be empty",
			})
			.email({
				message: "Email is Invalid",
			}),
		isAttend: z
			.boolean({
				required_error: "Message is Required",
			})
			.default(true),
	})
	.required();
