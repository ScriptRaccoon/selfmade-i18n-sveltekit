import { TodoSchema } from './todos';

describe('TodoSchema', () => {
	it('should validate a valid todo', () => {
		const valid_todo = {
			id: '1',
			text: 'Do something',
			done: false
		};
		expect(TodoSchema.safeParse(valid_todo).success).toBe(true);
	});

	it('should not validate an invalid todo (1)', () => {
		const invalid_todo = {
			id: '1',
			text: '',
			done: false
		};
		expect(TodoSchema.safeParse(invalid_todo).success).toBe(false);
	});

	it('should not validate an invalid todo (2)', () => {
		const invalid_todo = {
			id: '1',
			text: '-'
		};
		expect(TodoSchema.safeParse(invalid_todo).success).toBe(false);
	});
});
