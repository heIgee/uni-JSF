<script setup lang="ts">
import { ref } from 'vue';
import RegisterForm from './components/RegisterForm.vue';
import WinnersBlock from './components/WinnersBlock.vue';
import type { Participant } from './models/participant.model';
import type { CreateParticipantDto } from './models/create-participant.dto.ts';
import ParticipantList from './components/ParticipantList.vue';

const maxWinners = 3;

const participants = ref<Participant[]>([]);
function register(data: CreateParticipantDto) {
  participants.value.push({
    id: crypto.randomUUID(),
    ...data,
  });
}
</script>

<template>
  <div
    class="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white"
  >
    <div class="mx-auto px-4 py-8 container">
      <header class="mb-8">
        <h1 class="font-bold text-4xl">Lottery</h1>
      </header>

      <main class="gap-8 grid grid-cols-1 md:grid-cols-2">
        <div>
          <RegisterForm @submit="register" />
        </div>
        <div>
          <WinnersBlock
            :participants="participants"
            :max-winners="maxWinners"
            class="mb-8"
          />
          <ParticipantList :participants="participants" />
        </div>
      </main>
    </div>
  </div>
</template>
