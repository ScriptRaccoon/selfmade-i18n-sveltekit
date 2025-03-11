<script lang="ts">
	type Props = {
		create: (text: string) => void;
	};

	let { create }: Props = $props();

	let text = $state('');
	let error = $state<null | 'empty'>(null);

	function handle_submit(e: SubmitEvent) {
		e.preventDefault();
		error = null;
		if (text === '') {
			error = 'empty';
			return;
		}
		create(text);
		text = '';
	}
</script>

<section>
	<h2>Create a new todo</h2>

	<form onsubmit={handle_submit}>
		<label>
			<input
				type="text"
				class="input"
				class:invalid={error !== null}
				bind:value={text}
				aria-label={'New todo'}
				aria-describedby="todo_error"
			/>
		</label>

		<button class="button">Create</button>
	</form>

	{#if error === 'empty'}
		<div class="error" id="todo_error">The todo cannot be empty.</div>
	{/if}
</section>

<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 0.75rem;
	}

	.input {
		width: 100%;
	}

	.input.invalid {
		outline-color: var(--error-color);
	}

	.error {
		color: var(--error-color);
		margin-top: 0.25rem;
	}
</style>
