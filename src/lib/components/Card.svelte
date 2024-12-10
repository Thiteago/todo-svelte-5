<script>
  import { onMount } from "svelte";
  import { draggedCard, draggedSourceColumnId, columns } from "$lib/stores/todo";
  import Modal from "$lib/components/Modal.svelte";
  import Task from "$lib/components/Task.svelte";

  export let card
  export let column

  let isOpeningDetails = false
  let isEditingMode = false
  let dueWeekDay
  let colors = {
    low: 'secondary-400',
    medium: 'warning',
    high: 'danger'
  }

  let effortCount = {
    easy: 1,
    moderate: 2,
    hard: 3
  }

  onMount(() => {
    if(card.dueDate){
      const date = new Date(card.dueDate)
      dueWeekDay = date.toLocaleDateString('en-US', { weekday: 'short' })
    }
  })

  function handleDragStart() {
    $draggedCard = card;
    $draggedSourceColumnId = column.id;
  }

  function openCardDetails(){
    isOpeningDetails = true
  }

  function toggleEditTask(){
    isEditingMode = !isEditingMode
  }

  function toggleRealized(){
    columns.update(columns => columns.map(col => {
      if(col.id === column.id){
        col.cards = col.cards.map(c => {
          if(c.id === card.id){
            c.realized = !c.realized
          }
          return c
        })
      }
      return col
    }))
  }

  function removeCard(){
    columns.update(columns => columns.map(col => {
      if(col.id === column.id){
        col.cards = col.cards.filter(c => c.id !== card.id)
      }
      return col
    }))
  }
</script>

<div draggable="true" on:dragstart={() => handleDragStart(card, column.id)} role="button" tabindex="-1" on:keydown={openCardDetails} on:click={openCardDetails} class="group/card bg-neutral-500 rounded p-3">
  <div class="flex gap-1 items-center">
    <h1 class="text-black font-bold">{card.title}</h1>
    {#if card.realized}
      <i class="fa-solid text-green-500 fa-circle-check"></i>
    {/if}
  </div>
  <div class="flex w-full mt-2 justify-between">
    <div class="flex gap-1 items-center">
      {#if card.dueDate}
        <span class="bg-{colors[card.priority]} text-neutral-500 text-sm p-1 rounded-lg">{dueWeekDay}</span>
      {/if}
      <div class="flex gap-2 items-center">
        {#each Array(effortCount[card.effort]) as _, index}
          <div class="bg-{colors[card.priority]} rounded-bl-xl rounded-r w-6 h-3"></div>
        {/each}
        {#each Array(3 - effortCount[card.effort]) as _, index}
          <div class="bg-neutral-600 rounded-bl-xl rounded-r w-6 h-3"></div>
        {/each}
      </div>
    </div>
    <p>{card.project}</p>
  </div>
</div>


{#if isOpeningDetails}
  <Modal title="Task #{card.id}" on:edit={toggleEditTask} on:remove={removeCard} on:realized={toggleRealized} isEditingMode={true} bind:open={isOpeningDetails}>
    <Task bind:isEditing={isEditingMode} bind:task={card}/>
  </Modal>
{/if}