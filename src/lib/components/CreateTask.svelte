<script>
  import { createEventDispatcher } from "svelte";
  import { columns } from "$lib/stores/todo";

  const dispatch = createEventDispatcher()
  let { column = $bindable() } = $props();

  let notValidTask = $state(true)

  $effect(() => {
    notValidTask = !task.title || !task.project
  })

  let task = $state({
    name: '',
    priority: 'low',
    effort: 'easy',
    finalized: false,
    dueDate: ''
  }) 

  let today = new Date().toISOString().split('T')[0]

  function createTask(){
    let lastTaskId
    if(column.cards.length > 0){
      lastTaskId = column.cards[column.cards.length - 1].id
    }
    task.id = lastTaskId + 1 || 1
    console.log(task)
    columns.update(columns => columns.map(col => {
      if(col.id === column.id){
        col.cards = [...col.cards, task]
      }
      return col
    }))

    task = {
      title: '',
      priority: 'low',
      effort: 'easy',
      finalized: false,
      dueDate: ''
    }
    
    dispatch('create')
  }
</script>

<div class="flex flex-col gap-3"> 
  <div class="flex flex-col gap-1">
    <label for="task-name" class="text-secondary-700">Task Name</label>
    <input type="text" id="task-name" bind:value={task.title} class="p-2 outline-primary-700 rounded border-2 border-primary-500" />
    <label class="text-secondary-700" for="priority">Priority</label>
    <select id="priority" bind:value={task.priority} class="p-2 outline-primary-700 rounded border-2 border-primary-500">
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>
    <label class="text-secondary-700" for="effort">Effort</label>
    <select name="effort" id="effort" bind:value={task.effort} class="p-2 outline-primary-700 rounded border-2 border-primary-500">
      <option value="easy">Easy</option>
      <option value="moderate">Moderate</option>
      <option value="hard">Hard</option>
    </select>
    <label class="text-secondary-700" for="dueDate">Due Date</label>
    <input type="date" id="dueDate" min={today} bind:value={task.dueDate} class="p-2 outline-primary-700 rounded border-2 border-primary-500" />
    <label for="project">Project</label>
    <input type="text" id="task-project" bind:value={task.project} class="p-2 outline-primary-700 rounded border-2 border-primary-500" />
    <div class="flex gap-2 items-center">
      <label for="realizado">Realizado</label>
      <input type="checkbox" id="realizado" bind:checked={task.finalized} class="p-2 outline-primary-700 rounded border-2 border-primary-500" />
    </div>
    <button disabled={notValidTask} onclick={createTask} class="font-bold disabled:bg-gray-200 disabled:text-gray-400 text-secondary-500 rounded-lg w-full p-2 bg-primary-500 mt-2 transition-all hover:bg-primary-600">Create Task</button>
  </div>
</div>