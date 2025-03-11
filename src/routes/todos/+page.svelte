<script lang="ts">
	import { browser } from '$app/environment';

	import CreateTodo from '$lib/components/CreateTodo.svelte';
	import Todos from '$lib/components/Todos.svelte';
	import { TodosSchema, type TodoData } from '$lib/schemas/todos';
	import { t } from '$lib/i18n/translate';

	function get_todos(): TodoData[] {
		if (!browser) return [];
		try {
			const saved_todos = localStorage.getItem('todos');
			if (!saved_todos) return [];
			const parsed_todos: unknown = JSON.parse(saved_todos);
			return TodosSchema.parse(parsed_todos);
		} catch (err) {
			console.error(err);
			return [];
		}
	}

	let todos = $state<TodoData[]>(get_todos());

	function create_todo(text: string) {
		const new_todo = {
			id: crypto.randomUUID(),
			text: text,
			done: false
		};
		todos.push(new_todo);
	}

	function delete_todo(id: string) {
		todos = todos.filter((todo) => todo.id !== id);
	}

	$effect(() => {
		if (!browser) return;
		localStorage.setItem('todos', JSON.stringify(todos));
	});
</script>

<h1>
	{t('Todos.Title')}
</h1>

<CreateTodo create={create_todo} />

<Todos {todos} {delete_todo} />
