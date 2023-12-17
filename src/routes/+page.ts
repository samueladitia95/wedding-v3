import { pb } from "$lib/pocketbase";
import type { PageLoad } from "./$types";

export const prerender = true;
export const load: PageLoad = async () => {
	const response = await pb.collection("wedding_v3").getFirstListItem('project="default"');
	return {
		response,
	};
};
