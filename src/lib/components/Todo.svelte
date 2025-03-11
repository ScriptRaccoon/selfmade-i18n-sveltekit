<script lang="ts">
	import { slide } from 'svelte/transition';

	import Fa from 'svelte-fa';
	import { faCheckCircle, faCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

	import type { TodoData } from '$lib/schemas/todos';

	type Props = {
		todo: TodoData;
		delete_todo: () => void;
	};

	let { todo, delete_todo }: Props = $props();
</script>

<div class="todo" class:done={todo.done} transition:slide={{ duration: 100 }}>
	<span class="text">
		{todo.text}
	</span>

	<label>
		<Fa icon={todo.done ? faCheckCircle : faCircle} />
		<input class="visually-hidden" type="checkbox" bind:checked={todo.done} aria-label={'Done?'} />
	</label>

	<button onclick={() => delete_todo()} aria-label={'Delete'}>
		<Fa icon={faTrashAlt} />
	</button>
</div>

<style>
	.todo {
		display: grid;
		grid-template-columns: 1fr auto auto;
		gap: 0.75rem;
		background-color: var(--secondary-bg-color);
		border: 1px solid var(--outline-color);
		padding: 0.4rem 0.6rem;
		border-radius: 0.25rem;
	}

	.todo .text {
		transition: opacity 120ms;
	}

	.todo.done .text {
		opacity: 0.2;
	}
</style>
