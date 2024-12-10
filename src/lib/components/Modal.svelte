<script>
  import { clickOutside } from '$lib/utils/helpers'
  import { createEventDispatcher } from 'svelte';

  export let title = 'Modal Title'
  export let open = false
  export let isEditingMode = false

  const dispatch = createEventDispatcher()

  function clickOnEdit(){
    dispatch('edit')
  }

  function clickOnRemove(){
    dispatch('remove')
  }

  function clickOnRealized(){
    dispatch('realized')
  }
</script>

<section class="bg-black/50 w-screen h-lvh flex items-center flex-col justify-center fixed top-0 left-0">
  <div use:clickOutside on:click_outside={() => open = false} class="bg-white m-auto rounded-lg min-h-5 p-3 w-full lg:w-1/2">
    <div class="group/item flex justify-between w-full items-center">
      <div class="flex gap-2 items-center">
        <h1 class="text-xl text-secondary-700 font-bold">{title}</h1>
        {#if isEditingMode}
          <button on:click={clickOnEdit} aria-label="button to edit {title} information" class="hidden cursor-pointer group-hover/item:flex">
            <i class="fa-solid text-secondary-900 text-sm fa-pencil"></i>
          </button>
          <button on:click={clickOnRemove} aria-label="button to remove a column" class="cursor-pointer hidden group-hover/item:flex">
            <i class="fa-solid fa-trash text-secondary-900"></i>
          </button>
          <button on:click={clickOnRealized} aria-label="button to remove a column" class="cursor-pointer hidden group-hover/item:flex">
            <i class="fa-regular text-secondary-900 fa-circle-check"></i>
          </button>
        {/if}
      </div>
      <button on:click={() => {open = false}} aria-label="button to close modal" class="hover:bg-primary-500 p-2 px-3 rounded-lg">
        <i class="fa-solid fa-x"></i>
      </button>
    </div>
    <slot />
  </div>
</section>