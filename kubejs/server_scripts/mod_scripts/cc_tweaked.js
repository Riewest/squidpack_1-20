ServerEvents.recipes(event => {
    //removals
    event.remove({id:"computercraft:computer_normal"})
    event.remove({id:"computercraft:computer_advanced"})
    event.remove({id:"computercraft:wireless_modem_advanced"})
    //additions
    event.shaped('computercraft:computer_normal', [
      'SSS',
      'SPS',
      'SGS'
    ], {
      S: '#forge:stone',
      G: '#forge:glass_panes',
      P: 'ae2:engineering_processor'
    })
    event.shaped('computercraft:computer_advanced', [
      'SSS',
      'SPS',
      'SGS'
    ], {
      S: 'minecraft:gold_ingot',
      G: '#forge:glass_panes',
      P: 'ae2:engineering_processor'
    })
    event.shaped('computercraft:computer_advanced', [
      'SSS',
      'SCS',
      'S S'
    ], {
      S: 'minecraft:gold_ingot',
      C: 'computercraft:computer_normal'
    })
    event.shaped('computercraft:wireless_modem_advanced', [
      'SSS',
      'SGS',
      'SPS'
    ], {
      S: 'minecraft:gold_ingot',
      G: 'minecraft:ender_eye',
      P: 'ae2:engineering_processor'
    })
  })