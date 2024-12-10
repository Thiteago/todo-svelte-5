<script>
  import Column from "$lib/components/Column.svelte";
  import { columns } from "$lib/stores/todo";

  let cardContainer

  function addNewColumn(){
    if($columns.length === 0){
      $columns = [{
        id: 1,
        name: 'New Column',
        cards: []
      }]
      return
    }
    
    let lastColumn = $columns[$columns.length - 1]
    $columns = [...$columns, {
      id: lastColumn.id + 1,
      name: 'New Column',
      cards: []
    }]

    setTimeout(() => {
      cardContainer.scrollTo({
        left: cardContainer.scrollWidth,
        behavior: 'smooth'
      })
    }, 100)
  }

</script>

<section class="h-lvh w-screen md:p-12 flex items-start overflow-y-hidden bg-secondary-900">
  <div bind:this={cardContainer} class="w-full min-h-full h-full flex items-start gap-2 overflow-x-auto overflow-y-hidden max-w-full custom-scrollbar">
    {#if $columns.length > 0}
      {#key $columns}
        {#each $columns as column}
          <Column {column} />
        {/each}
      {/key}
    {/if}
    <div class="md:w-96 md:min-w-96 flex p-3 justify-center">
      <button on:click={addNewColumn} class="bg-primary-700 border-dashed border-2 border-secondary-950 w-full whitespace-nowrap rounded hover:scale-105 transition-all hover:bg-primary-600 p-3 font-bold text-secondary-900">Create new column</button>
    </div>
  </div>
</section>

<style>
  .custom-scrollbar::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }

  .custom-scrollbar::-webkit-scrollbar
  {
    width: 12px;
    height: 10px;
    border-radius: 1rem;
    background-color: #F5F5F5;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
}
</style>