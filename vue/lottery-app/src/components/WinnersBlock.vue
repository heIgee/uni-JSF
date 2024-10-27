<script setup lang="ts">
import type { Participant } from '@/models/participant.model';
import { ref, computed } from 'vue';

const { participants, maxWinners } = defineProps<{
  participants: Participant[];
  maxWinners: number;
}>();

const winners = ref<Participant[]>([]);
const remainingSlots = computed(() => maxWinners - winners.value.length);

const newWinnerButtonText = computed(() => {
  if (!participants.length) return 'Add some participants';
  if (winners.value.length >= maxWinners) return 'No more prizes';
  return `Roll the dice ${remainingSlots.value && `(${remainingSlots.value} left)`}`;
});

function rollTheDice() {
  if (!participants.length || winners.value.length >= maxWinners) return;

  const randomIdx = (Math.random() * participants.length) | 0;
  const luckyGuy = participants[randomIdx];
  winners.value.push({ ...luckyGuy });
}

function disqualify(idx: number) {
  if (idx < 0) return;
  winners.value.splice(idx, 1);
}
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-bold text-2xl">Winners</h2>
      <button
        @click="rollTheDice"
        :disabled="!participants.length || winners.length >= maxWinners"
        class="px-4 py-2 rounded-md transition-colors"
        :class="[
          !participants.length || winners.length >= maxWinners
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white',
        ]"
      >
        {{ newWinnerButtonText }}
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-if="!winners.length"
        class="text-center py-8 text-gray-400 border-2 border-dashed border-gray-700 rounded-lg"
      >
        No winners yet
      </div>

      <div v-else class="flex flex-wrap gap-2">
        <div
          v-for="(winner, idx) in winners"
          :key="winner.id"
          class="group flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-full"
        >
          <span class="text-sm font-medium">{{ winner.name }}</span>
          <button
            @click="() => disqualify(idx)"
            class="opacity-50 hover:opacity-100 transition-opacity"
            title="Remove winner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
