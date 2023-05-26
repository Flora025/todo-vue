import { ref, computed, type Ref } from "vue"
import { defineStore } from "pinia"
import { nanoid } from "nanoid"


type Todo = { id: string; text: string; isCompleted: boolean }

// fix indent and semi
export const useTodoStore = defineStore("counter", () => {
    const itemList: Ref<Todo[]> = ref([])
    const completedList: Ref<Todo[]> = computed(() => {
      return itemList.value.filter((item: Todo) => item.isCompleted === true)
    })
    const notCompletedList: Ref<Todo[]> = computed(() => {
      return itemList.value.filter((item: Todo) => item.isCompleted !== true)
    })

    const lsKey = "_v_todos"

    /** support local storage */
    function initFromLocalStorage() {
      const lstodos = localStorage.getItem(lsKey)
    
      if (lstodos === null) {
        itemList.value = []
      } else {
        try {
          itemList.value = JSON.parse(lstodos)
        } catch (e) {
          itemList.value = []
        }
      }
    
    updateLocalStorage()
    }
    
    function updateLocalStorage() {
      localStorage.setItem(lsKey, JSON.stringify(itemList.value))
    }

    /** FIN: given a Todo object, add it to itemList */ 
    function addToList(itemTxt: string) {
      itemList.value = [
        ...itemList.value,
        {
          id: nanoid(),
          isCompleted: false,
          text: itemTxt,
        },
      ]
      updateLocalStorage();
    }

    function removeFromList(id: string) {
      itemList.value = itemList.value.filter((todo) => todo.id !== id)
      updateLocalStorage()
    }

    function toggleItem(id: string) {
      itemList.value.forEach(todo => {
        if (todo.id === id) todo.isCompleted = !todo.isCompleted
      });
      updateLocalStorage()
    }

    return {
      itemList,
      completedList,
      notCompletedList,
      initFromLocalStorage,
      updateLocalStorage,
      addToList,
      removeFromList,
      toggleItem,
    }
})