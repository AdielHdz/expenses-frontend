export function hasEmptyValues(obj: object) {
  // Recorremos todas las propiedades del objeto
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]
      // Comprobamos si es null, undefined o string vacío
      if (value === null || value === undefined || value === '' || value <= 0) {
        return true // Encontramos un valor vacío
      }
    }
  }
  return false // No hay valores vacíos
}
