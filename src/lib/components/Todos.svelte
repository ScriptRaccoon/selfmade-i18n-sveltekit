<script lang="ts">
	import { t } from '$lib/i18n/translate';
	import type { TodoData } from '$lib/schemas/todos';
	import Todo from './Todo.svelte';

	type Props = {
		todos: TodoData[];
		delete_todo: (id: string) => void;
	};

	let { todos, delete_todo }: Props = $props();

	let show_done_todos = $state(true);

	let displayed_todos = $derived(show_done_todos ? todos : todos.filter((todo) => !todo.done));
</script>

<section>
	<h2>
		{t('Todos.List')}
	</h2>

	<p class="small">
		{t('Todos.Summary', { count: todos.length })}
	</p>

	<ul>
		{#each displayed_todos as todo (todo.id)}
			<li>
				<Todo {todo} delete_todo={() => delete_todo(todo.id)} />
			</li>
		{/each}
	</ul>

	<label>
		<input type="checkbox" bind:checked={show_done_todos} />
		<span class="small">
			{t('Todos.Show_Done')}
		</span>
	</label>
</section>

<style>
	ul {
		margin-top: 1rem;
		margin-bottom: 1.25rem;
		list-style-type: none;
		display: grid;
		gap: 0.5rem;
	}
</style>
