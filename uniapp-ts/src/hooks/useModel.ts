export function useModel(vprops: any, vemit: any, key = "modelValue") {
  const model = ref<any>();

  model.value = vprops.modelValue;

  onMounted(() => {
    model.value = vprops.modelValue;
  });

  watch(
    () => vprops[key],
    (val) => {
      model.value = val;
    }
  );

  watch(model, (val) => {
    vemit(`update:${key}`, val);
  });

  return model;
}
