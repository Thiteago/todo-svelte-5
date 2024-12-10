<script>
  import { columns } from "$lib/stores/todo";
  import { onMount } from "svelte";

  onMount(() => {
    if(typeof window != undefined){
      let columnsFromLocalStorage = localStorage.getItem('columns')
      if(columnsFromLocalStorage){
        columns.set(JSON.parse(columnsFromLocalStorage))
      }
    }
    if(typeof window != undefined){
      columns.subscribe(value => {
        localStorage.setItem('columns', JSON.stringify(value))
      })
    }
  })
</script>

<slot />