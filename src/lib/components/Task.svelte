<script>
  import { onDestroy } from "svelte";
  import { columns } from "$lib/stores/todo";

  export let task
  export let isEditing = false

  let editingTask = Object.assign({}, task)

  function updateTask(){
    task = editingTask
    columns.update(columns => columns.map(col => {
      col.cards = col.cards.map(t => {
        if(t.id === task.id){
          return task
        }
        return t
      })
      return col
    }))
    isEditing = false
  }

  onDestroy(() => {
    isEditing = false
  })
</script>

<div class="flex flex-col mt-6 gap-1">
  {#if isEditing}
    <input type="text" id="task-name" bind:value={editingTask.title} class="p-2 outline-primary-700 rounded border-2 border-primary-500" />
    <textarea id="task-description" bind:value={editingTask.description} class="p-2 outline-primary-700 rounded border-2 border-primary-500"></textarea>
    <select id="priority" bind:value={editingTask.priority} class="p-2 outline-primary-700 rounded border-2 border-primary-500">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <select name="effort" id="effort" bind:value={editingTask.effort} class="p-2 outline-primary-700 rounded border-2 border-primary-500">
      <option value="easy">Easy</option>
      <option value="moderate">Moderate</option>
      <option value="hard">Hard</option>
    </select>
    {#if editingTask.dueDate}
      <input type="date" id="dueDate" bind:value={editingTask.dueDate} class="p-2 outline-primary-700 rounded border-2 border-primary-500" />
    {/if}
    <input type="text" id="project" bind:value={editingTask.project} class="p-2 outline-primary-700 rounded border-2 border-primary-500" />
    <div class="flex gap-2">
      <label for="realized">Realizado</label>
      <input type="checkbox" id="realized" bind:checked={editingTask.realized} class="p-2 outline-primary-700 rounded border-2 border-primary-500" />
    </div>
    <button on:click={updateTask} class="font-bold disabled:bg-gray-200 disabled:text-gray-400 text-secondary-500 rounded-lg w-full p-2 bg-primary-500 mt-2 transition-all hover:bg-primary-600">Salvar Alterações</button>
  {:else}
    <p>Title: <strong>{task.title}</strong></p>
    <p>Description: <strong>{task.description}</strong></p>
    <p>Priority: <strong>{task.priority}</strong></p>
    <p>Effort: <strong>{task.effort}</strong></p>
    {#if task.dueDate}
      <p>Due Date: <strong>{task.dueDate}</strong></p>
    {/if}
    <p>Project: <strong>{task.project}</strong></p>
    <p>Realized: <strong>{task.realized ? 'Realized' : 'On Going'}</strong></p>
  {/if}
</div>