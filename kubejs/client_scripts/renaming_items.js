ClientEvents.lang('en_us', e => {
    const rename = (item, newName) => e.add(Item.of(item).item.getDescriptionId(), newName)
  
    // rename mutton to BAAAAAAA
    rename('tuffores:tuff_ores_module', "Scanner Module: Tuff Ores")
})