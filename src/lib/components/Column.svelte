<script>
  import { columns, draggedCard, draggedSourceColumnId } from "$lib/stores/todo";
  import Modal from "$lib/components/Modal.svelte"
  import Card from "$lib/components/Card.svelte"
  import CreateTask from "./CreateTask.svelte";

  export let column

  let isEditingMode = false
  let isCreatingNewCard = false

  function editColumn(){
    isEditingMode = !isEditingMode
    if(isEditingMode){
      return
    }
    columns.update(columns => columns.map(col => {
      if(col.id === column.id){
        col.name = column.name
      }
      return col
    }))
  }

  function removeColumn(){
    columns.update(columns => columns.filter(col => col.id !== column.id))
  }

  function openCreateTaskModal(){
    isCreatingNewCard = true
  }

  function handleDrop() {
    if(!$draggedCard || $draggedSourceColumnId === column.id) return

    columns.update(columns => columns.map(col => {
      if(col.id === $draggedSourceColumnId){
        col.cards = col.cards.filter(card => card.id !== $draggedCard.id)
      }
      return col
    }))
    
    columns.update(columns => columns.map(col => {
      if(col.id === column.id){
        col.cards = [...col.cards, $draggedCard]
      }
      return col
    }))
  }

  function allowDrop(event) {
    event.preventDefault();
  }
</script>

<div role="banner" on:drop={() => handleDrop()} on:dragover={allowDrop} class="group min-w-72 md:w-96 md:min-w-96 h-full bg-primary-500 rounded p-3 m-3">
  {#if isEditingMode}
    <div class="flex gap-4 justify-between items-center w-full">
      <input type="text" class="w-full p-1 min-h-1 rounded" bind:value={column.name} />
      <div class="flex gap-2">
        <button on:click={removeColumn} aria-label="button to remove a column" class="cursor-pointer">
          <i class="fa-solid fa-trash text-secondary-900 text-lg"></i>
        </button>
        <button on:click={editColumn} aria-label="button to edit column information" class="cursor-pointer">
          <i class="fa-solid text-secondary-900 text-lg fa-check"></i>
        </button>
      </div>
    </div>
    {:else}
      <div class="flex gap-4 justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <h1 class="text-secondary-900 p-1 min-h-1 font-bold">{column.name}</h1>
          <button on:click={editColumn} aria-label="button to edit column information" class="hidden cursor-pointer group-hover:flex">
            <i class="fa-solid text-secondary-900 text-sm fa-pencil"></i>
          </button>
        </div>
        <button aria-label="button to create a new card" on:click={openCreateTaskModal}>
          <i class="fa-solid text-secondary-900 fa-plus"></i>
        </button>
      </div>
    {/if}
    
  <div class="flex flex-col max-custom-height px-2 overflow-y-auto gap-2 mt-2">
    {#key column}
      {#each column.cards as card}
        <Card {card} {column} />
      {/each}
    {/key}
  </div>
</div>

{#if isCreatingNewCard}
  <Modal title="Creating new card" bind:open={isCreatingNewCard}>
    <CreateTask on:create={() => isCreatingNewCard = false} bind:column={column}/>
  </Modal>
{/if}

<style>
  .max-custom-height{
    max-height: calc(100vh - 180px);
  }
</style>