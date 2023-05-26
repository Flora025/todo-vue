<script setup lang="ts">
import { Ref, ref, watch } from "vue";
import { useTodoStore } from "../stores/todo";

// FIN: 完成静态组件 + 调整样式
//    一个title + 清除完成项 + listItem + add todo
// TODO: 响应式: addItem -> checked -> progress -> clear ->
let curItem: Ref<string> = ref("");

// initialize todo items storage
const todoStore = useTodoStore();
todoStore.initFromLocalStorage();

/** submit后将事件加入列表 */
function addItem() {
  const itemTxt = curItem.value;
  curItem.value = ""; // clear input box

  if (itemTxt.trim() !== "") {
    todoStore.addToList(itemTxt);
  }
  console.log("@@@ ", itemTxt, " is added");
}

function handleClick() {
  console.log("clicked!");
  todoStore.itemList = todoStore.notCompletedList;
}
</script>

<template>
  <div>
    <h1>Todos</h1>
    <!-- FIN: 增加click事件 -->
    <button class="clear" @click="handleClick">Clear completed todos</button>

    <div class="prog">
      <progress
        :max="todoStore.itemList.length"
        :value="todoStore.completedList.length"
      ></progress>
      <p>
        <b>{{ todoStore.completedList.length }}</b> out of
        <b>{{ todoStore.itemList.length }}</b> completed
      </p>
    </div>

    <!-- FIN: 遍历生成items -->
    <ul class="todos">
      <li class="todo" v-for="item in todoStore.itemList" :key="item.id">
        <!-- FIN: 根据checked状态切换样式 -->
        <input
          type="checkbox"
          name="isCompleted"
          :checked="item.isCompleted"
          @change="todoStore.toggleItem(item.id)"
        />
        <!-- FIN: 对应上面的input + 变量名 -->
        <label
          :for="item.id"
          :class="item.isCompleted ? 'completed' : 'incomplete'"
          >{{ item.text }}</label
        >
      </li>
    </ul>

    <!-- FIN: -->
    <form class="addForm" @submit.prevent="addItem">
      <div class="sl">
        <!-- FIN: 绑变量 -->
        <input
          type="text"
          name="add"
          id="add"
          v-model="curItem"
          placeholder="Add a Todo Item"
          autocomplete="off"
        />
        <button type="submit">Add</button>
      </div>
    </form>
  </div>
</template>

<style>
progress {
  width: 100%;
}

.prog {
  margin-bottom: 1.5rem;
}
.prog > p {
  text-align: end;
  margin-top: 0rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  font-size: 1.5rem;
}

input[type="checkbox"] {
  display: inline-block;
  padding: 1rem;
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
}

.clear {
  margin-bottom: 1.5rem;
  border: 1px solid hsl(244, 7%, 54%);
  color: hsl(247, 34%, 85%);
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 12px;
  cursor: pointer;
}

label.completed {
  color: hsl(245, 20%, 76%);
  text-decoration: line-through;
}

.addForm {
  margin-top: 1rem;
  border-top: 1px solid #242424;
  padding: 1rem 0;
}

.addForm > label {
  display: block;
  color: #ccc5d8;
}

.sl {
  display: flex;
  margin-top: 0.25rem;
}
.sl > input {
  border: 1px solid #3f3f3f;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-right: 0.25rem;
  width: 100%;
}

.sl > button {
  border-color: #42d392;
  background-color: #42d392;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  color: #1a1a1a;
}
</style>
