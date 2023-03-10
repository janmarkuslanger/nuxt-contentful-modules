import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  addPlugin: boolean;
  space: string;
  accessToken: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-contentful-module',
    configKey: 'nuxtContentfulModule'
  },
  defaults: {
    addPlugin: true,
    space: '',
    accessToken: '',
  },
  setup (options, nuxt) {
    if (options.addPlugin) {
      const { resolve } = createResolver(import.meta.url)
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
      nuxt.options.build.transpile.push(runtimeDir)
      addPlugin(resolve(runtimeDir, 'plugin'))
    }
  }
})
