<template>
  <div class="step-progress">
    <template v-for="(step, index) in steps" :key="index">
      <div :class="['step', { active: currentStep === index + 1, completed: currentStep > index + 1 }]">
        <div class="step-circle">
          <i v-if="currentStep > index + 1" class="fas fa-check"></i>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span class="step-label">{{ step }}</span>
      </div>
      <div v-if="index < steps.length - 1"
        :class="['step-line', { done: currentStep > index + 1 }]" />
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../store/index.js'
import { translations } from '../translations/index.js'

const route = useRoute()
const currentLang = ref(store.currentLang)
const t = computed(() => translations[currentLang.value])

const currentStep = computed(() => {
  const path = route.path
  if (path === '/' || path === '') return 1
  if (path === '/express') return 1
  if (path === '/destination') return 2
  if (path === '/summary') return 3
  if (path === '/payment') return 4
  return 1
})

const steps = computed(() => [
  t.value.step1,
  t.value.step2,
  t.value.step3,
  t.value.step4
])

watch(() => route.path, () => {})
</script>

<style scoped>
.step-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px;
  background: #FFF;
  border-bottom: 1px solid #E8E8E8;
  max-width: 960px;
  margin: 0 auto;
}

html.dark .step-progress {
  background: var(--bg);
  border-bottom-color: var(--border);
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  min-width: 0;
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f0f0f0;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

html.dark .step-circle {
  background: var(--surface);
  color: var(--text-muted);
}

.step.active .step-circle {
  background: #22c55e;
  color: #fff;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

.step.completed .step-circle {
  background: #22c55e;
  color: #fff;
}

html.dark .step.active .step-circle,
html.dark .step.completed .step-circle {
  background: var(--green);
  color: #fff;
}

.step-circle i { font-size: 11px; }

.step-label {
  font-size: 10px;
  color: #9e9e9e;
  font-weight: 500;
  text-align: center;
  max-width: 60px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

html.dark .step-label { color: var(--text-muted); }

.step.active .step-label {
  color: #22c55e;
  font-weight: 700;
}

.step.completed .step-label {
  color: #22c55e;
}

html.dark .step.active .step-label,
html.dark .step.completed .step-label {
  color: var(--green);
}

.step-line {
  flex: 1;
  height: 2px;
  min-width: 12px;
  max-width: 48px;
  background: #e0e0e0;
  border-radius: 1px;
  margin: 0 4px;
  align-self: center;
  margin-bottom: 18px;
  transition: background 0.4s ease;
}

html.dark .step-line { background: rgba(255, 255, 255, 0.1); }

.step-line.done {
  background: #22c55e;
}

html.dark .step-line.done { background: var(--green); }

/* Tablet+ */
@media (min-width: 480px) {
  .step-progress { padding: 14px 16px; }
  .step-circle { width: 32px; height: 32px; font-size: 12px; }
  .step-circle i { font-size: 12px; }
  .step-label { font-size: 11px; max-width: 80px; }
  .step-line { min-width: 20px; max-width: 60px; margin: 0 6px; }
}

/* Desktop */
@media (min-width: 768px) {
  .step-progress { padding: 16px 24px; }
  .step-circle { width: 36px; height: 36px; font-size: 13px; }
  .step-circle i { font-size: 13px; }
  .step-label { font-size: 12px; max-width: 100px; white-space: normal; }
  .step-line { min-width: 32px; max-width: 80px; margin: 0 8px; margin-bottom: 22px; }
}
</style>
