/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as LoginIndexImport } from './routes/login/index'
import { Route as AboutIndexImport } from './routes/about/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const AboutIndexRoute = AboutIndexImport.update({
  id: '/about/',
  path: '/about/',
  getParentRoute: () => rootRoute,
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
    '/about/': {
      id: '/about/'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutIndexImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutIndexRoute
  '/login': typeof LoginIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutIndexRoute
  '/login': typeof LoginIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about/': typeof AboutIndexRoute
  '/login/': typeof LoginIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/about' | '/login'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/about' | '/login'
  id: '__root__' | '/' | '/about/' | '/login/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutIndexRoute: typeof AboutIndexRoute
  LoginIndexRoute: typeof LoginIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutIndexRoute: AboutIndexRoute,
  LoginIndexRoute: LoginIndexRoute,
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
        "/about/",
        "/login/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about/": {
      "filePath": "about/index.tsx"
    },
    "/login/": {
      "filePath": "login/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
