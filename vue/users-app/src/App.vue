<script setup lang="ts">
import { computed, ref } from 'vue';
import UserCard from './components/UserCard.vue';
import VFragment from './components/VFragment.vue';
import { defaultUsers } from './default-users';
import type { GenderFilter } from './types/gender-filter';

let genderFilter = ref<GenderFilter>('none');
const users = [...defaultUsers];

const filteredUsers = computed(() => {
  console.log(genderFilter);
  return genderFilter.value === 'none'
    ? users
    : users.filter((u) => u.gender === genderFilter.value);
});

function filterByGender(gender: Exclude<GenderFilter, 'none'>) {
  genderFilter.value = genderFilter.value === gender ? 'none' : gender;
}
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <main>
    <button
      :class="{ active: genderFilter === 'male' }"
      @click="() => filterByGender('male')"
    >
      Male
    </button>
    ||
    <button
      :class="{ active: genderFilter === 'female' }"
      @click="() => filterByGender('female')"
    >
      Female
    </button>

    <p v-if="users.length <= 0">There are no users</p>
    <ul v-else>
      <VFragment v-for="user in filteredUsers" :key="user.id">
        <UserCard :user="user" />
      </VFragment>
    </ul>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  text-align: center;
  padding-bottom: 1rem;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

button.active {
  background-color: #6c1dff;
}

button:hover {
  background-color: #0056b3;
}

main {
  height: 40rem;
  width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

ul {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 1rem;
  gap: 1rem;
  padding: 0;
  list-style: none;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  main {
    padding: 2rem;
  }
}
</style>
