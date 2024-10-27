<script setup lang="ts">
import type { CreateParticipantDto } from '@/models/create-participant.dto';
import { ref, computed } from 'vue';

const data = ref<CreateParticipantDto>({
  name: '',
  birthDate: '',
  email: '',
  phoneNumber: '',
});

const emit = defineEmits<{
  submit: [data: CreateParticipantDto];
}>();

const errors = computed(() => ({
  name: !data.value.name.trim(),
  birthDate:
    !data.value.birthDate || new Date(data.value.birthDate) >= new Date(),
  email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.value.email),
  phoneNumber: !/^\+?[1-9]\d{1,14}$/.test(data.value.phoneNumber),
}));

const isDirty = ref(false);
const isValid = computed(() => !Object.values(errors.value).some(Boolean));

function submit() {
  isDirty.value = true;

  if (isValid.value) {
    emit('submit', data.value);
    (Object.keys(data.value) as (keyof CreateParticipantDto)[]).forEach(
      (prop) => {
        data.value[prop] = '';
      },
    );
    isDirty.value = false;
  }
}
</script>

<template>
  <section class="mx-auto mt-6 max-w-md">
    <h2 class="mb-4 font-bold text-2xl">Register form</h2>
    <p class="mb-4">Please fill in all the fields</p>
    <form @submit.prevent="submit" class="space-y-3">
      <div
        v-for="field in ['name', 'birthDate', 'email', 'phoneNumber'] as const"
        :key="field"
      >
        <label :for="field" class="block mb-1 font-medium">{{
          field.charAt(0).toUpperCase() + field.slice(1)
        }}</label>
        <input
          :id="field"
          :type="
            field === 'birthDate'
              ? 'date'
              : field === 'email'
                ? 'email'
                : 'text'
          "
          v-model="data[field]"
          :class="[
            'w-full py-2 px-3 text-gray-900 border-2 rounded-md',
            errors[field] && isDirty ? 'border-red-500' : 'border-gray-300',
          ]"
        />
        <p v-if="errors[field] && isDirty" class="mt-1 text-red-500 text-sm">
          {{
            field === 'birthDate'
              ? 'Must be a valid past date'
              : `Valid ${field} is required`
          }}
        </p>
      </div>
      <button
        type="submit"
        :class="[
          '!mt-6 px-4 py-2 rounded-md float-end',
          isValid || !isDirty
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed',
        ]"
      >
        Confirm
      </button>
    </form>
  </section>
</template>
