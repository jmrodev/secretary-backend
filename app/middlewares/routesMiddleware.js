const listRoutes = (app) => {
  console.log('\n--- Registered Routes ---')

  // Función recursiva para explorar la pila de middlewares
  const printRouteStack = (stack, parentPath = '') => {
    stack.forEach((layer) => {
      if (layer.route) {
        // Si es una ruta, imprime su método y ruta completa
        const route = layer.route
        const path = parentPath + route.path
        Object.keys(route.methods).forEach((method) => {
          console.log(`${method.toUpperCase()} ${path}`)
        })
      } else if (layer.name === 'router' && layer.handle.stack) {
        // Si es un sub-router, explora recursivamente su pila
        const newPath = parentPath + (layer.regexp.toString().match(/\/\^\\(.*?)\\\//)?.[1] || '')
        printRouteStack(layer.handle.stack, newPath)
      }
    })
  }

  // Inicia la exploración desde la pila principal del router
  if (app._router && app._router.stack) {
    printRouteStack(app._router.stack)
  } else {
    console.log('No routes found.')
  }

  console.log('--- End of Routes ---\n')
}

export default listRoutes
