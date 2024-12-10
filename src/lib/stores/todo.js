import { writable } from 'svelte/store';

export const columns = writable([])

export const draggedCard = writable(null)
export const draggedSourceColumnId = writable(null)