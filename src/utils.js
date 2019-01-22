export function deepParse (objectToParse) {
  let obj
  try {
    obj = JSON.parse(objectToParse)
  } catch (e) {
    obj = objectToParse
  }
  for (const prop in obj) {
    console.log(prop, obj)

    if (obj.hasOwnProperty(prop)) {
      try {
        obj[prop] = JSON.parse(obj[prop])
      } catch (e) {
        // nm
      }

      if (typeof obj[prop] === 'object') {
        deepParse(obj[prop])
      }
    }
  }

  return obj
}
