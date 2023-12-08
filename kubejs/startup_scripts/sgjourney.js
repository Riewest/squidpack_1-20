BlockEvents.modification(e => {
  e.modify([
    'sgjourney:ring_panel',
    'sgjourney:transport_rings',
    'sgjourney:pegasus_stargate',
    'sgjourney:milky_way_stargate',
    'sgjourney:universe_stargate',
    'sgjourney:classic_stargate',
    'sgjourney:tollan_stargate'
  ], block => {
    block.setExplosionResistance(1000)
    block.setDestroySpeed(1000000)
  })
})