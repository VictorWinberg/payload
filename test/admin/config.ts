import { fileURLToPath } from 'node:url'
import path from 'path'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { CustomFields } from './collections/CustomFields/index.js'
import { CustomIdRow } from './collections/CustomIdRow.js'
import { CustomIdTab } from './collections/CustomIdTab.js'
import { CustomViews1 } from './collections/CustomViews1.js'
import { CustomViews2 } from './collections/CustomViews2.js'
import { DisableDuplicate } from './collections/DisableDuplicate.js'
import { Geo } from './collections/Geo.js'
import { CollectionGroup1A } from './collections/Group1A.js'
import { CollectionGroup1B } from './collections/Group1B.js'
import { CollectionGroup2A } from './collections/Group2A.js'
import { CollectionGroup2B } from './collections/Group2B.js'
import { CollectionHidden } from './collections/Hidden.js'
import { CollectionNoApiView } from './collections/NoApiView.js'
import { Posts } from './collections/Posts.js'
import { UploadCollection } from './collections/Upload.js'
import { Users } from './collections/Users.js'
import { AdminButton } from './components/AdminButton/index.js'
import { AfterDashboard } from './components/AfterDashboard/index.js'
import { AfterNavLinks } from './components/AfterNavLinks/index.js'
import { BeforeLogin } from './components/BeforeLogin/index.js'
import { CustomHeader } from './components/CustomHeader/index.js'
import { CustomProvider } from './components/CustomProvider/index.js'
import { Logout } from './components/Logout/index.js'
import { CustomDefaultView } from './components/views/CustomDefault/index.js'
import { CustomMinimalView } from './components/views/CustomMinimal/index.js'
import { CustomView } from './components/views/CustomView/index.js'
import { CustomNestedView } from './components/views/CustomViewNested/index.js'
import { CustomViewWithParam } from './components/views/CustomViewWithParam/index.js'
import { default as customFaviconDark } from './custom-favicon-dark.png'
import { default as customFaviconLight } from './custom-favicon-light.png'
import { CustomGlobalViews1 } from './globals/CustomViews1.js'
import { CustomGlobalViews2 } from './globals/CustomViews2.js'
import { Global } from './globals/Global.js'
import { GlobalGroup1A } from './globals/Group1A.js'
import { GlobalGroup1B } from './globals/Group1B.js'
import { GlobalHidden } from './globals/Hidden.js'
import { GlobalNoApiView } from './globals/NoApiView.js'
import { seed } from './seed.js'
import {
  customAdminRoutes,
  customNestedViewPath,
  customParamViewPath,
  customRootViewMetaTitle,
  customViewPath,
} from './shared.js'
export default buildConfigWithDefaults({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ['/components/AdminButton/index.js#AdminButton'],
      afterDashboard: [
        '/components/AfterDashboard/index.js#AfterDashboard',
        '/components/AfterDashboardClient/index.js#AfterDashboardClient',
      ],
      afterNavLinks: ['/components/AfterNavLinks/index.js#AfterNavLinks'],
      beforeLogin: ['/components/BeforeLogin/index.js#BeforeLogin'],
      header: ['/components/CustomHeader/index.js#CustomHeader'],
      logout: {
        Button: '/components/Logout/index.js#Logout',
      },
      providers: [
        '/components/CustomProvider/index.js#CustomProvider',
        '/components/CustomProvider/index.js#CustomProvider',
      ],
      views: {
        // Dashboard: CustomDashboardView,
        // Account: CustomAccountView,
        CustomDefaultView: {
          Component: '/components/views/CustomDefault/index.js#CustomDefaultView',
          path: '/custom-default-view',
        },
        CustomMinimalView: {
          Component: '/components/views/CustomMinimal/index.js#CustomMinimalView',
          path: '/custom-minimal-view',
          meta: {
            title: customRootViewMetaTitle,
          },
        },
        CustomNestedView: {
          Component: '/components/views/CustomViewNested/index.js#CustomNestedView',
          exact: true,
          path: customNestedViewPath,
        },
        CustomView: {
          Component: '/components/views/CustomView/index.js#CustomView',
          exact: true,
          path: customViewPath,
          strict: true,
        },
        CustomViewWithParam: {
          Component: '/components/views/CustomViewWithParam/index.js#CustomViewWithParam',
          path: customParamViewPath,
        },
      },
    },
    meta: {
      description: 'This is a custom meta description',
      icons: [
        {
          type: 'image/png',
          rel: 'icon',
          url: '/custom-favicon-dark.png',
        },
        {
          type: 'image/png',
          media: '(prefers-color-scheme: dark)',
          rel: 'icon',
          url: '/custom-favicon-light.png',
        },
      ],
      openGraph: {
        description: 'This is a custom OG description',
        title: 'This is a custom OG title',
      },
      titleSuffix: '- Custom Title Suffix',
    },
    routes: customAdminRoutes,
    dependencies: {
      myTestComponent: {
        path: '/components/TestComponent.js#TestComponent',
        type: 'component',
        clientProps: {
          test: 'hello',
        },
      },
    },
  },
  collections: [
    UploadCollection,
    Posts,
    Users,
    CollectionHidden,
    CollectionNoApiView,
    CustomViews1,
    CustomViews2,
    CustomFields,
    CollectionGroup1A,
    CollectionGroup1B,
    CollectionGroup2A,
    CollectionGroup2B,
    Geo,
    CustomIdTab,
    CustomIdRow,
    DisableDuplicate,
  ],
  globals: [
    GlobalHidden,
    GlobalNoApiView,
    Global,
    CustomGlobalViews1,
    CustomGlobalViews2,
    GlobalGroup1A,
    GlobalGroup1B,
  ],
  i18n: {
    translations: {
      en: {
        general: {
          dashboard: 'Home',
        },
      },
    },
  },
  localization: {
    defaultLocale: 'en',
    locales: [
      {
        code: 'es',
        label: {
          en: 'Spanish',
          es: 'Español',
        },
      },
      {
        code: 'en',
        label: {
          en: 'English',
          es: 'Inglés',
        },
      },
    ],
  },
  onInit: async (payload) => {
    if (process.env.SEED_IN_CONFIG_ONINIT !== 'false') {
      await seed(payload)
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
