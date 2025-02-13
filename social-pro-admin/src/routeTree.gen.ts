/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicImport } from './routes/_public'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as PublicDataImport } from './routes/_public/data'
import { Route as PublicRegisterIndexImport } from './routes/_public/register/index'
import { Route as PublicLoginIndexImport } from './routes/_public/login/index'
import { Route as PublicForgotPassIndexImport } from './routes/_public/forgot-pass/index'
import { Route as PublicAboutIndexImport } from './routes/_public/about/index'
import { Route as AuthManageUserIndexImport } from './routes/_auth/manage-user/index'
import { Route as AuthDashboardIndexImport } from './routes/_auth/dashboard/index'

// Create/Update Routes

const PublicRoute = PublicImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PublicDataRoute = PublicDataImport.update({
  id: '/data',
  path: '/data',
  getParentRoute: () => PublicRoute,
} as any)

const PublicRegisterIndexRoute = PublicRegisterIndexImport.update({
  id: '/register/',
  path: '/register/',
  getParentRoute: () => PublicRoute,
} as any)

const PublicLoginIndexRoute = PublicLoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => PublicRoute,
} as any)

const PublicForgotPassIndexRoute = PublicForgotPassIndexImport.update({
  id: '/forgot-pass/',
  path: '/forgot-pass/',
  getParentRoute: () => PublicRoute,
} as any)

const PublicAboutIndexRoute = PublicAboutIndexImport.update({
  id: '/about/',
  path: '/about/',
  getParentRoute: () => PublicRoute,
} as any)

const AuthManageUserIndexRoute = AuthManageUserIndexImport.update({
  id: '/manage-user/',
  path: '/manage-user/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardIndexRoute = AuthDashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      id: '/_public'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PublicImport
      parentRoute: typeof rootRoute
    }
    '/_public/data': {
      id: '/_public/data'
      path: '/data'
      fullPath: '/data'
      preLoaderRoute: typeof PublicDataImport
      parentRoute: typeof PublicImport
    }
    '/_auth/dashboard/': {
      id: '/_auth/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardIndexImport
      parentRoute: typeof AuthImport
    }
    '/_auth/manage-user/': {
      id: '/_auth/manage-user/'
      path: '/manage-user'
      fullPath: '/manage-user'
      preLoaderRoute: typeof AuthManageUserIndexImport
      parentRoute: typeof AuthImport
    }
    '/_public/about/': {
      id: '/_public/about/'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof PublicAboutIndexImport
      parentRoute: typeof PublicImport
    }
    '/_public/forgot-pass/': {
      id: '/_public/forgot-pass/'
      path: '/forgot-pass'
      fullPath: '/forgot-pass'
      preLoaderRoute: typeof PublicForgotPassIndexImport
      parentRoute: typeof PublicImport
    }
    '/_public/login/': {
      id: '/_public/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof PublicLoginIndexImport
      parentRoute: typeof PublicImport
    }
    '/_public/register/': {
      id: '/_public/register/'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof PublicRegisterIndexImport
      parentRoute: typeof PublicImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthDashboardIndexRoute: typeof AuthDashboardIndexRoute
  AuthManageUserIndexRoute: typeof AuthManageUserIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthDashboardIndexRoute: AuthDashboardIndexRoute,
  AuthManageUserIndexRoute: AuthManageUserIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface PublicRouteChildren {
  PublicDataRoute: typeof PublicDataRoute
  PublicAboutIndexRoute: typeof PublicAboutIndexRoute
  PublicForgotPassIndexRoute: typeof PublicForgotPassIndexRoute
  PublicLoginIndexRoute: typeof PublicLoginIndexRoute
  PublicRegisterIndexRoute: typeof PublicRegisterIndexRoute
}

const PublicRouteChildren: PublicRouteChildren = {
  PublicDataRoute: PublicDataRoute,
  PublicAboutIndexRoute: PublicAboutIndexRoute,
  PublicForgotPassIndexRoute: PublicForgotPassIndexRoute,
  PublicLoginIndexRoute: PublicLoginIndexRoute,
  PublicRegisterIndexRoute: PublicRegisterIndexRoute,
}

const PublicRouteWithChildren =
  PublicRoute._addFileChildren(PublicRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof PublicRouteWithChildren
  '/data': typeof PublicDataRoute
  '/dashboard': typeof AuthDashboardIndexRoute
  '/manage-user': typeof AuthManageUserIndexRoute
  '/about': typeof PublicAboutIndexRoute
  '/forgot-pass': typeof PublicForgotPassIndexRoute
  '/login': typeof PublicLoginIndexRoute
  '/register': typeof PublicRegisterIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof PublicRouteWithChildren
  '/data': typeof PublicDataRoute
  '/dashboard': typeof AuthDashboardIndexRoute
  '/manage-user': typeof AuthManageUserIndexRoute
  '/about': typeof PublicAboutIndexRoute
  '/forgot-pass': typeof PublicForgotPassIndexRoute
  '/login': typeof PublicLoginIndexRoute
  '/register': typeof PublicRegisterIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_public': typeof PublicRouteWithChildren
  '/_public/data': typeof PublicDataRoute
  '/_auth/dashboard/': typeof AuthDashboardIndexRoute
  '/_auth/manage-user/': typeof AuthManageUserIndexRoute
  '/_public/about/': typeof PublicAboutIndexRoute
  '/_public/forgot-pass/': typeof PublicForgotPassIndexRoute
  '/_public/login/': typeof PublicLoginIndexRoute
  '/_public/register/': typeof PublicRegisterIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/data'
    | '/dashboard'
    | '/manage-user'
    | '/about'
    | '/forgot-pass'
    | '/login'
    | '/register'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/data'
    | '/dashboard'
    | '/manage-user'
    | '/about'
    | '/forgot-pass'
    | '/login'
    | '/register'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_public'
    | '/_public/data'
    | '/_auth/dashboard/'
    | '/_auth/manage-user/'
    | '/_public/about/'
    | '/_public/forgot-pass/'
    | '/_public/login/'
    | '/_public/register/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  PublicRoute: typeof PublicRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  PublicRoute: PublicRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_public"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/dashboard/",
        "/_auth/manage-user/"
      ]
    },
    "/_public": {
      "filePath": "_public.tsx",
      "children": [
        "/_public/data",
        "/_public/about/",
        "/_public/forgot-pass/",
        "/_public/login/",
        "/_public/register/"
      ]
    },
    "/_public/data": {
      "filePath": "_public/data.tsx",
      "parent": "/_public"
    },
    "/_auth/dashboard/": {
      "filePath": "_auth/dashboard/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/manage-user/": {
      "filePath": "_auth/manage-user/index.tsx",
      "parent": "/_auth"
    },
    "/_public/about/": {
      "filePath": "_public/about/index.tsx",
      "parent": "/_public"
    },
    "/_public/forgot-pass/": {
      "filePath": "_public/forgot-pass/index.tsx",
      "parent": "/_public"
    },
    "/_public/login/": {
      "filePath": "_public/login/index.tsx",
      "parent": "/_public"
    },
    "/_public/register/": {
      "filePath": "_public/register/index.tsx",
      "parent": "/_public"
    }
  }
}
ROUTE_MANIFEST_END */
