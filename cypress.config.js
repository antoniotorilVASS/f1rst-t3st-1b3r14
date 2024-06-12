const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Configuración de Cypress

  // Configuración específica para pruebas de extremo a extremo (e2e)
  e2e: {
    browser: "webkit", // Indicar que se utilizará WebKit como navegador para pruebas e2e
    setupNodeEvents(on, config) {
      // Implementar escuchadores de eventos de nodo aquí si es necesario
    },
  },

  // Otras configuraciones de Cypress aquí...

  // Habilitar el soporte experimental de WebKit
  experimentalWebKitSupport: true,
});
