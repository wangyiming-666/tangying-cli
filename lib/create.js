import * as path from 'path'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import Generator from './generator.js'

let createLib = async function (name, options) {
  // 验证是否正常取到值
  console.log('>>> create.js', name, options)
  //获取当前执行目录
  const cwd = process.cwd()
  //需要创建的目录
  const targetAir = path.join(cwd, name)

  //目录是否已经存在
  if (fs.existsSync(targetAir)) {
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      //询问是否要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite',
            },
            {
              name: 'Cancel',
              value: false,
            },
          ],
        },
      ])

      if (!action) {
        return
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetAir)
      }
    }
  }

  //创建项目
  const generator = new Generator(name, targetAir)

  generator.create()
}

export default createLib
