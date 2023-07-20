import type { ApiRes } from "@/apis";

type AnyAsyncFuntion<T = any> = (...args: any[]) => Promise<T>;

export function useList<
  T extends AnyAsyncFuntion<ApiRes<any[]>>,
  R extends ApiRes<any[]> = Awaited<ReturnType<T>>,
  D = R["data"]
>(api: T, pageSize = 20) {
  const params = ref<Parameters<T>[0]>();
  const data = ref<any[]>([]);

  const state = reactive<{
    page: number;
    get: boolean;
    loading: boolean;
  }>({
    page: 1,
    get: true,
    loading: false,
  });

  async function execute(newParams?: Parameters<T>[0]) {
    if (!state.get) return;

    // 请求参数
    const finalParams = params.value || newParams;

    let options = [finalParams, state.page, pageSize];

    // 没有参数时省略
    if (!finalParams) {
      options = [state.page, pageSize];
    }

    state.loading = true;
    const res = (await api(...options)) as R;
    state.loading = false;

    if (res && Number(res.code) === 200) {
      data.value = [...data.value, ...res.data];

      state.page += 1;

      if (res.data.length < pageSize) {
        state.get = false;
      }
    } else {
      state.get = false;
    }
  }

  function reset() {
    state.get = true;
    state.loading = false;
    state.page = 1;
    data.value = [];
  }

  return {
    params,
    data: data as Ref<D>,
    state,
    execute,
    reset,
  };
}
