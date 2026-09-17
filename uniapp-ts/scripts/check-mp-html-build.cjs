const fs = require('node:fs')
const path = require('node:path')

const buildRoot = path.resolve(__dirname, '../dist/build/mp-weixin')
const componentRoot = path.join(
  buildRoot,
  'node-modules/@dinghu/mp-html/dist/uni-app/components/mp-html',
)
const richTextRoot = path.join(buildRoot, 'components/ui')

/**
 * @description 校验微信构建最终消费了带 Tiptap 插件的 mp-html 产物。
 * @constraint 仅检查稳定的能力标记，不依赖 uni-app 压缩后的变量名和格式。
 * @usage 由 MP 的 postbuild 自动调用；缺少样式或点击链路时中止构建。
 */
function assertContains(filePath, expected) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing Weixin build artifact: ${filePath}`)
  }

  const content = fs.readFileSync(filePath, 'utf8')
  if (!content.includes(expected)) {
    throw new Error(`Incomplete mp-html build: ${filePath} does not contain ${expected}`)
  }
}

assertContains(path.join(componentRoot, 'mp-html-vendor.js'), 'tiptap')
assertContains(path.join(componentRoot, 'mp-html-vendor.js'), 'linktap')
assertContains(path.join(componentRoot, 'node/node-vendor.js'), 'linkTap')
assertContains(path.join(componentRoot, 'node/node-vendor.js'), 'linktap')
assertContains(path.join(componentRoot, 'node/node.wxml'), 'catchtap')
assertContains(path.join(richTextRoot, 'RichText.wxml'), 'bindlinktap')
assertContains(path.join(buildRoot, 'common/vendor.js'), 'margin-bottom:0.5em')
assertContains(path.join(buildRoot, 'common/vendor.js'), 'padding-left:3em')
assertContains(path.join(buildRoot, 'common/vendor.js'), 'color:#f37a0e;font-weight:bold')
assertContains(path.join(buildRoot, 'common/vendor.js'), 'data-annotation-id')
