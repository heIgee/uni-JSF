<script setup lang="ts">
import type { User } from '@/types/user';

const props = defineProps<{
  user: User;
}>();
const { firstName, lastName, gender, age, hobbies } = props.user;
</script>

<template>
  <li :class="{ underage: age < 18 }">
    <span>{{ firstName }} {{ lastName }}</span> is a {{ gender }} {{ ' ' }}
    <span v-if="age >= 18">of age {{ age }}</span>
    <span v-else>under 18</span>
    <p>
      Hobbies:
      <span v-for="hobby in hobbies" :key="hobby">{{ hobby }}{{ ' ' }}</span>
    </p>
  </li>
</template>

<style scoped>
li {
  list-style-type: none;
  background-color: #f9f9f9;
  color: var(--color-background);
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  transition: box-shadow 0.3s ease;
}

li.underage {
  background-color: #e8e15a;
  border: 1px solid #fff200;
}

li:hover {
  box-shadow: 0 4px 8px rgba(127, 127, 127, 0.85);
}

p {
  margin-top: 0.5rem;
  color: #555;
}

span {
  font-weight: bold;
}

@media (min-width: 1024px) {
  li {
    padding: 1.5rem;
  }

  p {
    margin-top: 0;
  }
}
</style>
