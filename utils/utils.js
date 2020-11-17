function processAccordionData(data, titleId) {
  var accordionData = {}
  accordionData.subChannel = []
  for (var i in data) {
    if (data[i].id == titleId) accordionData.title = data[i].name
    if (data[i].taxonomy == 'products') {
      type = 'image'
    } else {
      var type = data[i].slug
      if (type == 'case') {
        type = 'case'
      } else if (type == 'video') {
        type = 'video'
      } else {
        type = 'article'
      }
    }
    var temp = {
      id: data[i].id,
      type,
      name: data[i].name
    }
    accordionData.subChannel.push(temp)
  }
  return accordionData
}

module.exports = {
  processAccordionData
}