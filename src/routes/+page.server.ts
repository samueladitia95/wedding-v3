import { schemaRsvp } from "$lib/schema";
import { superValidate } from "sveltekit-superforms/server";

export const load = async () => {
	const form = await superValidate(schemaRsvp);

	return { form };
};
