export function updateApp() {
  const updateManager = uni.getUpdateManager()

  updateManager.onCheckForUpdate((res) => {
    console.log('onCheckForUpdate', res.hasUpdate)
  })

  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: (res) => {
        if (res.confirm) {
          updateManager.applyUpdate()
        }
      },
    })
  })
}
