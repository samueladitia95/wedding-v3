import { pb } from "$lib/pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import type { PageLoad } from "./$types";
import { schemaRsvp } from "$lib/schema";

export const load: PageLoad = async () => {
	const form = await superValidate(schemaRsvp);
	const response = await pb.collection("wedding_v3").getFirstListItem('project="default"');
	return {
		response,
		form,
	};
};
