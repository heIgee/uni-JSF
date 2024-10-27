<script setup lang="ts">
import type { Participant } from '@/models/participant.model';

const { participants } = defineProps<{
  participants: Participant[];
}>();
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-6">
    <h2 class="font-bold text-2xl mb-4">Participants</h2>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-700">
            <th class="py-3 px-4 text-left font-semibold text-gray-400">#</th>
            <th class="py-3 px-4 text-left font-semibold text-gray-400">
              Name
            </th>
            <th class="py-3 px-4 text-left font-semibold text-gray-400">
              Date of Birth
            </th>
            <th class="py-3 px-4 text-left font-semibold text-gray-400">
              Email
            </th>
            <th class="py-3 px-4 text-left font-semibold text-gray-400">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="participant in participants"
            :key="participant.id"
            class="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
          >
            <td class="py-3 px-4 text-gray-400 font-mono">
              {{ participant.id.slice(0, 4) }}
            </td>
            <td class="py-3 px-4">{{ participant.name }}</td>
            <td class="py-3 px-4 text-gray-300">
              {{ new Date(participant.birthDate).toLocaleDateString() }}
            </td>
            <td class="py-3 px-4 text-gray-300">{{ participant.email }}</td>
            <td class="py-3 px-4 text-gray-300">
              {{ participant.phoneNumber }}
            </td>
          </tr>
          <tr v-if="participants.length === 0">
            <td colspan="5" class="text-center py-8 text-gray-400">
              No participants registered yet
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
