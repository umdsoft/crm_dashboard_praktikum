<script setup>
import draggable from "vuedraggable";
import { Icon } from '@iconify/vue';
import { useKanbanStore } from "@/store/lead";
import router from "../router";
import dateformat from "dateformat";
import { api } from '@/api'

function dateFormat(date) {
  let date1 = dateformat(date, "dd.mm.yyyy");
  return date1;
}

const kanban = useKanbanStore();

const props = defineProps({
  column: {
    type: Object,
    default: () => ({}),
  },
});

const deleteTask = (taskId) => {
  console.log(taskId);
  // kanban.deleteTask(taskId);
};

const openLead = (id) => {
  router.push(`/lead-details/${id}`)
}

const log = (e, action) => {
  if (e.added) {
    editLeadAction(e.added.element.id, action)
  }

}
const editLeadAction = async (id, action) => {
  try {
    await api.put(`/lead/edit-kanban/${id}`, { action: action })
    // emit('create')
  } catch (e) {
    console.log(e)
  }
}
const finish = (e, action) => {
  // old.value = action;
  // console.log('old', action);
  // console.log('new_action', state.new_action);
}

</script>
<template>
  <div>
    <!-- <pre>{{ props.column }}</pre> -->

    <draggable class="dragArea list-group" @end="finish($event, props.column.action)"
      @change="log($event, props.column.action)" :list="props.column.tasks" :animation="200" ghost-class="ghost-card"
      :group="{ name: 'kanban' }" item-key="id">

      <template #item="{ element }">
        <div @click="openLead(element.uid)" :style="`border-color: ${props.column.color}`"
          class="bg-white border-l-8  shadow group rounded px-3 pt-3 pb-5 mb-5  cursor-pointer">
          <div class="flex justify-between items-start">
            <h2 class="basis-4/5">
              {{ element.name }}
            </h2>

            <div class="flex gap-x-1 items-center">
              <button @click.stop="deleteTask(element.id)">
                <Icon icon="gg:trash" class=" h-5 w-5 text-red-500 cursor-pointer" width="26" height="26" />
              </button>
            </div>
          </div>
          <h2 class="basis-4/5">
            {{ element.phone }}
          </h2>
          <div class="flex mt-4 justify-between items-center">
            <Icon icon="mdi:clock-outline" width="20" height="20" /> <span class="text-sm">
              {{ dateFormat(element.created) }} | {{
                element.time.slice(0, 5) }}
            </span>
            <span class="bg-primary text-white py-1 px-2 rounded-md text-sm">{{
              element.direction
            }}</span>
          </div>

        </div>
      </template>
    </draggable>
  </div>
</template>