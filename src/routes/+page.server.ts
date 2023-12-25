
import type { Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { fail } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';
import { schemaRsvp } from '$lib/schema';

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schemaRsvp);

		// Convenient validation check:
		if (!form.valid) {
			return fail(400, { form });
		}

		const data = {
			first_name: form.data.firstName,
			last_name: form.data.lastName,
			phone_number: form.data.phoneNumber,
			email: form.data.email,
			is_attending: form.data.isAttend
		};
		await pb.collection('rsvp_wedding_v3').create(data);

		return { form };
	}
} satisfies Actions;
