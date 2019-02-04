const validate = values => {
    const errors = {}
    if (!values.services || !values.services.length) {
      errors.services = { _error: 'At least one service must be entered' }
    } else {
      const servicesArrayErrors = []
      values.services.forEach((service, serviceIndex) => {
        const serviceErrors = {}
        if (!service|| !service.name) {
          serviceErrors.name = 'Required'
          servicesArrayErrors[serviceIndex] = serviceErrors
        }
        if (!service || !service.price) {
          serviceErrors.price = 'Required'
          servicesArrayErrors[serviceIndex] = serviceErrors
        }
      })
      if (servicesArrayErrors.length) {
        errors.services = servicesArrayErrors
      }
    }
    return errors
  }
  
  export default validate