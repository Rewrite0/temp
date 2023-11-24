import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const count = ref(0);
    const increment = () => {
      count.value++;
    };

    return () => (
      <div>
        <div>
          count: <span>{count.value}</span>
        </div>
        <button onClick={increment}>Increment</button>
      </div>
    );
  },
});
