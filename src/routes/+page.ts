import { pb } from "$lib/pocketbase";
import { superValidate } from "sveltekit-superforms/server";
import type { PageLoad } from "./$types";
import { schemaRsvp } from "$lib/schema";

export const load: PageLoad = async ({ url }) => {
	const form = await superValidate(schemaRsvp);
	const response = await pb.collection("wedding_v3").getFirstListItem('project="default"');
	const page = url.searchParams.get("n") || 1;

	const wishes = await pb.collection("wishes").getList(1, 5 * +page, {
		filter: 'project = "default" && template_id = "wedding_v3"',
		sort: "-created",
	});
	return {
		response,
		form,
		wishes,
	};
};
