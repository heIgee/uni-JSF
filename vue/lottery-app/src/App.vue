<script setup lang="ts">
import { ref } from 'vue';
import RegisterForm from './components/RegisterForm.vue';
import WinnersBlock from './components/WinnersBlock.vue';
import type { User } from './models/user.model';
import type { CreateUserDto } from './models/create-user-dto.model';
import ParticipantList from './components/ParticipantList.vue';

const newUser = ref<User>();
function register(data: CreateUserDto) {
  newUser.value = {
    id: crypto.randomUUID(),
    ...data,
  };
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
          <WinnersBlock class="mb-8" />
          <RegisterForm @submit="register" />
        </div>
        <div>
          <ParticipantList />
          <div class="bg-gray-800 mt-4 p-4 rounded">
            <h2 class="mb-2 font-semibold text-xl">Debug Info</h2>
            <p class="text-gray-300">New User: {{ newUser }}</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
