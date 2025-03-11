import { z } from 'zod';

export const TodoSchema = z.object({
	id: z.string().nonempty(),
	text: z.string().nonempty(),
	done: z.boolean()
});

export const TodosSchema = z.array(TodoSchema);

export type TodoData = z.infer<typeof TodoSchema>;
